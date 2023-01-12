using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Models;

public record Voorstelling 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    public string Titel { get; init; } = string.Empty;

    public int BetrokkeneId { get; init; }

    public string BetrokkeneNaam { get; init; } = string.Empty;

    public string BetrokkeneBeschrijving { get; init; } = string.Empty;
}