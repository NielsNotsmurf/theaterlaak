using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Entities;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
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
            .Include(r => r.Moment)
                .ThenInclude(m => m!.Zaal)
                    .ThenInclude(z => z!.Stoelen)
             .Include(r => r.Moment)
                .ThenInclude(m => m!.Voorstelling)
            .Include(r => r.User)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (reservering == null)
            throw new NotFoundException("Reservering is niet gevonden.");

        reservering.GereserveerdeStoelen = _dbContext.Stoelen.Where(s => s.ReserveringId == id).ToList();

        return reservering.ToDto(); 
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AddReservering(Commands.AddOrUpdateReservering reservering)
    {
        var newReservering = new Reservering
        {
            MomentId = reservering.MomentId,
            UserId = reservering.UserId,
        };

        _dbContext.Add(newReservering);
        await _dbContext.SaveChangesAsync();

        reservering.GereserveerdeStoelenId.ForEach(async (stoelId) => {
            var stoeltje = await _dbContext.Stoelen.FindAsync(stoelId);
            if (stoeltje == null)
                throw new NotFoundException("Stoeltje niet gevonden");

            stoeltje.ReserveringId = newReservering.Id;
            stoeltje.Bezet = true;
        });

        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateReservering(int id, Commands.AddOrUpdateReservering reservering)
    {
        var updateReservering = await _dbContext.Reserveringen.Include(r => r.Moment).ThenInclude(m => m.Zaal).ThenInclude(z => z.Stoelen).FirstOrDefaultAsync(r => r.Id == id);
        if (updateReservering == null)
             throw new NotFoundException($"Reservering met ID '{id}' is niet gevonden.");

        if (updateReservering.GereserveerdeStoelen != null && updateReservering.GereserveerdeStoelen.Count() > 0)
        {
            updateReservering.GereserveerdeStoelen.ForEach((stoel) => {
                stoel.ReserveringId = null;
                stoel.Bezet = false;
            });
        }

        reservering.GereserveerdeStoelenId.ForEach(async (stoelId) => {
            var stoeltje = await _dbContext.Stoelen.FindAsync(stoelId);
            if (stoeltje == null)
                throw new NotFoundException("Stoeltje niet gevonden");

            stoeltje.ReserveringId = updateReservering.Id;
            stoeltje.Bezet = true;
        });

        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteReservering(int id)
    {
        var deleteReservering = await _dbContext.Reserveringen.Include(r => r.Moment).ThenInclude(m => m.Zaal).ThenInclude(z => z.Stoelen).FirstOrDefaultAsync(r => r.Id == id);
        if (deleteReservering == null)
            throw new NotFoundException($"Voorstelling met ID '{id}' is niet gevonden.");

        if (deleteReservering.GereserveerdeStoelen != null && deleteReservering.GereserveerdeStoelen.Count() > 0)
        {
            deleteReservering.GereserveerdeStoelen.ForEach((stoel) => {
                stoel.ReserveringId = null;
                stoel.Bezet = false;
            });
        }

        _dbContext.Reserveringen.Remove(deleteReservering);
        await _dbContext.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("[action]/{userId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.Reservering>> GetReserveringenByUserId(string userId)
    {
        var reserveringQuery = _dbContext.Reserveringen
            .AsNoTracking()
            .Include(r => r.Moment)
                .ThenInclude(m => m!.Voorstelling)
            .Where(v => v.UserId == userId)
            .AsQueryable();

        var reserveringen = await reserveringQuery.ToListAsync();
        return reserveringen.ConvertAll(r => r.ToDto());
    }
}