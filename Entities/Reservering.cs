using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Entities;

public class Reservering 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; set; }
    [ForeignKey(nameof(Moment))]
    public int MomentId { get; set; }
    public Moment? Moment { get; set; }
    // [ForeignKey(nameof())]
    // public int UserId { get; set; }
    // public Models.ApplicationUser? User { get; set; }
}   