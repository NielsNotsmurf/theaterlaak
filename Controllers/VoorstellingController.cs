using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Entities;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class VoorstellingController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    public VoorstellingController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.Voorstelling>> GetVoorstellingen()
    {
        var voorstellingQuery = _dbContext.Voorstellingen
            .AsNoTracking()
            .Include(v => v.Betrokkene)
            .AsQueryable();

        var voorstellingen = await voorstellingQuery.ToListAsync();
        return voorstellingen.ConvertAll(v => v.ToDto());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Models.Voorstelling>> GetVoorstelling(int id)
    {
        var voorstelling = await _dbContext.Voorstellingen
            .AsNoTracking()
            .Include(v => v.Betrokkene)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (voorstelling == null)
            throw new NotFoundException();

        return voorstelling.ToDto(); 
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddVoorstelling(Commands.AddOrUpdateVoorstelling voorstelling)
    {
        var newVoorstelling = new Voorstelling
        {
            Titel = voorstelling.Titel,
            BetrokkeneId = voorstelling.BetrokkeneId,
        };

        _dbContext.Add(newVoorstelling);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateVoorstelling(int id, Commands.AddOrUpdateVoorstelling voorstelling)
    {
        var updateVoorstelling = await _dbContext.Voorstellingen.FindAsync(id);
        if (updateVoorstelling == null)
            throw new NotFoundException($"Voorstelling met ID '{id}' is niet gevonden.");

        updateVoorstelling.Titel = voorstelling.Titel;
        updateVoorstelling.BetrokkeneId = voorstelling.BetrokkeneId;

        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteVoorstelling(int id)
    {
        var deleteVoorstelling = await _dbContext.Voorstellingen.FindAsync(id);
        if (deleteVoorstelling == null)
            throw new NotFoundException($"Voorstelling met ID '{id}' is niet gevonden.");

        _dbContext.Voorstellingen.Remove(deleteVoorstelling);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }
}