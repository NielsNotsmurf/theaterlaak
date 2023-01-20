using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Converters;
using Microsoft.AspNetCore.Authorization;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ApplicationUserController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    public ApplicationUserController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [Authorize(Roles = "Beheerder")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.ApplicationUser>> GetUsers()
    {
        var usersQuery = _dbContext.Users
            .AsNoTracking()
            .AsQueryable();

        return await usersQuery.Select(u => u.ToDto()).ToListAsync();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Models.ApplicationUser>> GetUser(string id)
    {
        var user = await _dbContext.Users
            .AsNoTracking()
            .Include(u => u.Reserveringen)
            .FirstOrDefaultAsync(v => v.Id == id);

        if (user == null)
            throw new NotFoundException();

        // user.Reserveringen = await _dbContext.Reserveringen.Where(r => r.UserId == id).ToListAsync();

        return user.ToDto();
    }
}