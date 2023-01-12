
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace theaterlaak.Models;

public record Zaal
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; init; }
    public ZaalType ZaalType { get; init; }
    
    public List<Stoel> Stoelen { get; init; } = new List<Stoel>();
}