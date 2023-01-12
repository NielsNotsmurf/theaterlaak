using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Entities;

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
                .ThenInclude(z => z!.Stoelen)
            .Include(m => m.Voorstelling)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (moment == null)
            throw new NotFoundException();

        return moment.ToDto(); 
    }

    [HttpGet("[action]")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.Moment>> GetKaartjesHoudersOverzicht()
    {
        var momentenQuery = _dbContext.Momenten
            .AsNoTracking()
            .AsQueryable();

        var momenten = await momentenQuery.ToListAsync();
        return momenten.ConvertAll(m => m.ToDto());
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
	[ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> AddMoment([FromBody]Commands.AddOrUpdateMoment moment)
    {
        if (moment.StartDateTime < DateTime.Now || moment.EndDateTime < DateTime.Now)
            throw new BadRequestException("De meegegeven waarden zijn fout.");

        var zaal = new Zaal() { ZaalType = moment.ZaalType };
        _dbContext.Zalen.Add(zaal);
        await _dbContext.SaveChangesAsync();

        checkDateAvailability(moment);

        var stoelen = generateStoelen(moment.ZaalType, zaal.Id);

        _dbContext.Stoelen.AddRange(stoelen);
        await _dbContext.SaveChangesAsync();

        var newMoment = new Moment
        {
            StartDateTime = moment.StartDateTime,
            EndDateTime = moment.EndDateTime,
            VoorstellingId = moment.VoorstellingId,
            ZaalId = zaal.Id,
        };

        _dbContext.Momenten.Add(newMoment);
        await _dbContext.SaveChangesAsync();
        return Ok(newMoment.ToDto());
    }

    private static List<Stoel> generateStoelen(ZaalType zaalType, int zaalId) {
        var stoelen = new List<Stoel>();
        if (zaalType == ZaalType.Zaal_1)
        {
            for (int i = 1; i <= 20; i++) 
            {
                stoelen.Add(new Stoel { Rij = 1, ZitPlaats = i, StoelRang = TypeStoel.EersteRangs, ZaalId = zaalId });
                for (int j = 2; j <= 6; j++) 
                {
                    stoelen.Add(new Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.TweedeRangs, ZaalId = zaalId });
                }
                for (int j = 7; j <= 1; j++) 
                {
                    stoelen.Add(new Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.DerdeRangs, ZaalId = zaalId });
                }
            }
        } else if (zaalType == ZaalType.Zaal_2) {
            for (int i = 1; i <= 20; i++) 
            {
                stoelen.Add(new Stoel { Rij = 1, ZitPlaats = i, StoelRang = TypeStoel.EersteRangs, ZaalId = zaalId });
                for (int j = 2; j <= 9; j++) 
                {
                    stoelen.Add(new Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.TweedeRangs, ZaalId = zaalId });
                }
            }
        } else if (zaalType == ZaalType.Zaal_3) {
            for (int i = 1; i <= 10; i++) 
            {
                stoelen.Add(new Stoel { Rij = 1, ZitPlaats = i, StoelRang = TypeStoel.EersteRangs, ZaalId = zaalId });
                for (int j = 2; j <= 9; j++) 
                {
                    stoelen.Add(new Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.TweedeRangs, ZaalId = zaalId });
                }
            }
        } else if (zaalType == ZaalType.Zaal_4) {
            for (int i = 1; i <= 20; i++) 
            {
                for (int j = 1; j <= 2; j++) 
                {
                    stoelen.Add(new Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.EersteRangs, ZaalId = zaalId });
                }
                for (int j = 3; j <= 12; j++) 
                {
                    stoelen.Add(new Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.TweedeRangs, ZaalId = zaalId });
                }
                for (int j = 13; j <= 22; j++) 
                {
                    stoelen.Add(new Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.DerdeRangs, ZaalId = zaalId });
                }
            }
        } else {
            for (int i = 1; i <= 10; i++) 
            {
                for (int j = 1; j <= 3; j++) 
                {
                    stoelen.Add(new Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.Geen_Rang, ZaalId = zaalId });
                }
            }
        }

        return stoelen;
    }

    private void checkDateAvailability(Commands.AddOrUpdateMoment moment)
    {
        if (moment.StartDateTime >= moment.EndDateTime)
            throw new BadRequestException("Start tijd is later dan de eind tijd en dit kan niet.");

        if (_dbContext.Momenten.Any(m => m.VoorstellingId == moment.VoorstellingId && ((moment.StartDateTime >= m.StartDateTime && moment.StartDateTime < m.EndDateTime) || (moment.EndDateTime > m.StartDateTime && moment.EndDateTime <= m.EndDateTime))))
            throw new BadRequestException("De voorstelling kan niet op hetzelfde moment worden gemaakt.");

        if (_dbContext.Momenten.Include(m => m.Zaal).Any(m => m.Zaal!.ZaalType == moment.ZaalType && ((moment.StartDateTime >= m.StartDateTime && moment.StartDateTime < m.EndDateTime) || (moment.EndDateTime > m.StartDateTime && moment.EndDateTime <= m.EndDateTime))))
            throw new BadRequestException("De zaal kan niet op hetzelfde moment worden gebruikt.");
    }

    //delete moment endpoint
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMoment(int id)
    {
        var momentToDelete = await _dbContext.Momenten.FindAsync(id);
        var zaalToDelete = await _dbContext.Zalen.FindAsync(id);
        var stoelenToDelete = await _dbContext.Stoelen.Where(s => s.ZaalId == id).ToListAsync();
        if (momentToDelete == null)
            throw new NotFoundException("Het moment is niet gevonden.");

        if (zaalToDelete == null)
            throw new NotFoundException("De zaal is niet gevonden.");

        if (stoelenToDelete == null)
            throw new NotFoundException("De stoelen zijn niet gevonden.");
        
        _dbContext.Momenten.Remove(momentToDelete);
        _dbContext.Zalen.Remove(zaalToDelete);
        _dbContext.Stoelen.RemoveRange(stoelenToDelete);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }

    //update moment endpoint
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMoment(int id, Commands.AddOrUpdateMoment moment)
    {
        var momentToUpdate = await _dbContext.Momenten.FindAsync(id);
        if (momentToUpdate == null)
            throw new NotFoundException("Het moment is niet gevonden.");

        if (momentToUpdate.Zaal == null)
            throw new NotFoundException("De zaal is niet gevonden.");

        momentToUpdate.StartDateTime = moment.StartDateTime;
        momentToUpdate.EndDateTime = moment.EndDateTime;
        momentToUpdate.VoorstellingId = moment.VoorstellingId;
        momentToUpdate.Zaal!.ZaalType = moment.ZaalType;

        checkDateAvailability(moment);

        _dbContext.Zalen.Update(momentToUpdate.Zaal);
        _dbContext.Momenten.Update(momentToUpdate);
        await _dbContext.SaveChangesAsync();
        return Ok(momentToUpdate.ToDto());
    }
}