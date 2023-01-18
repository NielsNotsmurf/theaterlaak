using theaterlaak.Entities;

namespace theaterlaak.Converters;

public static class BetrokkeneConverter
{
    public static Models.Betrokkene ToDto(this Betrokkene betrokkene) => new()
    {
        Id = betrokkene.Id,
        Naam = betrokkene.Naam,
        Omschrijving = betrokkene.Omschrijving,
        Afbeelding = betrokkene.Afbeelding,
        GeboorteDatum = betrokkene.GeboorteDatum ?? null,
    };
}