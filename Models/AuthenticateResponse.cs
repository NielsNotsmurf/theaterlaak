using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Models;

public class AuthenticateResponse
{
    [Required]
    public string Id { get; init; } = string.Empty;
    [Required]
    public string UserName { get; init; } = string.Empty;
    //misschien komt hier nog een token
}