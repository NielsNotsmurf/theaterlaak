using theaterlaak.Entities;

namespace theaterlaak.Converters;

public static class MomentConverter
{
    public static Models.Moment ToDto(this Moment moment) => new()
    {
        Id = moment.Id,
        ZaalId = moment.ZaalId,
        ZaalType = moment.Zaal!.ZaalType,
        ZaalPlaatsen = moment.Zaal?.Stoelen.OrderBy(m => m.Rij).Select(ToDto).ToList(),
        StartDateTime = moment.StartDateTime,
        EndDateTime = moment.EndDateTime,
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