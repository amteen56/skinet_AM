using System.Text.Json;
using Core.Entities;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedsAsync(StoreContext context, ILoggerFactory factory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {
                    var brandsdata =
                        File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");

                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsdata);
                    foreach (var a in brands)
                    {
                        context.ProductBrands.Add(a);

                    }
                    await context.SaveChangesAsync();
                }
                if (!context.ProductTypes.Any())
                {
                    var typesdata =
                        File.ReadAllText("../Infrastructure/Data/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesdata);
                    foreach (var a in types)
                    {
                        context.ProductTypes.Add(a);

                    }
                    await context.SaveChangesAsync();
                }

                if (!context.Products.Any())
                {
                    var proddata =
                        File.ReadAllText("../Infrastructure/Data/SeedData/products.json");

                    var prod = JsonSerializer.Deserialize<List<Product>>(proddata);
                    foreach (var a in prod)
                    {
                        context.Products.Add(a);

                    }
                    await context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                var logger = factory.CreateLogger<StoreContextSeed>(); 
                logger.LogError("Error " + ex.Message);
            }
        }
    }
}