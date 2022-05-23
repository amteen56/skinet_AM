using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _reepo;
        public ProductController(IProductRepository reepo){
            _reepo = reepo;
        }
        [HttpGet("GetProducts")]
        public async Task<ActionResult<List<Product>>> GetProducts(){
            return Ok(_reepo.GetProductsListAsync());
        }
        [HttpGet("GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id){
            return Ok(_reepo.GetProductByIdAsync(id));
        }
    }
}