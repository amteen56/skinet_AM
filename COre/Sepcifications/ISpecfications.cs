using System.Linq.Expressions;

namespace Core.Sepcifications
{
    public interface ISpecifications<T>
    {
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }
        Expression<Func<T, object>> OrderBy { get; }
        Expression<Func<T, object>> OrderByDesending { get; }
        int Skip { get; }
        int Take { get; }
        bool IsPaginationEnabled { get; }

    }
}