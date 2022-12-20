using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Models;

public record Betrokkene
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int Id { get; init; }

    [Required]
    public TypePersoon TypePersoon { get; init; }

    [Required]
    public string Beschrijving { get; init; } = string.Empty;

    [Required]
    public string Afbeelding { get; init; } = string.Empty;

    public DateTime? GeboorteDatum { get; init; }
}