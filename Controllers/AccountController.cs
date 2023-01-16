using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using aspnet_react_auth.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using theaterlaak.Models;
using theaterlaak.Services;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AccountController : ControllerBase
{

    private readonly UserManager<ApplicationUser> _UserManager;
    private readonly AppSettings _appSettings;

    public AccountController(
        IOptions<AppSettings> appSettings)
    {
        _appSettings = appSettings.Value;
    }


    
    [HttpPost("authenticate")]
    public IActionResult Authenticate([FromBody] ApplicationUser applicationUser)
    {
        var user = _UserManager.FindByNameAsync(applicationUser.UserName);

        if (user == null)
            return BadRequest("Email or password is incorrect");

        

        // return basic user info (without password) and token to store client side
        return Ok(new
        {
            Id = user.Id,
            Email = user.Email,
            Token = tokenString
        });
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] ApplicationUser applicationUser)
    {
        var user = new ApplicationUser
        {
            UserName = applicationUser.UserName
        };

        try
        {
            // save 
            applicationUser = _UserManager.Create(user, applicationUser.UserName);
            return Ok();
        }
        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _UserManager.GetAll();
        List<ApplicationUser> applicationUsers = users.Select(user => new ApplicationUser
        {
            Email = user.Email
        }).ToList();
        return Ok(applicationUsers);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _UserManager.GetById(id);
        var applicationUser = new ApplicationUser
        {
            Email = user.Email
        };
        return Ok(applicationUser);
    }

    [HttpPut("{id}")]
    public IActionResult Update(string id, [FromBody] ApplicationUser applicationUser)
    {
        // map dto to entity and set id
        var user = new ApplicationUser
        {
            UserName = applicationUser.UserName
        };
        user.Id = id;

        try
        {
            _UserManager.UpdatePasswordHash(user, applicationUser.PasswordHash, true);
            return Ok();
        }

        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _UserManager.Delete(id);
        return Ok();
    }
}
