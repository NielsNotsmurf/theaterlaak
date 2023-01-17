using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Models;

namespace theaterlaak.Services
{
    public interface IVoorstellingService
    {
        Task<List<Models.Voorstelling>> GetVoorstellingen();
        Task<ActionResult<Models.Voorstelling>> GetVoorstelling(int id);
        Task AddVoorstelling(Commands.AddOrUpdateVoorstelling voorstelling);
        Task<ActionResult> UpdateVoorstelling(int id, Commands.AddOrUpdateVoorstelling voorstelling);
        Task<ActionResult> DeleteVoorstelling(int id);
    }

    public class voorstellingService : IVoorstellingService
    {
        private ApplicationDbContext _context;

        public voorstellingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Models.Voorstelling>> GetVoorstellingen()
        {
            var voorstellingQuery = _context.Voorstellingen
                .AsNoTracking()
                .Include(v => v.Betrokkene)
                .AsQueryable();

            var voorstellingen = await voorstellingQuery.ToListAsync();
            return voorstellingen.ConvertAll(v => v.ToDto());
        }

        public async Task<ActionResult<Models.Voorstelling>> GetVoorstelling(int id)
        {
            var voorstelling = await _context.Voorstellingen
            .AsNoTracking()
            .Include(v => v.Betrokkene)
            .FirstOrDefaultAsync(v => v.Id == id);

            if (voorstelling == null)
                throw new NotFoundException();

            return voorstelling.ToDto();
        }

        public async Task AddVoorstelling(Commands.AddOrUpdateVoorstelling voorstelling)
        {
            var newVoorstelling = new Entities.Voorstelling
            {
                Titel = voorstelling.Titel,
                BetrokkeneId = voorstelling.BetrokkeneId,
            };

            _context.Add(newVoorstelling);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult> UpdateVoorstelling(int id, Commands.AddOrUpdateVoorstelling voorstelling)
        {
            var updateVoorstelling = await _context.Voorstellingen.FindAsync(id);
            if (updateVoorstelling == null)
                throw new NotFoundException($"Voorstelling met ID '{id}' is niet gevonden.");

            updateVoorstelling.Titel = voorstelling.Titel;
            updateVoorstelling.BetrokkeneId = voorstelling.BetrokkeneId;

            await _context.SaveChangesAsync();

            return new OkResult();
        }

        public async Task<ActionResult> DeleteVoorstelling(int id)
        {
            var deleteVoorstelling = await _context.Voorstellingen.FindAsync(id);
            if (deleteVoorstelling == null)
                throw new NotFoundException($"Voorstelling met ID '{id}' is niet gevonden.");

            _context.Voorstellingen.Remove(deleteVoorstelling);
            await _context.SaveChangesAsync();

            return new OkResult();
        }

    }
}