using Microsoft.AspNetCore.Mvc;
using aspnet_react_auth.Helpers;
using theaterlaak.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ReserveringController : ControllerBase
{
    private IReserveringService _reserveringService;
    private readonly AppSettings _appSettings;

    public ReserveringController(
        IReserveringService reserveringService,
        IOptions<AppSettings> appSettings)
    {
        _reserveringService = reserveringService;
        _appSettings = appSettings.Value;
    }

    [HttpGet]
    [Authorize(Roles = "Beheerder")]
    public async Task<List<Models.Reservering>> GetReserveringen()
    {
        return await _reserveringService.GetReserveringen();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Reservering>> GetReservering(int id)
    {
        return await _reserveringService.GetReservering(id);
    }

    [HttpGet("[action]/{momentId}/{userId}")]
    [Authorize(Roles = "Beheerder")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.Reservering>> GetKaartjesHoudersOverzicht(int momentId, string userId)
    {
        return await _reserveringService.GetKaartjesHoudersOverzicht(momentId, userId);
    }

    [HttpPost]
    [Authorize(Roles = "Gebruiker")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddReservering(Commands.AddOrUpdateReservering reservering)
    {
        await _reserveringService.AddReservering(reservering);
        return Ok();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Gebruiker")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateReservering(int id, Commands.AddOrUpdateReservering reservering)
    {
        await _reserveringService.UpdateReservering(id, reservering);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Gebruiker")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task DeleteReservering(int id)
    {
        await _reserveringService.DeleteReservering(id);
    }

    [HttpGet("[action]/{userId}")]
    [Authorize(Roles = "Gebruiker")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.Reservering>> GetReserveringenByUserId(string userId)
    {
        return await _reserveringService.GetReserveringenByUserId(userId);
    }
}