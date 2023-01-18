using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record AddMoment
{
    [Required]
    public DateTime StartDateTime { get; init; }
    [Required]
    public DateTime EndDateTime { get; init; }

    [Required]
    public int VoorstellingId { get; init; }
    [Required]
    public ZaalType ZaalType { get; init; }
}