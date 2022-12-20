using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Models;

public record Reservering 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }

    [Required]
    public string UserEmail { get; init; } = string.Empty;

    [Required]
    public int ZaalPlaats { get; init; }
}