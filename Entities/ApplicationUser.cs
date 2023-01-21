using Microsoft.AspNetCore.Identity;

namespace theaterlaak.Entities;

public class ApplicationUser : IdentityUser 
{
    public int TelefoonNummer { get; init; }
    public List<Reservering>? Reserveringen { get; init; }
}
