using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace WindyApplication.Models
{
    public class UserFavourites
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("_id")]
        public string UserId { get; set; }

        public string Username { get; set; }
        public List<string> Favourites { get; set; }
    }
}
