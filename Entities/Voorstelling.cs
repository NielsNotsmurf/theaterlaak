using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Entities;

public class Voorstelling 
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Titel { get; set; } = string.Empty;

    [Required]
    public DateTime Datum { get; set; }

    [ForeignKey(nameof(Zaal))]
    public int ZaalId { get; set; }
    public Zaal? Zaal { get; set; }
}