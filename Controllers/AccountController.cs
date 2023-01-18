using aspnet_react_auth.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using theaterlaak.Entities;
using theaterlaak.Commands;
using theaterlaak.Services;

namespace theaterlaak.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class AccountController : ControllerBase
{
    private UserManager<ApplicationUser> _UserManager;
    private IAccountService _accountService;
    private readonly AppSettings _appSettings;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        IAccountService accountService,
        IOptions<AppSettings> appSettings)
    {
        _accountService = accountService;
        _appSettings = appSettings.Value;
        _UserManager = userManager;
    }



    [HttpPost("authenticate")]
    public async Task<ActionResult<Models.AuthenticateResponse>> Authenticate([FromBody] LoginApplicationUser applicationUser)
    {
        var response = await _accountService.Authenticate(applicationUser);
        return Ok(response);
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterApplicationUser applicationUser)
    {
        await _accountService.Register(applicationUser);
        return Ok();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Models.ApplicationUser>> GetById(string id)
    {
        return await _accountService.GetById(id);
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
        return await _accountService.Delete(id);
    }
}
