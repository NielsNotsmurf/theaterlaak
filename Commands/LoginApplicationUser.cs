using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record LoginApplicationUser
{
    [Required]
    public string UserName { get; init; } = string.Empty;
    [Required]
    public string PasswordHash { get; init; } = string.Empty;

}