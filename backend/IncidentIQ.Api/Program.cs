using Microsoft.EntityFrameworkCore;
using IncidentIQ.Infrastructure.Data;
using IncidentIQ.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<DeviceService>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    await DbInitializer.SeedAsync(db);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.MapGet("/", () => Results.Redirect("/swagger"));

app.MapGet("/api/health", () =>
{
    return Results.Ok(new
    {
        application = "IncidentIQ AI",
        status = "Healthy",
        version = "1.0.0",
        environment = app.Environment.EnvironmentName,
        timestamp = DateTime.UtcNow
    });
});

app.MapGet("/api/devices", async (DeviceService service) =>
{
    return Results.Ok(await service.GetDevicesAsync());
});

app.Run();