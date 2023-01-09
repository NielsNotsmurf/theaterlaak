using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class MomentController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    public MomentController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<List<Models.Moment>> GetMomenten()
    {
        var momentenQuery = _dbContext.Momenten
            .AsNoTracking()
            .Include(m => m.Zaal)
                .ThenInclude(z => z.Stoelen)
            .Include(m => m.Voorstelling)
            .AsQueryable();

        var momenten = await momentenQuery.ToListAsync();
        return momenten.ConvertAll(v => v.ToDto());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Moment>> GetMoment(int id)
    {
        var moment = await _dbContext.Momenten
            .AsNoTracking()
            .Include(m => m.Zaal)
                .ThenInclude(z => z.Stoelen)
            .Include(m => m.Voorstelling)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (moment == null)
            throw new NotFoundException();

        return moment.ToDto(); 
    }
}