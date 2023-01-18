using Microsoft.AspNetCore.Identity;

namespace theaterlaak.Entities;

public class ApplicationUser : IdentityUser 
{
    public List<Reservering>? Reserveringen { get; set; }
    public Byte[]? PasswordSalt { get; set; }
    public Byte[]? Password { get; set; }
}