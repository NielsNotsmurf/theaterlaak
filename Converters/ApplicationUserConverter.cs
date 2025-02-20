using theaterlaak.Entities;

namespace theaterlaak.Converters;

public static class ApplicationUserConverter {
    public static Models.ApplicationUser ToDto(this ApplicationUser applicationUser) => new()
    {
        Id = applicationUser.Id,
        UserName = applicationUser.UserName,
        JwtDonatieToken = applicationUser.JwtDonatieToken,
        Reserveringen = applicationUser.Reserveringen?.Select(ToDto).ToList(),
    };

    private static Models.Reservering ToDto(this Reservering reservering) => new()
    {
        Id = reservering.Id,
        MomentId = reservering.MomentId,
        UserId = reservering.UserId,
    };
}