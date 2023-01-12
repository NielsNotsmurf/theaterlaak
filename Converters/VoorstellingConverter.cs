using theaterlaak.Entities;

namespace theaterlaak.Converters;

public static class VoorstellingConverter 
{
    public static Models.Voorstelling ToDto(this Voorstelling voorstelling) => new()
    {
        Id = voorstelling.Id,
        Titel = voorstelling.Titel,
        BetrokkeneId = voorstelling.BetrokkeneId,
        BetrokkeneNaam = voorstelling.Betrokkene!.Naam,
        BetrokkeneBeschrijving = voorstelling.Betrokkene!.Beschrijving,
    };
}