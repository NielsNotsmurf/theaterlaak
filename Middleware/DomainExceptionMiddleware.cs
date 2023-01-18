using theaterlaak.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace theaterlaak.Middleware;

public class DomainExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<DomainExceptionMiddleware> _logger;

    public DomainExceptionMiddleware(RequestDelegate next, ILogger<DomainExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (DomainException ex)
        {
            if (context.Response.HasStarted)
            {
                _logger.LogWarning("The response has already started; the middleware will not be executed.");
                throw;
            }

            context.Response.Clear();
            context.Response.StatusCode = (int)ex.StatusCode;
            context.Response.ContentType = "application/problem+json; charset=utf-8";

            await context.Response.WriteAsJsonAsync(new ProblemDetails
            {
                Status = (int)ex.StatusCode,
                Title = ex.Message,
            });
        }
    }
}