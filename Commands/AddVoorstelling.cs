using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record AddVoorstelling
{
    [Required]
    public TypePersoon typePersoon {get; init;}
    [Required]
    public string Naam { get; init; } = string.Empty;
    [Required]
    public string Titel { get; init; } = string.Empty;
    public string Omschrijving { get; init; } = string.Empty;
    [Required]
    public int BetrokkeneId { get; init; }
}