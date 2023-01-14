using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Entities;
using theaterlaak.Services;
using aspnet_react_auth.Helpers;
using Microsoft.Extensions.Options;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class VoorstellingController : ControllerBase
{
    private IVoorstellingService _userService;
    private readonly AppSettings _appSettings;

    public VoorstellingController(
        IVoorstellingService userService,
        IOptions<AppSettings> appSettings)
    {
        _userService = userService;
        _appSettings = appSettings.Value;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.Voorstelling>> GetVoorstellingen()
    {
        return await _userService.GetVoorstellingen();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Models.Voorstelling>> GetVoorstelling(int id)
    {
        return await _userService.GetVoorstelling(id); 
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddVoorstelling(Commands.AddOrUpdateVoorstelling voorstelling)
    {
        return await _userService.AddVoorstelling(voorstelling);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateVoorstelling(int id, Commands.AddOrUpdateVoorstelling voorstelling)
    {
        return await _userService.UpdateVoorstelling(id, voorstelling);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteVoorstelling(int id)
    {
        return await _userService.DeleteVoorstelling(id);
    }
}