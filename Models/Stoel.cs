using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Models;

public record Stoel 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }
    public int Rij { get; init; }
    public int ZitPlaats { get; init; }
    public TypeStoel StoelRang { get; init; }
    public Boolean Bezet { get; init; }
}