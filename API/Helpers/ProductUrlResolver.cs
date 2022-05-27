using AutoMapper;
using Core.Entities;
using COre.DTO;

namespace API.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductDto, string>
    {
        private readonly IConfiguration _config;

        public ProductUrlResolver(IConfiguration configuration)
        {
            _config = configuration;
        }

        public string Resolve(Product source, ProductDto destination, string destMember, ResolutionContext context)
        {
           if(!string.IsNullOrEmpty(source.PictureUrl)){
               return _config["ApiUrl"] + source.PictureUrl;
           }
           return null;
        }
    }
}