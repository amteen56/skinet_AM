using API.Helpers;
using AutoMapper;
using Core.DTO;
using Core.Entities;
using Core.Interfaces;
using Core.Sepcifications;
using COre.DTO;
using COre.Entities;
using COre.Sepcifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository _basketRepository;
        public BasketController(IBasketRepository basketRepository)
        {
            _basketRepository = basketRepository;
        }

        [HttpGet("basket")]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket = await _basketRepository.GetBasketAsync(id);

            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost("basket")]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket([FromBody]CustomerBasket basket)
        {
            var updatedBasket = await _basketRepository.UpdateBastetAsync(basket);

            return Ok(updatedBasket);
        }

        [HttpDelete("basket")]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}