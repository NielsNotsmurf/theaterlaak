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
    public List<Stoel> GereserveerdeStoelen { get; set; } = new List<Stoel>();

    [ForeignKey(nameof(ApplicationUser))]
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser? User { get; set; }
}   