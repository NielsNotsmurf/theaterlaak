using theaterlaak.Data;
using theaterlaak.Models;

namespace theaterlaak.Services
{
    public interface IAccountService
    {
        ApplicationUser Authenticate(string username, string passwordString);
        IEnumerable<ApplicationUser> GetAll();
        ApplicationUser GetById(int id);
        ApplicationUser Create(ApplicationUser user, string passwordString);
        void Update(ApplicationUser user, string passwordString = null);
        void Delete(int id);
    }

    public class accountService : IAccountService
    {
        private ApplicationDbContext _context;

        public accountService(ApplicationDbContext context)
        {
            _context = context;
        }
        public ApplicationUser Authenticate(string username, string passwordString)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(passwordString)) {
                Console.WriteLine("[tijdelijke debug] input is invalid  | Password: " + passwordString + " | UserName: " + username);
                return null;
            }
            var user = _context.Users.SingleOrDefault(x => x.UserName == username);
            if (user == null) {
                Console.WriteLine("applicationUser bestaat niet");
                return null;
            }
            if (!VerifyPasswordHash(passwordString, user.Password, user.PasswordSalt)) {
                Console.WriteLine("password is incorrect");
                return null;
            }
            Console.WriteLine("success");
            return user;
        }

        public ApplicationUser Create(ApplicationUser user, string passwordString)
        {
            if (string.IsNullOrWhiteSpace(passwordString))
                throw new Exception("Password is null");

            if (_context.Users.Any(x => x.UserName == user.UserName))
                throw new Exception("UserName '" + user.UserName + "' is al in gebruik");

            byte[] Password, passwordSalt;
            CreatePasswordHash(passwordString, out Password, out passwordSalt);
            
            user.Email = user.UserName;
            user.Password = Password;
            Console.WriteLine("[tijdelijke debug] on create hash: " + user.Password[1] + user.Password[2]);
            user.PasswordSalt = passwordSalt;
            Console.WriteLine("[tijdelijke debug] on create salt: " + user.PasswordSalt[1] + user.PasswordSalt[2]);

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
            }        }

        public IEnumerable<ApplicationUser> GetAll()
        {
            return _context.Users;
        }

        public ApplicationUser GetById(int id)
        {
            ApplicationUser user = _context.Users.Find(id);
                return user;
        }

        public void Update(ApplicationUser userParam, string passwordString = null)
        {
            var user = _context.Users.Find(userParam.Id);

            if (user == null)
                throw new Exception("ApplicationUser not found");

            if (userParam.UserName != user.UserName)
            {
                if (_context.Users.Any(x => x.UserName == userParam.UserName))
                    throw new Exception("UserName " + userParam.UserName + " is al in gebruik");
            }

            user.Email = userParam.UserName;
            user.UserName = userParam.UserName;

            if (!string.IsNullOrWhiteSpace(passwordString))
            {
                byte[] Password, passwordSalt;
                CreatePasswordHash(passwordString, out Password, out passwordSalt);
                user.Password = Password;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();        
        }

        private static void CreatePasswordHash(string passwordString, out byte[] Password, out byte[] passwordSalt)
        {
            if (passwordString == null) throw new ArgumentNullException("passwordString");
            if (string.IsNullOrWhiteSpace(passwordString)) throw new ArgumentException("ongeldige waarde.", "passwordString");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordString));
                Password = computedHash;
                passwordSalt = hmac.Key;
            }
        }

        private static bool VerifyPasswordHash(string passwordString, byte[] storedHash, byte[] storedSalt)
        {
            if (passwordString == null) throw new ArgumentNullException("passwordString");
            if (string.IsNullOrWhiteSpace(passwordString)) throw new ArgumentException("ongeldige waarde.", "passwordString");
            if (storedHash.Length != 64) throw new ArgumentException("ongeldige lengte van storedhash (64 bytes).", "Password");
            if (storedSalt.Length != 128) throw new ArgumentException("ongeldige lengte van storedsalt (128 bytes).", "Password");
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                Console.WriteLine("[tijdelijke debug] on verify hash: " + storedHash[1] + storedHash[2]);
                Console.WriteLine("[tijdelijke debug] on verify salt: " + storedSalt[1] + storedSalt[2]);
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordString));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i])
                        Console.WriteLine(computedHash[i] + "]  ||  [" + storedHash[i]);
                        return false;
                    
                }
            }

            return true;
        }
    }
}