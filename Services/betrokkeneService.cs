using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Models;
using theaterlaak.Entities;
using theaterlaak.Commands;

namespace theaterlaak.Services
{
    public interface IBetrokkeneService
    {
        Task<List<Models.Betrokkene>> GetBetrokkenen();
        Task<ActionResult<Models.Betrokkene>> GetBetrokkene(int id);
        Task AddBetrokkene(Commands.AddBetrokkene AddBetrokkene);
    }

    public class betrokkeneService : IBetrokkeneService
    {
        private ApplicationDbContext _context;

        public betrokkeneService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task AddBetrokkene(AddBetrokkene betrokkene)
        {
            var newBetrokkene = new Entities.Betrokkene
            {
                TypePersoon = betrokkene.TypePersoon,
                Naam = betrokkene.Naam,
                Omschrijving = betrokkene.Omschrijving,
                Afbeelding = betrokkene.Afbeelding ?? "https://imgur.com/BxPUXot.png",
                GeboorteDatum = betrokkene.GeboorteDatum,
            };

            _context.Add(newBetrokkene);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Models.Betrokkene>> GetBetrokkenen()
        {
            var betrokkenenQuery = _context.Betrokkenen
            .AsNoTracking()
            .AsQueryable();

            var betrokkenen = await betrokkenenQuery.ToListAsync();
            return betrokkenen.ConvertAll(v => v.ToDto());
        }

        public async Task<ActionResult<Models.Betrokkene>> GetBetrokkene(int id)
        {
            var betrokkene = await _context.Betrokkenen
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id == id);

            if (betrokkene == null)
                throw new NotFoundException();

            return betrokkene.ToDto();
        }
    }
}