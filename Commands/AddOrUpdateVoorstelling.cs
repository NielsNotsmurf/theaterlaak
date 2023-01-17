using System.ComponentModel.DataAnnotations;

namespace theaterlaak.Commands;

public record AddOrUpdateVoorstelling 
{
    public record AddVoorstelling
    {
        [Required]
        public TypePersoon typePersoon {get; init;}
        [Required]
        public string Naam { get; init; } = string.Empty;
        [Required]
        public string Titel { get; init; } = string.Empty;
        [Required]
        public string Omschrijving { get; init; } = string.Empty;
        private string imgstring;
        [Required]
        public string Img { 
            get {return imgstring;}
            init {if(value == null){imgstring= "";}} 
        }

        [Required]
        public int BetrokkeneId { get; init; }
    }
}