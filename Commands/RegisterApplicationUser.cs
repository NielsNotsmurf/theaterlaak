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
    [RegularExpression("^\\+?[1-9][0-9]{7,14}$", ErrorMessage = "Voorbeeld: +31612345678")]
    public string Telefoonnummer { get; init; } = string.Empty;
}