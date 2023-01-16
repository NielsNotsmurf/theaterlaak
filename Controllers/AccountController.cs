using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using aspnet_react_auth.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using theaterlaak.Exceptions;
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
        UserManager<ApplicationUser> userManager,
        IOptions<AppSettings> appSettings)
    {
        _UserManager = userManager;
        _appSettings = appSettings.Value;
    }


    
    [HttpPost("authenticate")]
    public async Task<ActionResult<ApplicationUser>> Authenticate([FromBody] ApplicationUser applicationUser)
    {
        var user = await _UserManager.FindByNameAsync(applicationUser.UserName);

        if (user == null)
            throw new BadRequestException("Email or password is incorrect");

        
        var tokenString = "ik ga hier een token genereren hehe";
        // return basic user info (without password) and token to store client side
        return Ok(new
        {
            Id = user.Id,
            Email = user.Email,
            Token = tokenString
        });
    }

    [HttpPost("register")]
    public async Task<ActionResult<ApplicationUser>> Register([FromBody] ApplicationUser applicationUser)
    {
        var user = new ApplicationUser
        {
            UserName = applicationUser.UserName
        };

        try
        {
            // save 
            await _UserManager.CreateAsync(user, applicationUser.PasswordHash);
            return Ok();
        }
        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(ex.Message);
        }
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<ApplicationUser>> GetById(string id)
    {
        var user = await _UserManager.FindByIdAsync(id);
        var applicationUser = new ApplicationUser
        {
            Email = user.UserName
        };
        return Ok(applicationUser);
    }
//update password
    // [HttpPut("{id}")]
    // public async Task<ActionResult<ApplicationUser>> Update(string id, [FromBody] ApplicationUser applicationUser)
    // {
    //     // map dto to entity and set id
    //     var user = new ApplicationUser
    //     {
    //         UserName = applicationUser.UserName
    //     };
    //     user.Id = id;

    //     try
    //     {
    //         await _UserManager.UpdateAsync(user, applicationUser.PasswordHash, true);
    //         return Ok();
    //     }

    //     catch (Exception ex)
    //     {
    //         // return error message if there was an exception
    //         return BadRequest(ex.Message);
    //     }
    // }

    [HttpDelete("{id}")]
    public async Task<IdentityResult> Delete(string id)
    {
        var response = await _UserManager.DeleteAsync(await _UserManager.FindByIdAsync(id));
        
        return response;
        
    }
}
