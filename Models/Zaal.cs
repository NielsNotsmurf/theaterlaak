
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Models;

public record Zaal
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }
    public List<Stoel>? EersteRangsPlekken { get; set; }
    public List<Stoel>? TweedeRangsPlekken { get; set; }
    public List<Stoel>? DerdeRangsPlekken { get; set; }
}