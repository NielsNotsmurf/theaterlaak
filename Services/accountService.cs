using theaterlaak.Data;
using theaterlaak.Models;

public interface IAccountService
{
    ApplicationUser Authenticate(string Email, string password);
    IEnumerable<ApplicationUser> GetAll();
    ApplicationUser GetById(int id);
    ApplicationUser Create(ApplicationUser user, string password);
    void Update(ApplicationUser user, string password = null);
    void Delete(int id);
}

public class accountService : IAccountService
{
    private ApplicationDbContext _context;

    public accountService(ApplicationDbContext context)
    {
        _context = context;
    }
    public ApplicationUser Authenticate(string Email, string password)
    {
        Console.WriteLine(Email);
        if (string.IsNullOrEmpty(Email) || string.IsNullOrEmpty(password))
            return null;
        Console.WriteLine("Users count " + _context.Users.Count());
        var user = _context.Users.SingleOrDefault(x => x.Email == Email);

        // check if username exists
        if (user == null)
            return null;

        // check if password is correct
        var result = System.Text.Encoding.UTF8.GetBytes(user.PasswordHash);
        if (!VerifyPasswordHash(password, result))
            return null;

        // authentication successful
        return user;
    }

    public ApplicationUser Create(ApplicationUser user, string password)
    {
        // validation
        if (string.IsNullOrWhiteSpace(password))
            throw new Exception("Password is verplicht");

        if (_context.Users.Any(x => x.Email == user.Email))
            throw new Exception("Email '" + user.Email + "' is al in gebruik");

        byte[] passwordHash, passwordSalt;
        CreatePasswordHash(password, out passwordHash, out passwordSalt);
        string result = System.Text.Encoding.UTF8.GetString(passwordHash);

        user.PasswordHash = result;

        _context.Users.Add(user);
        _context.SaveChanges();

        return user;
    }

    public void Delete(int id)
    {
        var user = _context.Users.Find(id);
        if (user != null)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }

    public IEnumerable<ApplicationUser> GetAll()
    {
        return _context.Users;
    }

    public ApplicationUser GetById(int id)
    {
        return _context.Users.Find(id);
    }

    public void Update(ApplicationUser userParam, string password = null)
    {
        var user = _context.Users.Find(userParam.Id);

        if (user == null)
            throw new Exception("Gebruiker niet gevonden");

        if (userParam.Email != user.Email)
        {
            // username has changed so check if the new username is already taken
            if (_context.Users.Any(x => x.Email == userParam.Email))
                throw new Exception("Username " + userParam.Email + " is al in gebruik");
        }

        // update user properties
        user.UserName = userParam.UserName;

        // update password if it was entered
        if (!string.IsNullOrWhiteSpace(password))
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            string result = System.Text.Encoding.UTF8.GetString(passwordHash);

            user.PasswordHash = result;
        }

        _context.Users.Update(user);
        _context.SaveChanges();
    }

    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        if (password == null) throw new ArgumentNullException("password");
        if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Waarde mag niet leeg zijn of string met alleen witruimte.", "password");

        using (var hmac = new System.Security.Cryptography.HMACSHA512())
        {
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }

    private static bool VerifyPasswordHash(string password, byte[] storedHash)
    {
        if (password == null) throw new ArgumentNullException("password");
        if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Waarde mag niet leeg zijn of string met alleen witruimte.", "password");
        if (storedHash.Length != 64) throw new ArgumentException("Ongeldige lengte van wachtwoord-hash (64 bytes verwacht).", "passwordHash");

        return true;
    }
}