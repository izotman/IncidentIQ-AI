var builder = WebApplication.CreateBuilder(args);

// Add OpenAPI services
builder.Services.AddOpenApi();

var app = builder.Build();

// Enable OpenAPI in Development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();


app.MapGet("/", () => Results.Redirect("/openapi/v1.json"));

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
})
.WithName("Health");

app.Run();