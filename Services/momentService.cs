using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Commands;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Entities;
using theaterlaak.Exceptions;
using theaterlaak.Models;

namespace theaterlaak.Services
{
    public interface IMomentService
    {
        Task<List<Models.Moment>> GetMomenten();
        Task<ActionResult<Models.Moment>> GetMoment(int id);
        Task AddMoment([FromBody] Commands.AddMoment moment);
        Task DeleteMoment(int id);
    }

    public class momentService : IMomentService
    {
        private ApplicationDbContext _context;

        public momentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddMoment([FromBody] AddMoment moment)
        {
            if (moment.StartDateTime < DateTime.Now || moment.EndDateTime < DateTime.Now)
                throw new BadRequestException("De meegegeven waarden zijn fout.");

            var zaal = new Entities.Zaal { ZaalType = moment.ZaalType };
            _context.Zalen.Add(zaal);
            await _context.SaveChangesAsync();

            checkDateAvailability(moment);

            var stoelen = generateStoelen(moment.ZaalType, zaal.Id);

            _context.Stoelen.AddRange(stoelen);
            await _context.SaveChangesAsync();

            var newMoment = new Entities.Moment
            {
                StartDateTime = moment.StartDateTime,
                EndDateTime = moment.EndDateTime,
                VoorstellingId = moment.VoorstellingId,
                ZaalId = zaal.Id,
            };

            _context.Momenten.Add(newMoment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteMoment(int id)
        {
            var deleteMoment = await _context.Momenten.Include(m => m.Zaal).ThenInclude(z => z!.Stoelen).FirstOrDefaultAsync(m => m.Id == id);
            if (deleteMoment == null)
                throw new NotFoundException($"momenet ID '{id}' is niet gevonden.");

            // if (deleteMoment.GereserveerdeStoelen != null && deleteMoment.GereserveerdeStoelen.Count() > 0)
            // {
            //     deleteMoment.GereserveerdeStoelen.ForEach((stoel) =>
            //     {
            //         stoel.ReserveringId = null;
            //         stoel.Bezet = false;
            //     });
            // }

            // var zaal = deleteMoment.Zaal;
            // _context.Zalen.Remove(zaal);


            _context.Momenten.Remove(deleteMoment);
            await _context.SaveChangesAsync();
        }

        public async Task<ActionResult<Models.Moment>> GetMoment(int id)
        {
            var moment = await _context.Momenten
            .AsNoTracking()
            .Include(m => m.Zaal)
                .ThenInclude(z => z!.Stoelen)
            .Include(m => m.Voorstelling)
            .FirstOrDefaultAsync(v => v.Id == id);

            if (moment == null)
                throw new NotFoundException();

            return moment.ToDto();
        }

        public async Task<List<Models.Moment>> GetMomenten()
        {
            var momentenQuery = _context.Momenten
            .AsNoTracking()
            .Include(m => m.Zaal)
            .Include(m => m.Voorstelling)
            .AsQueryable();

            var momenten = await momentenQuery.ToListAsync();
            return momenten.ConvertAll(v => v.ToDto());
        }

        private List<Entities.Stoel> generateStoelen(ZaalType zaalType, int zaalId)
        {
            var stoelen = new List<Entities.Stoel>();
            if (zaalType == ZaalType.Zaal_1)
            {
                for (int i = 1; i <= 20; i++)
                {
                    stoelen.Add(new Entities.Stoel { Rij = 1, ZitPlaats = i, StoelRang = TypeStoel.EersteRangs, ZaalId = zaalId });
                    for (int j = 2; j <= 6; j++)
                    {
                        stoelen.Add(new Entities.Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.TweedeRangs, ZaalId = zaalId });
                    }
                    for (int j = 7; j <= 1; j++)
                    {
                        stoelen.Add(new Entities.Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.DerdeRangs, ZaalId = zaalId });
                    }
                }
            }
            else if (zaalType == ZaalType.Zaal_2)
            {
                for (int i = 1; i <= 20; i++)
                {
                    stoelen.Add(new Entities.Stoel { Rij = 1, ZitPlaats = i, StoelRang = TypeStoel.EersteRangs, ZaalId = zaalId });
                    for (int j = 2; j <= 9; j++)
                    {
                        stoelen.Add(new Entities.Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.TweedeRangs, ZaalId = zaalId });
                    }
                }
            }
            else if (zaalType == ZaalType.Zaal_3)
            {
                for (int i = 1; i <= 10; i++)
                {
                    stoelen.Add(new Entities.Stoel { Rij = 1, ZitPlaats = i, StoelRang = TypeStoel.EersteRangs, ZaalId = zaalId });
                    for (int j = 2; j <= 9; j++)
                    {
                        stoelen.Add(new Entities.Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.TweedeRangs, ZaalId = zaalId });
                    }
                }
            }
            else if (zaalType == ZaalType.Zaal_4)
            {
                for (int i = 1; i <= 20; i++)
                {
                    for (int j = 1; j <= 2; j++)
                    {
                        stoelen.Add(new Entities.Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.EersteRangs, ZaalId = zaalId });
                    }
                    for (int j = 3; j <= 12; j++)
                    {
                        stoelen.Add(new Entities.Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.TweedeRangs, ZaalId = zaalId });
                    }
                    for (int j = 13; j <= 22; j++)
                    {
                        stoelen.Add(new Entities.Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.DerdeRangs, ZaalId = zaalId });
                    }
                }
            }
            else
            {
                for (int i = 1; i <= 10; i++)
                {
                    for (int j = 1; j <= 3; j++)
                    {
                        stoelen.Add(new Entities.Stoel { Rij = j, ZitPlaats = i, StoelRang = TypeStoel.Geen_Rang, ZaalId = zaalId });
                    }
                }
            }

            return stoelen;
        }

        private void checkDateAvailability(Commands.AddMoment moment)
        {
            if (moment.StartDateTime >= moment.EndDateTime)
                throw new BadRequestException("Start tijd is later dan de eind tijd en dit kan niet.");

            if (_context.Momenten.Any(m => m.VoorstellingId == moment.VoorstellingId && ((moment.StartDateTime >= m.StartDateTime && moment.StartDateTime < m.EndDateTime) || (moment.EndDateTime > m.StartDateTime && moment.EndDateTime <= m.EndDateTime))))
                throw new BadRequestException("De voorstelling kan niet op hetzelfde moment worden gemaakt.");

            if (_context.Momenten.Include(m => m.Zaal).Any(m => m.Zaal!.ZaalType == moment.ZaalType && ((moment.StartDateTime >= m.StartDateTime && moment.StartDateTime < m.EndDateTime) || (moment.EndDateTime > m.StartDateTime && moment.EndDateTime <= m.EndDateTime))))
                throw new BadRequestException("De zaal kan niet op hetzelfde moment worden gebruikt.");
        }

    }
}