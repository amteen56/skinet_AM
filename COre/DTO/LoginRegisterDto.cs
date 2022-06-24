using System.ComponentModel.DataAnnotations;

namespace Core.DTO
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
    public class RegisterDto
    {
          [Required]
        public string DisplayName { get; set; }

         [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
