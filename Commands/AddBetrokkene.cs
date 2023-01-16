using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record AddBetrokkene
{
    [Required]
    public TypePersoon typePersoon {get; init;}
    [Required]
    public string Naam { get; init; } = string.Empty;
    [Required]
    public string Omschrijving { get; init; } = string.Empty;
    [Required]
    public string Afbeelding { get; init; } = string.Empty;
    [Required]
    public string GeboorteDatum { get; init; } = string.Empty;

}