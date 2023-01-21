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
public class MomentController : ControllerBase
{
    private IMomentService _momentService;
    private readonly AppSettings _appSettings;

    public MomentController(
        IMomentService reserveringService,
        IOptions<AppSettings> appSettings)
    {
        _momentService = reserveringService;
        _appSettings = appSettings.Value;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
	[ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.Moment>> GetMomenten()
    {
        return await _momentService.GetMomenten();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
	[ProducesResponseType(StatusCodes.Status400BadRequest)]
	[ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Models.Moment>> GetMoment(int id)
    {
        return await _momentService.GetMoment(id);
    }

    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
	[ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> AddMoment([FromBody]Commands.AddMoment moment)
    {
        await _momentService.AddMoment(moment);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> DeleteMoment(int id)
    {
        await _momentService.DeleteMoment(id);
        return NoContent();
    }
}