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
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

builder.Services.AddAuthentication()
    .AddIdentityServerJwt();

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
app.UseIdentityServer();
app.UseAuthorization();

app.UseCors();
app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
