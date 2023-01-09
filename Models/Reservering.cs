using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Models;

public record Reservering 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }

    public string UserEmail { get; init; } = string.Empty;

    public int ZaalPlaats { get; init; }
}