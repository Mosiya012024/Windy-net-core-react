namespace WindyApplication.Models
{
    public class WeatherResponse
    {
        public Weather[] weather { get; set; }

        public Main main { get; set; }

        public string name { get; set; }

        public Sys sys { get; set; }

        public int timezone { get; set; }

        public string LocalTime { get; set; }

        public string LocalDate { get; set; }

        public wind wind { get; set; }

        public Coord coord { get; set; }
    }

    public class Coord
    {
        public double lon { get; set; }

        public double lat { get; set; }
    }

    public class Sys
    {
        public long sunrise { get; set; }

        public long sunset { get; set; }
        
        public string country { get; set; }

    }

    public class wind
    {
        public double speed { get; set; }
    }

    public class Weather
    {
        public string main { get; set; }

        public string icon { get; set; }
    }

    public class Main
    {
        public double temp { get; set; }
        public double temp_min { get; set; }
        public double temp_max { get; set; }
        public double feels_like { get; set; }
        public int humidity { get; set; }
    }
}
