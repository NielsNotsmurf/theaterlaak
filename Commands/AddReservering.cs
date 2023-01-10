using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record AddReservering
{
    [Required]
    public string UserId { get; init; } = string.Empty;
    [Required]
    public int MomentId { get; init; }
    [Required]
    public List<int> GereserveerdeStoelenId { get; init; } = new List<int>();
}