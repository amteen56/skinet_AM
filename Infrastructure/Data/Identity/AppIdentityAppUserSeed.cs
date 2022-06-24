using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUserAsync(UserManager<Core.Entities.Identity.AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new Core.Entities.Identity.AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.ccm",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Bob",
                        State = "NY",
                        ZipCode = "12345",
                        City = "New York",
                        Street = "abc"
                    }

                };
                    await userManager.CreateAsync(user, "Mateen,12");
            }
        }
    }
}