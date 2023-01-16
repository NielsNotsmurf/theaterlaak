using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Entities;

public class Voorstelling 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }

    [Required]
    public string Titel { get; set; } = string.Empty;
    public string Omschrijving { get; set; } = string.Empty;

    [ForeignKey(nameof(Betrokkene))]
    public int BetrokkeneId { get; set; }
    public Betrokkene? Betrokkene { get; set; }
}