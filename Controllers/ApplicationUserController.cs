using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Data;
using theaterlaak.Exceptions;

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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<List<Models.ApplicationUser>> GetUsers()
    {
        var usersQuery = _dbContext.Users
            .AsNoTracking()
            .AsQueryable();

        return await usersQuery.ToListAsync();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Models.ApplicationUser>> GetUser(string id)
    {
        var user = await _dbContext.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id == id);

        if (user == null)
            throw new NotFoundException();

        return user; 
    }
}