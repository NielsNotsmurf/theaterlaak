using theaterlaak.Entities;

namespace theaterlaak.Converters;

public static class VoorstellingConverter
{
    public static Models.Voorstelling ToDto(this Voorstelling voorstelling) => new()
    {
        Id = voorstelling.Id,
        Datum = voorstelling.Datum,
        ZaalNummer = voorstelling.ZaalId,
        // StoelNummer = voorstelling.Zaal.EersteRangsPlekken.
    };
}