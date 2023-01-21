using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Entities;
using theaterlaak.Services;
using aspnet_react_auth.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;

namespace theaterlaak.Controllers;
[ApiController]
[Route("/api/[controller]")]
public class BetrokkeneController : ControllerBase
{
    private IBetrokkeneService _betrokkeneService;
    private readonly AppSettings _appSettings;

    public BetrokkeneController(
        IBetrokkeneService betrokkeneService,
        IOptions<AppSettings> appSettings)
    {
        _betrokkeneService = betrokkeneService;
        _appSettings = appSettings.Value;
    }
    [HttpPost]
    [Authorize(Roles = "Beheerder")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddBetrokkene(Commands.AddBetrokkene betrokkene)
    {
        await _betrokkeneService.AddBetrokkene(betrokkene);
        return Ok();
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<Models.Betrokkene>> GetBetrokkenen()
    {
        return await _betrokkeneService.GetBetrokkenen();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Models.Betrokkene>> GetBetrokkene(int id)
    {
        return await _betrokkeneService.GetBetrokkene(id);
    }
}