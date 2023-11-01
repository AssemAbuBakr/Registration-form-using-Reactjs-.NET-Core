using Microsoft.EntityFrameworkCore;

namespace RegistrationForm.Models
{
    public class PersonDbContext : DbContext
    {
        public PersonDbContext(DbContextOptions<PersonDbContext> options) : base(options)
        {
        }

        public DbSet<Person> Persons { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=.;Database=RegistrationForm;Trusted_Connection=True;TrustServerCertificate=True");
        }
    }
}
