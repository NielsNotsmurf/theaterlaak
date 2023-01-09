using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Entities;

public class Moment
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }

    [ForeignKey(nameof(Voorstelling))]
    [Required]
    public int VoorstellingId { get; set; }
    public Voorstelling? Voorstelling { get; set; }
    
    [ForeignKey(nameof(Zaal))]
    [Required]
    public int ZaalId { get; set; }
    public Zaal? Zaal { get; set; }

    
    [Required]
    public DateTime Datum { get; set; }
}