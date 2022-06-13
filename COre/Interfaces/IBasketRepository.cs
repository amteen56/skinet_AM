using COre.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetBasketAsync(string basketId);
        Task<CustomerBasket> UpdateBastetAsync(CustomerBasket bashket);
        Task<bool> DeleteBasketAsync(string basketId);
    }
}