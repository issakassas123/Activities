using Application.Core;
using Application.Activities.Queries;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddMediatR(
    config => config.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>()
);

builder.Services.AddAutoMapper(cfg =>
{
}, typeof(MappingProfiles));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.MapControllers();

app.UseCors(options =>
    options.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "https://localhost:3001"));

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context);
}
catch(Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex ,"Ann error occured during migration. ");
}

app.Run();