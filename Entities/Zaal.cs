using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Entities;

public class Zaal 
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; set; }
    public List<Stoel>? EersteRangsPlekken { get; set; }
    public List<Stoel>? TweedeRangsPlekken { get; set; }
    public List<Stoel>? DerdeRangsPlekken { get; set; }
}