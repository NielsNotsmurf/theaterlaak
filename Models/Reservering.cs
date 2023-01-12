using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Models;

public record Reservering 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    public string UserId { get; init; } = string.Empty;
    public string? UserEmail { get; init; } = string.Empty;

    public int MomentId { get; init; }
    public DateTime? StartTijd { get; init; }
    public DateTime? EindTijd { get; init; }
    public ZaalType? ZaalNummer { get; init; }
    public string? VoorstellingTitle { get; init; }
    public List<Stoel>? GereserveerdeStoelen { get; init; }
}