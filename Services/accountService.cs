using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Commands;
using theaterlaak.Converters;
using theaterlaak.Data;
using theaterlaak.Exceptions;
using theaterlaak.Models;

namespace theaterlaak.Services
{
    public interface IAccountService
    {
        Task<ActionResult<Models.AuthenticateResponse>> Authenticate(LoginApplicationUser applicationUser);
        Task<IdentityResult> Delete(string id);
        Task<ActionResult<Models.ApplicationUser>> GetById(string id);
        Task Register(RegisterApplicationUser applicationUser);
    }

    public class accountService : IAccountService
    {
        private readonly UserManager<Entities.ApplicationUser> _UserManager;
        private readonly SignInManager<Entities.ApplicationUser> _SignInManager;
        private ApplicationDbContext _context;

        public accountService(SignInManager<Entities.ApplicationUser> signInManager, UserManager<Entities.ApplicationUser> userManager, ApplicationDbContext context)
        {
            _SignInManager = signInManager;
            _UserManager = userManager;
            _context = context;
        }

        public async Task<ActionResult<Models.AuthenticateResponse>> Authenticate(LoginApplicationUser applicationUser)
        {
            var user = await _UserManager.FindByNameAsync(applicationUser.UserName);

            if (user == null)
                throw new BadRequestException("User does not exist!");

            var correct = await _SignInManager.CheckPasswordSignInAsync(user, applicationUser.PasswordHash, false);
            Console.WriteLine(correct);
            if (correct != Microsoft.AspNetCore.Identity.SignInResult.Success && !correct.Succeeded)
                throw new BadRequestException("Password is incorrect!");


            // var tokenString = "ik ga hier een token genereren hehe";
            // return basic user info (without password) and token to store client side

            return new AuthenticateResponse
            {
                Id = user.Id,
                UserName = user.UserName,
                // Token
            };
        }

        public async Task<IdentityResult> Delete(string id)
        {
            var response = await _UserManager.DeleteAsync(await _UserManager.FindByIdAsync(id));

            return response;
        }

        public async Task<ActionResult<Models.ApplicationUser>> GetById(string id)
        {
            var user = await _UserManager.FindByIdAsync(id);
            var applicationUser = new ApplicationUser
            {
                Email = user.UserName
            };
            return applicationUser;
        }

        public async Task Register(RegisterApplicationUser applicationUser)
        {
            if(applicationUser.PasswordHash == applicationUser.UserName)
            {
                throw new BadRequestException("Wachtwoord mag niet gelijk zijn aan gebruikersnaam");
            }
            if (!PasswordValidation(applicationUser.PasswordHash))
            {
                throw new BadRequestException("Wachtwoord mag geen woord uit het woordenboek bevatten/is een veelgebruikt wachtwoord/ is een gehackt wachtwoord/bevat een patroon van 2 of meer dezelfde tekens");
            }
            var user = new Entities.ApplicationUser
            {
                UserName = applicationUser.UserName,
                Email = applicationUser.UserName,
                EmailConfirmed = true,
            };

            try
            {
                // save 
                await _UserManager.CreateAsync(user, applicationUser.PasswordHash);
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                throw new BadRequestException(ex.Message);
            }
        }

        public bool PasswordValidation(string password)
        {
            var powned = new HashSet<string>(File.ReadLines("woordenboek/powned.txt"));
            var woordenboek = new HashSet<string>(File.ReadLines("woordenboek/woordenboek.txt"));
            var top10mostused = new HashSet<string>(File.ReadLines("woordenboek/top10-most-used-pw.txt"));
            
            Regex regex = new Regex(@"^(?=.{7,}$)(?=.*[A-Za-z0-9])(?!.*(.)\1{2}).*(?=.*\W)");
            Match match = regex.Match(password);
            if(!match.Success)
            {
                return false;
            }
            if (top10mostused.Contains(password))
            {
                return false;
            }
            if (powned.Contains(password))
            {
                return false;
            }

            //ToLower om woorden met woordenboek te matchen en regex replace om non alphabetic tekens/cijfers te verwijderen
            var passwordTolower = password.ToLower();
            passwordTolower = Regex.Replace(passwordTolower, @"[^a-zA-Z]+", "");
            if (woordenboek.Contains(passwordTolower))
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}