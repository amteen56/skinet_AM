using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Sepcifications;
using COre.DTO;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _reepo;
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _brandRepo;
        private readonly IGenericRepository<ProductType> _typeRepo;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository reepo,
         IGenericRepository<Product> productrepo,
         IGenericRepository<ProductBrand> brandrepo,
         IGenericRepository<ProductType> typerepo,
         IMapper mapper
        )
        {
            _reepo = reepo;
            _productRepo = productrepo;
            _brandRepo = brandrepo;
            _typeRepo = typerepo;
            _mapper = mapper;

        }
        [HttpGet("GetProducts")]
        public async Task<ActionResult<Pagination<Product>>> GetProducts([FromQuery]ProductSpecParams specParams)
        {
            var spec = new ProductWithBrandsAndTypesSpecifications(specParams);
            var countspec = new ProductWithBrandsAndTypesSpecifications(specParams);
            var totalItems = await _productRepo.CountAsync(spec);
            var list = await _productRepo.ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductDto>>(list);
            return Ok(new Pagination<ProductDto>(specParams.PageIndex, specParams.PageSize, totalItems, data));
        }
        [HttpGet("GetProductById")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
             var spec = new ProductWithBrandsAndTypesSpecifications(id);
             var product = await _productRepo.GetEntityBySpec(spec);

            return Ok(_mapper.Map<Product,ProductDto>(product));
        }
        [HttpGet("GetBrands")]
        public async Task<ActionResult<List<Product>>> GetBrands()
        {
            return Ok(await _brandRepo.ListAllAsync());
        }
        [HttpGet("GetTypes")]
        public async Task<ActionResult<List<Product>>> GetTypes()
        {
            return Ok(await _typeRepo.ListAllAsync());
        }
    }
}