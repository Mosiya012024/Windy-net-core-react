using MongoDB.Driver;
using WindyApplication.Models;

namespace WindyApplication.Respositories
{
    public interface IRepository<TEntity>
    {
        Task<List<TEntity>> GetFavourites();

        Task<TEntity> PostFavourite(TEntity entity); 

        Task<IMongoCollection<TEntity>> GetCollection();
    }
}
