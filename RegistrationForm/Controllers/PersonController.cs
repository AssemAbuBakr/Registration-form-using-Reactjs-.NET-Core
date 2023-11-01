using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistrationForm.Models;
using System.Linq;

namespace RegistrationForm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly PersonDbContext MyDbConext;

        public PersonController(PersonDbContext _myDbConext)
        {
            this.MyDbConext= _myDbConext; 
        }

        [HttpGet]
        [Route("GetPersons")]
        public async Task<IEnumerable<Person>> GetPersons()
        {
            try
            {
                return await MyDbConext.Persons.ToListAsync();

            }
            catch (Exception)
            {

                throw;
            }
        }
        [HttpPost]
        [Route("AddPerson")]
        public async Task<Person> AddPerson(Person objPerson)
        {
            try
            {
                MyDbConext.Persons.Add(objPerson);
                await MyDbConext.SaveChangesAsync();
                return objPerson;
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPatch]
        [Route("UpdatePerson/{id}")]
        public async Task<Person> UdpatePerson(Person objPerson)
        {
            try
            {
                MyDbConext.Entry(objPerson).State=EntityState.Modified; 
                await MyDbConext.SaveChangesAsync();
                return objPerson;
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpDelete]
        [Route("DeletePerson/{id}")]
        public bool DeletePerson(int id)
        {
            try
            {
                if (id > 0)
                {
                    var SelectedPerson = MyDbConext.Persons.FirstOrDefault(x => x.ID == id);
                    MyDbConext.Persons.Remove(SelectedPerson);
                    MyDbConext.SaveChanges();
                    return true;
                }
                else
                    return false;

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
