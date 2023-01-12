using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record AddOrUpdateVoorstelling 
{
    [Required]
    public string Titel { get; set; } = string.Empty;

    [Required]
    public int BetrokkeneId { get; set; }
}