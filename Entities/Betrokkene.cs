using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Entities;

public class Betrokkene 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }
    [Required]
    public TypePersoon TypePersoon { get; set; }
    [Required]
    public string Naam { get; set; } = string.Empty;
    [Required]
    public string Omschrijving { get; set; } = string.Empty;
    [Required]
    public string Afbeelding { get; set; } = string.Empty;
    [DisplayFormat(DataFormatString = "{MMM dd, yyyy}")] 
    public DateTime? GeboorteDatum { get; set; }   
    public List<Voorstelling>? Voorstellingen { get; set; }
}