using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Models;

public record Stoel 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }
    [Required]
    public int Rij { get; init; }
    [Required]
    public int ZitPlaats { get; init; }
    public Boolean Bezet { get; init; }
}