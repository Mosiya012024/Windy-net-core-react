using Microsoft.AspNetCore.Http;

namespace WindyApplication.Models
{
    public class ForecastResponse
    {
        public IList<Forecast> list { get; set; }

    }

    public class Forecast
    {
        
        public int dt { get; set; }

        public Mains main { get; set; }

        public Weather[] weather { get; set; }

        public string dt_txt { get; set; }

    }
    public class Mains
    {
        public double temp { get; set; }
    }
}