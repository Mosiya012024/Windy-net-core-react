using MongoDB.Driver;
using WindyApplication.Models;
using WindyApplication.Services;

namespace WindyApplication.Respositories
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly MongoDbService mongoDbService;
        public Repository(MongoDbService mongoDbService) {
            this.mongoDbService = mongoDbService;
        }

        public async Task<List<TEntity>> GetFavourites()
        {
            var collection = this.mongoDbService.GetCollection<TEntity>(typeof(TEntity).Name);
            return collection.Find(x=>true).ToList();
      
        }
        public async Task<IMongoCollection<TEntity>> GetCollection()
        {
            return this.mongoDbService.GetCollection<TEntity>(typeof(TEntity).Name);
        }

        public async Task<TEntity> PostFavourite(TEntity entity)
        {
            var collection = this.mongoDbService.GetCollection<TEntity>(typeof (TEntity).Name);
            try
            {
                await collection.InsertOneAsync(entity);
                return entity;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        
    }
}
