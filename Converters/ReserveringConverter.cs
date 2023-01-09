using theaterlaak.Entities;

namespace theaterlaak.Converters;

public static class ReserveringConverter
{
    public static Models.Reservering ToDto(this Reservering reservering) => new()
    {
        Id = reservering.Id,
        // UserEmail = reservering.User.Email,
        // ZaalPlaats = 11,
    };
}