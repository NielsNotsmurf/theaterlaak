using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record AddOrUpdateVoorstelling 
{
        [Required]
        public string Titel { get; init; } = string.Empty;
        [Required]
        public string Omschrijving { get; init; } = string.Empty;
        [Required]
        public string Afbeelding { get; init; } = string.Empty;
        [Required]
        public int BetrokkeneId { get; init; }
}