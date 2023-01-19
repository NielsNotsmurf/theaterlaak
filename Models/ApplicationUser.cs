using Microsoft.AspNetCore.Identity;

namespace theaterlaak.Models;

public record ApplicationUser
{
    public string Id { get; init; } = string.Empty;
    public string UserName { get; init; } = string.Empty;
    public string Email { get; init; } = string.Empty;
    public int TelefoonNummer { get; init; }
    public List<Reservering>? Reserveringen { get; init; }
}