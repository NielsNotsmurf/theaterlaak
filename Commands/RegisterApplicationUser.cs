using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record RegisterApplicationUser
{
    [Required]
    public string Voornaam { get; init; } = string.Empty;
    [Required]
    public string Achternaam { get; init; } = string.Empty;
    [Required]
    public string UserName { get; init; } = string.Empty;
    [Required]
    public string PasswordHash { get; init; } = string.Empty;
    [Required]
    public string ConfirmPassword { get; init; } = string.Empty;
    [RegularExpression(@"^([0-9]{10})$", ErrorMessage = "Telefoonnummer moet 10 cijfers bevatten")]
    public int Telefoonnummer { get; init; } 


}