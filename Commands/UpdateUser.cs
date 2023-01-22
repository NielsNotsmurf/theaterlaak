using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record UpdateUser {
    [Required]
    public string JwtDonatieToken { get; init; } = string.Empty;
}