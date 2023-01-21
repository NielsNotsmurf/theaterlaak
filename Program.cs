using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using theaterlaak.Data;
using theaterlaak.Entities;
using theaterlaak.Middleware;
using theaterlaak.Services;
using NSwag;
using NSwag.Generation.Processors.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddCors(option => 
{
    option.AddDefaultPolicy(builder => builder.WithOrigins("https://localhost:44492").AllowAnyHeader().AllowAnyMethod());
});

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.Converters.Add(new StringEnumConverter());
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});
//Joeri toelichting geven over dit stukje
builder.Services.AddSwaggerDocument(document =>
{
    document.AddSecurity("JWT", Enumerable.Empty<string>(), new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.ApiKey,
        Name = "Authorization",
        In = OpenApiSecurityApiKeyLocation.Header,
        Description = "Type into the text box: Bearer {jour JWT token}."
    });

    document.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("JWT"));

    document.Title = "TheatherlaakApi";
    document.Version = "v1";
    document.Description = "The ASP.NET Core web API for Theater Laak";

    document.RequireParametersWithoutDefault = true;
});

builder.Services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://localhost:7242",
        ValidAudience = "https://localhost:7242",
        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("awef98awef978haweof8g7aw789efhh789awef8h9awh89efh89awe98f89uawef9j8aw89hefawef"))
    };
});

builder.Services.AddTransient<IReserveringService, reserveringService>();
builder.Services.AddTransient<IBetrokkeneService, betrokkeneService>();
builder.Services.AddTransient<IVoorstellingService, voorstellingService>();
builder.Services.AddTransient<IMomentService, momentService>();
builder.Services.AddTransient<IAccountService, accountService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseMiddleware<DomainExceptionMiddleware>();

app.UseOpenApi();
app.UseSwaggerUi3(o => o.DocumentTitle = "Theather Laak");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors();
app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
