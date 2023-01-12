using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Entities;

public class Betrokkene 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }

    public TypePersoon TypePersoon { get; set; }

    [Required]
    public string Naam { get; set; } = string.Empty;

    [Required]
    public string Beschrijving { get; set; } = string.Empty;

    [Required]
    public string Afbeelding { get; set; } = string.Empty;

    [DisplayFormat(DataFormatString = "{MMM dd, yyyy}")] 
    public DateTime? GeboorteDatum { get; set; }   

    public List<Voorstelling>? Voorstellingen { get; set; }
}