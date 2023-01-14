using Microsoft.AspNetCore.Identity;

namespace theaterlaak.Models;

public class ApplicationUser : IdentityUser
{
    public List<Reservering>? Reserveringen { get; set; }
    public Byte[]? PasswordSalt { get; set; }
    public Byte[]? Password { get; set; }
}