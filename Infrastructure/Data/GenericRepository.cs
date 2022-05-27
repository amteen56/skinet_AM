using Core.Entities;
using Core.Interfaces;
using Core.Sepcifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _context;

        public GenericRepository(StoreContext context)
        {
            _context = context;
        }
        public async Task<T> GetByIdAsync(int id) => await _context.Set<T>().FindAsync(id);
        public async Task<IReadOnlyList<T>> ListAllAsync() => await _context.Set<T>().ToListAsync();
        public async Task<T> GetEntityBySpec(ISpecifications<T> spec) => await ApplySepecification(spec).FirstOrDefaultAsync();
        public async Task<IReadOnlyList<T>> ListAsync(ISpecifications<T> spec) => await ApplySepecification(spec).ToListAsync();
        public async Task<int> CountAsync(ISpecifications<T> spec)
        {
            return await ApplySepecification(spec).CountAsync();
        }
        private IQueryable<T> ApplySepecification(ISpecifications<T> spec) => SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);

    }
}