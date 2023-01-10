using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Models;

public record Reservering 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    public string UserId { get; init; } = string.Empty;
    public string? UserEmail { get; init; } = string.Empty;

    public int? ZaalPlaats { get; init; }

    public int MomentId { get; init; }
    public int? ZaalId { get; init; }
    public List<Stoel>? GereserveerdeStoelen { get; init; }
}