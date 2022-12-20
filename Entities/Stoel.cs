using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Entities;

public class Stoel 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; set; }
    [Required]
    public int Rij { get; set; }
    [Required]
    public int ZitPlaats { get; set; }
    public Boolean Bezet { get; set; }
}