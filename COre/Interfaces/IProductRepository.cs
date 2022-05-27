using Core.Entities;
namespace Core.Interfaces
{
    public interface IProductRepository
    {
         Task<Product> GetProductByIdAsync(int id);
         Task<IReadOnlyList<Product>> GetProductsListAsync();
        Task<IReadOnlyList<ProductType>> GetTypesListAsync();
        Task<IReadOnlyList<ProductBrand>> GetBrandsistAsync();
    }
}