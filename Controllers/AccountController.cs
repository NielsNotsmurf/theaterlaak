using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using aspnet_react_auth.Helpers;
using Microsoft.AspNetCore.Authorization;
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

    private IAccountService _accountService;
    private readonly AppSettings _appSettings;

    public AccountController(
        IAccountService userService,
        IOptions<AppSettings> appSettings)
    {
        _accountService = userService;
        _appSettings = appSettings.Value;
    }


    
    [HttpPost("authenticate")]
    public IActionResult Authenticate([FromBody] ApplicationUser applicationUser)
    {
        var user = _accountService.Authenticate(applicationUser.UserName, applicationUser.PasswordHash);

        if (user == null)
            return BadRequest("Email or password is incorrect");

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Email as String, user.Id as String)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var tokenString = tokenHandler.WriteToken(token);

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
            applicationUser = _accountService.Create(user, applicationUser.UserName);
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
        var users = _accountService.GetAll();
        List<ApplicationUser> applicationUsers = users.Select(user => new ApplicationUser
        {
            Email = user.Email
        }).ToList();
        return Ok(applicationUsers);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var user = _accountService.GetById(id);
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
            // save 
            _accountService.Update(user, applicationUser.PasswordHash);
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
        _accountService.Delete(id);
        return Ok();
    }
}
