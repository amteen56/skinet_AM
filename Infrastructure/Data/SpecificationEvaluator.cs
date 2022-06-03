using Core.Entities;
using Core.Sepcifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity> where TEntity : BaseEntity
    {
        public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, 
        ISpecifications<TEntity> sepc){
            var query = inputQuery;

            if(sepc.Criteria != null){
                query = query.Where(sepc.Criteria);
            }
            if(sepc.OrderBy != null){
                query = query.OrderBy(sepc.OrderBy);
            }
             if(sepc.OrderByDesending != null){
                query = query.OrderByDescending(sepc.OrderByDesending);
            }
            if(sepc.IsPaginationEnabled){
                query = query.Skip(sepc.Skip).Take(sepc.Take);
            }
            query = sepc.Includes.Aggregate(query, (current, include) => current.Include(include));
            return query;
        }
    }
}