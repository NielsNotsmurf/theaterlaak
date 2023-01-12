using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class BetrokkeneController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    public BetrokkeneController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<Models.Betrokkene>> GetBetrokkenen()
    {
        var betrokkenenQuery = _dbContext.Betrokkenen
            .AsNoTracking()
            .AsQueryable();

        var betrokkenen = await betrokkenenQuery.ToListAsync();
        return betrokkenen.ConvertAll(v => v.ToDto());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Models.Betrokkene>> GetBetrokkene(int id)
    {
        var betrokkene = await _dbContext.Betrokkenen
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id == id);

        if (betrokkene == null)
            throw new NotFoundException();

        return betrokkene.ToDto(); 
    }
}