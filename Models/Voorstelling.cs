using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Models;

public record Voorstelling 
{
    [Required]
    public int Id { get; init; }

    [Required]
    public DateTime Datum { get; init; }
    public int ZaalNummer { get; init; }
    public int StoelNummer { get; init; }
}