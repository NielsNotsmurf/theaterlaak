using Microsoft.AspNetCore.Identity;

namespace theaterlaak.Entities;

public class ApplicationUser : IdentityUser 
{
    public string? JwtDonatieToken { get; set; }
    public string? TelefoonNummer { get; set; }
    public List<Reservering>? Reserveringen { get; set; }
}
