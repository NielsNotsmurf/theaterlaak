using theaterlaak.Entities;

namespace theaterlaak.Converters;

public static class ReserveringConverter
{
    public static Models.Reservering ToDto(this Reservering reservering) => new()
    {
        Id = reservering.Id,
        MomentId = reservering.MomentId,
        UserId = reservering.UserId,
        UserEmail = reservering.User?.Email,
        StartTijd = reservering.Moment?.StartDateTime,
        EindTijd = reservering.Moment?.EndDateTime,
        VoorstellingTitle = reservering.Moment?.Voorstelling?.Titel,
        ZaalNummer = reservering.Moment?.Zaal?.ZaalType + 1,
        GereserveerdeStoelen = reservering.GereserveerdeStoelen?.Select(ToDto).ToList(),
    };

    private static Models.Stoel ToDto(this Stoel stoel) => new()
    {
        Id = stoel.Id,
        Rij = stoel.Rij,
        ZitPlaats = stoel.ZitPlaats,
    };
}