using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Commands;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Models;

namespace theaterlaak.Services
{
    public interface IReserveringService
    {
        Task<List<Models.Reservering>> GetReserveringen();
        Task<ActionResult<Models.Reservering>> GetReservering(int id);

        Task<List<Models.Reservering>> GetKaartjesHoudersOverzicht(int momentId, string userId);
        Task<ActionResult> AddReservering(Commands.AddOrUpdateReservering reservering);
        Task<ActionResult> UpdateReservering(int id, Commands.AddOrUpdateReservering reservering);
        Task<ActionResult> DeleteReservering(int id);
        Task<List<Models.Reservering>> GetReserveringenByUserId(string userId);
    }

    public class reserveringService : IReserveringService
    {
        private ApplicationDbContext _context;

        public reserveringService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Reservering>> GetReserveringen()
        {
            var reserveringQuery = _context.Reserveringen
            .AsNoTracking()
            .AsQueryable();

            var reserveringen = await reserveringQuery.ToListAsync();
            return reserveringen.ConvertAll(v => v.ToDto());
        }

        public async Task<ActionResult<Reservering>> GetReservering(int id)
        {
            var reservering = await _context.Reserveringen
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

            reservering.GereserveerdeStoelen = _context.Stoelen.Where(s => s.ReserveringId == id).ToList();

            return reservering.ToDto();
        }

        public async Task<List<Models.Reservering>> GetKaartjesHoudersOverzicht(int momentId, string userId)
        {
            var reserveringen = await _context.Reserveringen
                .AsNoTracking()
                .Include(r => r.Moment)
                    .ThenInclude(m => m!.Zaal)
                        .ThenInclude(z => z!.Stoelen)
                .Include(r => r.Moment)
                    .ThenInclude(m => m.Voorstelling)
                .Include(r => r.User)
                .Where(r => r.MomentId == momentId && r.UserId == userId)
                .OrderBy(r => r.Moment!.StartDateTime)
                .ToListAsync();

            reserveringen.ForEach((reservering) => {
                reservering.GereserveerdeStoelen = _context.Stoelen.Where(s => s.ReserveringId == reservering.Id).ToList();
            });

            return reserveringen.Select(r => r.ToDto()).ToList();
        }

        public async Task<ActionResult> AddReservering(AddOrUpdateReservering reservering)
        {
            var newReservering = new Reservering
            {
                MomentId = reservering.MomentId,
                UserId = reservering.UserId,
            };

            _context.Add(newReservering);
            await _context.SaveChangesAsync();

            reservering.GereserveerdeStoelenId.ForEach(async (stoelId) =>
            {
                var stoeltje = await _context.Stoelen.FindAsync(stoelId);
                if (stoeltje == null)
                    throw new NotFoundException("Stoeltje niet gevonden");

                stoeltje.ReserveringId = newReservering.Id;
                stoeltje.Bezet = true;
            });

            await _context.SaveChangesAsync();

            // return newReservering.ToDto();
            return new OkResult();
        }
        public async Task<ActionResult> UpdateReservering(int id, AddOrUpdateReservering reservering)
        {
            var updateReservering = await _context.Reserveringen.Include(r => r.Moment).ThenInclude(m => m.Zaal).ThenInclude(z => z.Stoelen).FirstOrDefaultAsync(r => r.Id == id);
            if (updateReservering == null)
                throw new NotFoundException($"Reservering met ID '{id}' is niet gevonden.");

            if (updateReservering.GereserveerdeStoelen != null && updateReservering.GereserveerdeStoelen.Count() > 0)
            {
                updateReservering.GereserveerdeStoelen.ForEach((stoel) =>
                {
                    stoel.ReserveringId = null;
                    stoel.Bezet = false;
                });
            }

            reservering.GereserveerdeStoelenId.ForEach(async (stoelId) =>
            {
                var stoeltje = await _context.Stoelen.FindAsync(stoelId);
                if (stoeltje == null)
                    throw new NotFoundException("Stoeltje niet gevonden");

                stoeltje.ReserveringId = updateReservering.Id;
                stoeltje.Bezet = true;
            });

            await _context.SaveChangesAsync();

            //return NoContent();
            return new OkResult();

        }
        public async Task<ActionResult> DeleteReservering(int id)
        {
            var deleteReservering = await _context.Reserveringen.Include(r => r.Moment).ThenInclude(m => m.Zaal).ThenInclude(z => z.Stoelen).FirstOrDefaultAsync(r => r.Id == id);
            if (deleteReservering == null)
                throw new NotFoundException($"Voorstelling met ID '{id}' is niet gevonden.");

            if (deleteReservering.GereserveerdeStoelen != null && deleteReservering.GereserveerdeStoelen.Count() > 0)
            {
                deleteReservering.GereserveerdeStoelen.ForEach((stoel) =>
                {
                    stoel.ReserveringId = null;
                    stoel.Bezet = false;
                });
            }

            _context.Reserveringen.Remove(deleteReservering);
            await _context.SaveChangesAsync();

            // return NoContent();
            return new OkResult();
        }

        public async Task<List<Models.Reservering>> GetReserveringenByUserId(string userId)
        {
            var reserveringQuery = _context.Reserveringen
            .AsNoTracking()
            .Include(r => r.Moment)
                .ThenInclude(m => m!.Voorstelling)
            .Where(v => v.UserId == userId)
            .AsQueryable();

            var reserveringen = await reserveringQuery.ToListAsync();
            return reserveringen.ConvertAll(r => r.ToDto());
        }


    }
}