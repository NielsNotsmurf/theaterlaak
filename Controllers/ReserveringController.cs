using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Entities;

namespace theaterlaak.Controllers;

[ApiController]
[Route("[controller]")]
public class ReserveringController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    public ReserveringController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<List<Models.Reservering>> GetReserveringen()
    {
        var reserveringQuery = _dbContext.Reserveringen
            .AsNoTracking()
            .AsQueryable();

        var reserveringen = await reserveringQuery.ToListAsync();
        return reserveringen.ConvertAll(v => v.ToDto());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Reservering>> GetReservering(int id)
    {
        var reservering = await _dbContext.Reserveringen
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id == id);

        if (reservering == null)
            throw new NotFoundException();

        return reservering.ToDto(); 
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddReservering([FromBody] Models.Reservering reservering)
    {
        var newReservering = new Reservering()
        {
            MomentId = reservering.MomentId,
            UserId = reservering.UserId,
        };

        _dbContext.Add(newReservering);
        await _dbContext.SaveChangesAsync();

        return Ok(newReservering);
    }
}