using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;

namespace theaterlaak.Controllers;

[ApiController]
[Route("[controller]")]
public class VoorstellingController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    public VoorstellingController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<List<Models.Voorstelling>> GetVoorstellingen()
    {
        var voorstellingQuery = _dbContext.Voorstellingen
            .AsNoTracking()
            .Include(p => p.Zaal)
            .AsQueryable();

        var voorstellingen = await voorstellingQuery.ToListAsync();
        return voorstellingen.ConvertAll(v => v.ToDto());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.Voorstelling>> GetVoorstelling(int id)
    {
        var voorstelling = await _dbContext.Voorstellingen
            .AsNoTracking()
            .Include(v => v.Zaal)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (voorstelling == null)
            throw new NotFoundException();

        return voorstelling.ToDto(); 
    }
}