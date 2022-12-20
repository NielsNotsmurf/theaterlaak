using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Entities;

public class Reservering 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; set; }
    [ForeignKey(nameof(Voorstelling))]
    public int VoorstellingId { get; set; }
    public Voorstelling? Voorstelling { get; set; }
    [ForeignKey(nameof(Models.ApplicationUser))]
    public int UserId { get; set; }
    public Models.ApplicationUser? User { get; set; }
}   