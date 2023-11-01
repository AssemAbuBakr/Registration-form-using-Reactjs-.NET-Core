import axios from "axios";
import { useEffect, useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    InputGroup,
    Col,
    Button,
    Row,
    Container,
    Card,
    Form,
} from "react-bootstrap";


function RegistrationForm() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [persons, setPersons] = useState([]);
    const validation = useRef('');

    useEffect(() => {
        (async () => await Load())();

    }, []);

    async function Load() {
        const Result = await axios.get("https://localhost:7275/api/Person/Getpersons");
        setPersons(Result.data);
        console.log(Result.data);
    }

    function ValidateForm() {
        try {
            validation.current = "1";
            if ((phone.length != 0) && phone.length < 11 || phone.length > 20) {
                validation.current = "Phone number should be minimum 11 number";
            }
            if (email.length != 0 && !email.includes("@")) {
                validation.current = "Please enter a correct email";
            }
            if (age.length == 0 || age == "") {
                validation.current = "Please enter the age";
            }
            if (name.length == 0 || name == "") {
                validation.current = "Please enter the name first";
            }

        }
        catch (err) {
            alert(err);
        }
    }
    async function Save(event) {
        event.preventDefault();
        try {
            ValidateForm();
            if (validation.current == "1") {
                await axios.post("https://localhost:7275/api/Person/AddPerson",
                    {
                        name: name,
                        email: email,
                        phone: phone,
                        age: age

                    });
                alert("Person Registration successfully");
                setName("");
                setEmail("");
                setPhone("");
                setAge("");
                Load();

            }
            else {
                alert(validation.current);
            }

        }
        catch (Error) {
            alert(Error);
        }

    }
    async function EditPerson(persons) {
        setId(persons.id)
        setName(persons.name);
        setEmail(persons.email);
        setPhone(persons.phone);
        setAge(persons.age);
    }
    async function DeletePerson(id) {

        await axios.delete("https://localhost:7275/api/Person/DeletePerson/" + id);
        alert("Person Deleted successfully");
        setId("");
        setName("");
        setEmail("");
        setPhone("");
        setAge("");
        Load();
    }
    async function UpdatePerson(event) {
        event.preventDefault();
        try {
            ValidateForm();
            if (validation.current == "1") {
                await axios.patch("https://localhost:7275/api/Person/UpdatePerson/" + persons.find((x) => x.id === id).id || id,
                    {
                        id: id,
                        name: name,
                        email: email,
                        phone: phone,
                        age: age
                    }
                );
                alert("Person updated successfully");
                setId("");
                setName("");
                setEmail("");
                setPhone("");
                setAge("");
                Load();

            }
            else {
                alert(validation.current);
            }
        }
        catch (err) {
            alert(err);
        }
    }

    return (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={10} lg={8} xs={12}>
                    <div className="border border-3 border-primary"></div>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3 mt-4">
                                <h2 className="fw-bold mb-2 text-uppercase">Registration  Form</h2>
                                <p className=" mb-5">Done by Assem AbuBakr</p>
                                <Form>
                                    <Form.Control type="text"
                                        placeholder="Enter name"
                                        id="id"
                                        hidden
                                        value={id}
                                        onChange={(event) => {
                                            setId(event.target.value);
                                        }} />
                                    <Row className="mb-3">
                                        <Form.Group
                                            as={Col}
                                            className="mb-3"
                                            controlId="formFullName"
                                        >
                                            <Form.Label className="text-center">
                                                Your full name
                                            </Form.Label>
                                            <Form.Control type="text"
                                                placeholder="Enter name"
                                                id="name"
                                                value={name}
                                                onChange={(event) => {
                                                    setName(event.target.value);
                                                }} />
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            className="mb-3"
                                            controlId="formPhoneNumber"
                                        >
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter phone number"
                                                id="phone"
                                                value={phone}
                                                onChange={(event) => {
                                                    setPhone(event.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group
                                            as={Col}
                                            className="mb-3"
                                            controlId="formUsername"
                                        >
                                            <Form.Label className="text-center">
                                                Email address
                                            </Form.Label>
                                            <InputGroup>
                                                <Form.Control type="text"
                                                    placeholder="Enter email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(event) => {
                                                        setEmail(event.target.value);
                                                    }} />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group
                                            as={Col}
                                            className="mb-3"
                                            controlId="formBasicPassword"
                                        >
                                            <Form.Label>Age</Form.Label><Form.Control
                                                type="number"
                                                placeholder="Enter Age"
                                                id="age"
                                                value={age}
                                                onChange={(event) => {
                                                    setAge(event.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </Row>
                                    <div className="d-grid">
                                        <button class="btn btn-primary mt-2" onClick={Save}>
                                            Add
                                        </button>
                                        <button disabled={id.length == 0} class="btn btn-warning mt-2" onClick={UpdatePerson}>
                                            Update
                                        </button>
                                    </div>
                                </Form>
                                <div className="mt-3">
                                    <br></br>
                                    <table class="table table-success table-striped" align="center">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th>
                                                    ID
                                                </th>
                                                <th>
                                                    Name
                                                </th>
                                                <th>
                                                    Age
                                                </th>
                                                <th>
                                                    Phone Number
                                                </th>
                                                <th>
                                                    Email
                                                </th>
                                                <th>
                                                    Options
                                                </th>
                                            </tr>
                                        </thead>
                                        {persons.map(function fn(person) {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">{person.id} </th>
                                                        <td>{person.name}</td>
                                                        <td>{person.age}</td>
                                                        <td>{person.phone}</td>
                                                        <td>{person.email}</td>

                                                        <td>
                                                            <button
                                                                type="button"
                                                                class="btn btn-warning"
                                                                onClick={() => EditPerson(person)}
                                                            >
                                                                Edit
                                                            </button>
                                                            &nbsp;&nbsp;
                                                            &nbsp;
                                                            <button
                                                                type="button"
                                                                class="btn btn-danger"
                                                                onClick={() => DeletePerson(person.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            );
                                        })}
                                    </table>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default RegistrationForm;
