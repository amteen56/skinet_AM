using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddDbContext<StoreContext>(x => x.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
var app = builder.Build();

using(var scope = app.Services.CreateScope()){
    var services = scope.ServiceProvider;
    var loggetFactory = services.GetRequiredService<ILoggerFactory>();
    try{
        var context = services.GetRequiredService<StoreContext>();
        await context.Database.MigrateAsync();

    }catch (Exception ex){
        var logger = loggetFactory.CreateLogger<Program>();
        logger.LogError(ex,"An error occured during migration");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
