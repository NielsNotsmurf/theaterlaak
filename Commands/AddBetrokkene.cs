using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record AddBetrokkene
{
    [Required]
    public TypePersoon TypePersoon {get; init;}
    [Required]
    public string Naam { get; init; } = string.Empty;
    [Required]
    public string Omschrijving { get; init; } = string.Empty;
    [Required]
    private string imgstring = string.Empty;
    public string Afbeelding { 
            get {return imgstring;}
            init {if(value == null){imgstring= "";}} 
        }
    [Required]
    public DateTime GeboorteDatum { get; init; }

}