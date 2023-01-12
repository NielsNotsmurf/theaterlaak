using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Entities;
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

    // POST api/<BetrokkeneController>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> addBetrokkene([FromBody] Models.Betrokkene betrokkene)
    {
        var newBetrokkene = new Betrokkene() {
            Naam = betrokkene.Naam,
            Beschrijving = betrokkene.Beschrijving,
            Afbeelding = betrokkene.Afbeelding,
            GeboorteDatum = betrokkene.GeboorteDatum,
            TypePersoon = betrokkene.TypePersoon
        };

        _dbContext.Betrokkenen.Add(newBetrokkene);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBetrokkene), new { id = newBetrokkene.Id }, newBetrokkene.ToDto());
    }


    // PUT api/<BetrokkeneController>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> updateBetrokkene(int id, [FromBody] Models.Betrokkene betrokkene)
    {
        var existingBetrokkene = await _dbContext.Betrokkenen.FirstOrDefaultAsync(v => v.Id == id);

        if (existingBetrokkene == null)
            throw new NotFoundException();

        existingBetrokkene.Naam = betrokkene.Naam;
        existingBetrokkene.Beschrijving = betrokkene.Beschrijving;
        existingBetrokkene.Afbeelding = betrokkene.Afbeelding;
        existingBetrokkene.GeboorteDatum = betrokkene.GeboorteDatum;
        existingBetrokkene.TypePersoon = betrokkene.TypePersoon;


        _dbContext.Betrokkenen.Update(existingBetrokkene);
        await _dbContext.SaveChangesAsync();
        return Ok(existingBetrokkene.ToDto());
    }

    // DELETE api/<BetrokkeneController>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> deleteBetrokkene(int id)
    {
        var existingBetrokkene = await _dbContext.Betrokkenen.FirstOrDefaultAsync(v => v.Id == id);

        if (existingBetrokkene == null)
            throw new NotFoundException("Betrokkene is niet gevonden.");

        _dbContext.Betrokkenen.Remove(existingBetrokkene);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }
}