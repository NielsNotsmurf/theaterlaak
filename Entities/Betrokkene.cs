using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Entities;

public class Betrokkene 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; set; }

    public TypePersoon TypePersoon { get; set; }

    [Required]
    public string Beschrijving { get; set; } = String.Empty;

    [Required]
    public string Afbeelding { get; set; } = String.Empty;

    public string? GeboorteDatum { get; set; }   

}