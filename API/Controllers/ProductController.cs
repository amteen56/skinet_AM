using Core.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductController : ControllerBase
    {
        private readonly StoreContext _context;
        public ProductController(StoreContext context){
            _context = context;
        }
        [HttpGet("GetProducts")]
        public async Task<ActionResult<List<Product>>> GetProducts(){
            return Ok(await _context.Products.ToListAsync());
        }
        [HttpGet("GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id){
            return Ok(await _context.Products.FindAsync(id));
        }
    }
}