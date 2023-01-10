using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Entities;

public class Stoel 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }
    [Required]
    public int Rij { get; set; }
    [Required]
    public int ZitPlaats { get; set; }
    [Required]
    public TypeStoel StoelRang { get; init; }
    public Boolean Bezet { get; set; }

    [ForeignKey(nameof(Zaal))]
    public int ZaalId { get; set; }

    [ForeignKey(nameof(Reservering))]
    public int? ReserveringId { get; set; }
}