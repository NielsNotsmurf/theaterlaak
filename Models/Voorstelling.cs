using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Models;

public record Voorstelling 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    public string Titel { get; set; } = string.Empty;
    public string Omschrijving { get; set; } = string.Empty;
    public string Afbeelding { get; set; } = string.Empty;

    public int BetrokkeneId { get; init; }

    public string BetrokkeneNaam { get; init; } = string.Empty;

    public string BetrokkeneBeschrijving { get; init; } = string.Empty;
}