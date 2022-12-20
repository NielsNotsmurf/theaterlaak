using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;

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
            .Include(p => p.Voorstelling)
                .ThenInclude(p => p.Zaal)
                    .ThenInclude(p => p.EersteRangsPlekken)
            .AsQueryable();

        var reserveringen = await reserveringQuery.ToListAsync();
        return reserveringen.ConvertAll(v => v.ToDto());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Reservering>> GetReservering(int id)
    {
        var reservering = await _dbContext.Reserveringen
            .AsNoTracking()
            .Include(p => p.Voorstelling)
                .ThenInclude(p => p.Zaal)
                    .ThenInclude(p => p.EersteRangsPlekken)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (reservering == null)
            throw new NotFoundException();

        return reservering.ToDto(); 
    }
}