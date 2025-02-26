namespace WindyApplication.Models
{
    public class FormattedWeatherAPIData
    {
        public string Name { get; set; }
        public string Country { get; set; }

        public double Lattitude { get; set; }

        public double Longitude { get; set; }
        public string LocalTime { get; set; }

        public string LocalDate { get; set; }

        public string SunriseDateTime { get; set; }

        public string SunsetDateTime { get; set; }

        public string Description { get; set; }

        public double Temp { get; set; }

        public double Temp_min { get; set; }

        public double Temp_max { get; set; }

        public double Real_feel { get; set; }

        public double Speed { get; set; }

        public int Humidity { get; set; }

        public string Icon { get; set; }

        public List<HourlyForecast> HourlyForecast { get; set; }

        public List<HourlyForecast> DailyForecast { get; set; }



    }
    public class  HourlyForecast
    {
        public string LocalTime { get; set; }

        public string LocalDate { get; set; }

        public string Icon { get; set; }

        public double Temp { get; set; }

        public string message { get; set; }
    }
}
