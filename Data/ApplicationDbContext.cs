using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Duende.IdentityServer.EntityFramework.Options;
using theaterlaak.Entities;

namespace theaterlaak.Data;

public class ApplicationDbContext : ApiAuthorizationDbContext<Models.ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        : base(options, operationalStoreOptions)
    {
    }

    public DbSet<Reservering> Reserveringen => Set<Reservering>();
    public DbSet<Voorstelling> Voorstellingen => Set<Voorstelling>();
    public DbSet<Stoel> Stoelen => Set<Stoel>();
    public DbSet<Zaal> Zalen => Set<Zaal>();
    public DbSet<Moment> Momenten => Set<Moment>();
    // public DbSet<Betrokkene> Betrokkenen => Set<Betrokkene>();
}
