using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context)
        {
            _context = context;
        }
        public async Task<IReadOnlyList<ProductBrand>> GetBrandsistAsync() => await _context.ProductBrands.ToListAsync();
        public async Task<Product> GetProductByIdAsync(int id) => await _context.Products
        .Include(p => p.ProductBrand)
        .Include(p => p.ProductType)
        .FirstOrDefaultAsync(p => p.Id == id);
        

        public async Task<IReadOnlyList<Product>> GetProductsListAsync() => await _context.Products
        .Include(p => p.ProductBrand)
        .Include(p => p.ProductType)
        .ToListAsync();
        public async Task<IReadOnlyList<ProductType>> GetTypesListAsync() => await _context.ProductTypes.ToListAsync();

    }
}