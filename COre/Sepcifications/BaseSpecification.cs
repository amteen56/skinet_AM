using System.Linq.Expressions;

namespace Core.Sepcifications
{
    public class BaseSpecification<T> : ISpecifications<T>
    {
        public BaseSpecification()
        {
        }

        public BaseSpecification(Expression<Func<T, bool>> criteria)
        {
            Criteria = criteria;
        }
        public Expression<Func<T, bool>> Criteria { get; }
        public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();

        public Expression<Func<T, object>> OrderBy {get; private set;}

        public Expression<Func<T, object>> OrderByDesending {get; private set;}

        public int Skip {get; private set;}

        public int Take {get; private set;}

        public bool IsPaginationEnabled {get; private set;}

        public void AddInclude(Expression<Func<T, object>> includeExpress)
        {
            Includes.Add(includeExpress);
        }
         public void AddOrderBy(Expression<Func<T, object>> OrderByExpression)
        {
           OrderBy = OrderByExpression;
        }
         public void AddOrderByDesending(Expression<Func<T, object>> OrderByExpression)
        {
           OrderByDesending = OrderByExpression;
        }

        protected void ApplyPaging(int skip, int take){
            Skip = skip;
            Take = take;
            IsPaginationEnabled = true;
        }
    }
}