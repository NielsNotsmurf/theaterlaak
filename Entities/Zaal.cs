using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Entities;

public class Zaal 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }

    [Required]
    public string Naam { get; set; } = String.Empty;

    [Required]
    public List<Stoel> Stoelen { get; set; } = new List<Stoel>();
}