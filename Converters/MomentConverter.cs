using theaterlaak.Entities;

namespace theaterlaak.Converters;

public static class MomentConverter
{
    public static Models.Moment ToDto(this Moment moment) => new()
    {
        Id = moment.Id,
        ZaalId = moment.ZaalId,
        ZaalNaam = moment.Zaal?.Naam,
        ZaalPlaatsen = moment.Zaal?.Stoelen.Select(ToDto).ToList(),
        Datum = moment.Datum,
        VoorstellingId = moment.VoorstellingId,
        VoorstellingNaam = moment.Voorstelling?.Titel,
    };

    private static Models.Stoel ToDto(this Stoel stoel) => new()
    {
        Id = stoel.Id,
        Rij = stoel.Rij,
        ZitPlaats = stoel.ZitPlaats,
        StoelRang = stoel.StoelRang,
        Bezet = stoel.Bezet,
    };
}