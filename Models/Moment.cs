using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Models;

public record Moment
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    public DateTime StartDateTime { get; init; }
    public DateTime EndDateTime { get; init; }

    public int VoorstellingId { get; init; }
    public string? VoorstellingNaam { get; init; }
    public int ZaalId { get; init; }
    public ZaalType ZaalType { get; init; }

    public List<Stoel>? ZaalPlaatsen { get; init; }

}