using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record RegisterApplicationUser
{
    [Required]
    public string UserName { get; init; } = string.Empty;
    [Required]
    public string PasswordHash { get; init; } = string.Empty;


}