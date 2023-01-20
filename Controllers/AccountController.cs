using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using aspnet_react_auth.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using theaterlaak.Exceptions;
using theaterlaak.Commands;
using theaterlaak.Entities;
using theaterlaak.Services;
using Microsoft.AspNetCore.Authorization;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _UserManager;
    private readonly AppSettings _appSettings;
    private readonly RoleManager<IdentityRole> _RoleManager;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        IOptions<AppSettings> appSettings)
    {
        _UserManager = userManager;
        _RoleManager = roleManager;
        _appSettings = appSettings.Value;
    }


[HttpPost("authenticate")]
public async Task<IActionResult> authenticate([FromBody] LoginApplicationUser applicationUser)
{
    var _user = await _UserManager.FindByNameAsync(applicationUser.UserName);
    if (_user != null)
        if (await _UserManager.CheckPasswordAsync(_user, applicationUser.PasswordHash))
        {
                var secret = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        "awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef"));
                var signingCredentials = new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, _user.UserName) };
                var roles = await _UserManager.GetRolesAsync(_user);
                var Email = _user.UserName;
                foreach (var role in roles)
                    claims.Add(new Claim(ClaimTypes.Role, role));

                var tokenOptions = new JwtSecurityToken
                (
                    issuer: "https://localhost:7242",
                    audience: "https://localhost:7242",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(180),
                    signingCredentials: signingCredentials
                );
            return Ok(new { accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions), Roles=roles, Id= _user.Id, Email= _user.UserName});
        }

    return Unauthorized();
}

    [HttpPost("register")]
    public async Task<ActionResult<ApplicationUser>> Register([FromBody] RegisterApplicationUser applicationUser)
    {
        if (!(await _RoleManager.RoleExistsAsync("Beheerder")) || !(await _RoleManager.RoleExistsAsync("Gebruiker"))) { 
            var result1 = await _RoleManager.CreateAsync(new IdentityRole("Beheerder"));
            var result2 = await _RoleManager.CreateAsync(new IdentityRole("Gebruiker"));
        }
        var user = new ApplicationUser
        {
            UserName = applicationUser.UserName
        };
        try
        {
            // save 
            await _UserManager.CreateAsync(user, applicationUser.PasswordHash);
            await _UserManager.AddToRoleAsync(user, "Gebruiker");
            return Ok();
        }
        catch (Exception ex)
        {
            // return error message if there was an exception
            return BadRequest(ex.Message);
        }
    }
    
    [HttpGet("{id}")]
    [Authorize(Roles = "Gebruiker")]
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
    [Authorize(Roles = "Beheerder")]
    public async Task<IdentityResult> Delete(string id)
    {
        var response = await _UserManager.DeleteAsync(await _UserManager.FindByIdAsync(id));
        
        return response;
        
    }
}
