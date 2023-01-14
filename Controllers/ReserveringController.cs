using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Entities;
using aspnet_react_auth.Helpers;
using theaterlaak.Services;
using Microsoft.Extensions.Options;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ReserveringController : ControllerBase
{
    private IReserveringService _userService;
    private readonly AppSettings _appSettings;

    public ReserveringController(
        IReserveringService userService,
        IOptions<AppSettings> appSettings)
    {
        _userService = userService;
        _appSettings = appSettings.Value;
    }

    [HttpGet]
    public async Task<List<Models.Reservering>> GetReserveringen()
    {
        return await _userService.GetReserveringen();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Reservering>> GetReservering(int id)
    {
        return await _userService.GetReservering(id);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddReservering(Commands.AddOrUpdateReservering reservering)
    {
        return await _userService.AddReservering(reservering);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateReservering(int id, Commands.AddOrUpdateReservering reservering)
    {
        return await _userService.UpdateReservering(id, reservering);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteReservering(int id)
    {
        return await _userService.DeleteReservering(id);
    }

    [HttpGet("[action]/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.Reservering>> GetReserveringenByUserId(string userId)
    {
        return await _userService.GetReserveringenByUserId(userId);
    }
}