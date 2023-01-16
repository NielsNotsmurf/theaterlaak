using aspnet_react_auth.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Services;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class BetrokkeneController : ControllerBase
{
    private IBetrokkeneService _userService;
    private readonly AppSettings _appSettings;

    public BetrokkeneController(
        IBetrokkeneService userService,
        IOptions<AppSettings> appSettings)
    {
        _userService = userService;
        _appSettings = appSettings.Value;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<Models.Betrokkene>> GetBetrokkenen()
    {
        return await _userService.GetBetrokkenen();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Models.Betrokkene>> GetBetrokkene(int id)
    {
        return await _userService.GetBetrokkene(id);
    }
}