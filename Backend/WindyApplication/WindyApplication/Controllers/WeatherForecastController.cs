using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;
using System.Text.Json;
using WindyApplication.Enum;
using WindyApplication.Models;
using WindyApplication.Respositories;

namespace WindyApplication.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IHttpClientFactory httpClientFactory;
        private readonly IConfiguration configuration;
        private readonly IRepository<UserFavourites> repository;
        

        public WeatherForecastController(IHttpClientFactory httpClientFactory,IConfiguration configuration, IRepository<UserFavourites> repository)
        {
            this.httpClientFactory = httpClientFactory;
            this.configuration = configuration;
            this.repository = repository;
        }

        [HttpGet]
        [Route("/get/Weather")]
        public async Task<IActionResult> GetWeatherForecast(string tempType, string? city, string? lattitude, string? longitude)
        {
            ResponseDto result = new ResponseDto();
            var Api_key = this.configuration.GetValue<string>("API:APIKey");
            HttpRequestMessage request;
            if(city==null)
            {
                request = new HttpRequestMessage(HttpMethod.Get, $"data/2.5/weather?lat={lattitude}&lon={longitude}&appid={Api_key}");
            }
            else
            {
                request = new HttpRequestMessage(HttpMethod.Get, $"data/2.5/weather?q={city}&appid={Api_key}");
            }
            var client = httpClientFactory.CreateClient("WeatherAPI");
            try
            {
                var response = client.SendAsync(request);
                var APIresult = await response.Result.Content.ReadAsStreamAsync();
                var weatherResponse = JsonSerializer.Deserialize<WeatherResponse>(APIresult);
                Console.WriteLine(weatherResponse);
                //typeof(T).GetProperties()
                //    .All(p => p.GetValue(obj) == null);
                //bool xyz = typeof(WeatherResponse).GetProperties().All(x => (x.GetValue(weatherResponse) == null));
                //bool xyzw = typeof(WeatherResponse).GetProperties().Except(weatherResponse.timezone);
                if (weatherResponse?.name != null)
                {
                    FormattedWeatherAPIData formatedWeatherAPIData = new FormattedWeatherAPIData()
                    {
                        Name = weatherResponse.name,
                        Country = weatherResponse.sys.country!,
                        Lattitude = weatherResponse.coord.lat,
                        Longitude = weatherResponse.coord.lon,
                        LocalDate = DateTime.Now.ToString("dddd, dd MMM yyyy"),
                        LocalTime = DateTime.Now.ToString("hh:mm tt"),
                        SunriseDateTime = DateTimeOffset.FromUnixTimeSeconds(weatherResponse.sys.sunrise).UtcDateTime.AddSeconds(weatherResponse.timezone).ToString("hh:mm tt"),
                        SunsetDateTime = DateTimeOffset.FromUnixTimeSeconds(weatherResponse.sys.sunset).UtcDateTime.AddSeconds(weatherResponse.timezone).ToString("hh:mm tt"),
                        Description = weatherResponse.weather[0].main,
                        Temp = tempType == "C" ? (weatherResponse.main.temp- 273.15) : ((weatherResponse.main.temp - 273.15) * 9 / 5 + 32),
                        Temp_min = tempType == "C" ? (weatherResponse.main.temp_min - 273.15) : ((weatherResponse.main.temp_min - 273.15) * 9 / 5 + 32),
                        Temp_max = tempType == "C" ? (weatherResponse.main.temp_max - 273.15) : ((weatherResponse.main.temp_max - 273.15) * 9 / 5 + 32),
                        Real_feel = tempType == "C" ? (weatherResponse.main.feels_like - 273.15) : ((weatherResponse.main.feels_like - 273.15) * 9 / 5 + 32),
                        Speed = weatherResponse.wind.speed,
                        Humidity = weatherResponse.main.humidity,
                        Icon = weatherResponse.weather[0].icon,
                    };
                    if (weatherResponse.coord.lat != null && weatherResponse.coord.lon != null)
                    {
                        var forecastRequestURL = new HttpRequestMessage(HttpMethod.Get, $"/data/2.5/forecast?lat={weatherResponse.coord.lat}&lon={weatherResponse.coord.lon}&appid={Api_key}");
                        var forecastResponse = client.SendAsync(forecastRequestURL);
                        var forecastResponseStream = await forecastResponse.Result.Content.ReadAsStreamAsync();
                        Console.WriteLine(forecastResponseStream.ToString());
                        var forecastAPIResponse = JsonSerializer.Deserialize<ForecastResponse>(forecastResponseStream);
                        if (forecastAPIResponse != null)
                        {
                            string format = "yyyy-MM-dd HH:mm:ss";
                            var localNow = DateTime.Now;
                            var hour5Forecast = forecastAPIResponse.list.Where(x => DateTime.ParseExact(x.dt_txt,format,null) > localNow.AddHours(1)).ToList().Take(5);
                            var day5Forecast = forecastAPIResponse.list.Where(x => x.dt_txt.EndsWith("00:00:00")).ToList().Take(5);
                            //var abcd = hour5Forecast?.ForEach((x) => {
                            //    return new HourlyForecast() { LocalTime : x.dt_text.ToString("hh: mm: tt") }; 
                            //    });
                            var _5hourForecastList = hour5Forecast.Select((x) =>

                                new HourlyForecast()
                                {
                                    LocalDate = DateTime.ParseExact(x.dt_txt, format, null).ToString("dddd, dd MMM yyyy"),
                                    LocalTime = DateTime.ParseExact(x.dt_txt, format, null).ToString("hh:mm:tt"),
                                    Icon = x.weather[0].icon,
                                    Temp = tempType == "C" ? (x.main.temp - 273.15) : ((x.main.temp - 273.15) * 9 / 5 + 32),
                                    message = x.weather[0].main,
                                }
                             ).ToList();
                            var _5DayForecastList = day5Forecast.Select((x) =>

                                new HourlyForecast()
                                {
                                    LocalDate = DateTime.ParseExact(x.dt_txt, format, null).ToString("ddd"),
                                    LocalTime = DateTime.ParseExact(x.dt_txt, format, null).ToString("hh:mm:tt"),
                                    Icon = x.weather[0].icon,
                                    Temp = tempType == "C" ? (x.main.temp - 273.15) : ((x.main.temp - 273.15) * 9 / 5 + 32),
                                    message = x.weather[0].main,
                                }
                            ).ToList();
                            formatedWeatherAPIData.HourlyForecast = _5hourForecastList;
                            formatedWeatherAPIData.DailyForecast = _5DayForecastList;
                        }
                    }
                    //weatherResponse.sys.SunriseDateTime = DateTimeOffset.FromUnixTimeSeconds(weatherResponse.sys.sunrise).UtcDateTime;
                    //weatherResponse.sys.SunsetDateTime = DateTimeOffset.FromUnixTimeSeconds(weatherResponse.sys.sunset).UtcDateTime;


                    //weatherResponse.sys.SunriseDateTime = weatherResponse.sys.SunriseDateTime.AddSeconds(weatherResponse.timezone);
                    //weatherResponse.sys.SunsetDateTime = weatherResponse.sys.SunsetDateTime.AddSeconds(weatherResponse.timezone);

                    //weatherResponse.LocalTime = DateTime.Now.ToString("hh:mm tt");
                    //weatherResponse.LocalDate = DateTime.Now.ToString("dddd, dd MMM yyyy");
                    result.Data = formatedWeatherAPIData!;
                }
                else
                {
                    throw new Exception("Incorrect city name provided");
                }
        
                
                result.Code = ApiResponseCode.Success;
                return Ok(result);
            }
            catch (Exception ex)
            {
                result.Code = ApiResponseCode.Error;
                List<string> errors = new List<string>();
                errors.Add(ex.Message);
                result.Errors = errors;
                return BadRequest(result);
            }
            
        }

        [HttpGet]
        [Route("get/user/favourites")]
        public async Task<IActionResult> GetUserFavourites()
        {
            ResponseDto result = new ResponseDto();
            try
            {
                var userFavouriteList = await this.repository.GetFavourites();
                
                result.Data = userFavouriteList;
                result.Code = ApiResponseCode.Success;
                return Ok(result);
            }
            catch (Exception ex)
            {
                List<string> errors = new List<string>();
                errors.Add(ex.Message);
                result.Errors = errors;
                result.Code = ApiResponseCode.Error;
                return BadRequest(result);
            }
        }

        [HttpPost]
        [Route("post/user/favourite")]
        public async Task<IActionResult> PostUserFavourite(UserFavourites favouriteData)
        {
            ResponseDto result = new ResponseDto();
            try
            {
                favouriteData.UserId = ObjectId.GenerateNewId().ToString();
                var userFavouriteData = await this.repository.PostFavourite(favouriteData);
                result.Data = userFavouriteData;
                result.Code = ApiResponseCode.Success;
                return Ok(result);
            }
            catch (Exception ex)
            {
                List<string> errors = new List<string>();
                errors.Add(ex.Message);
                result.Errors = errors;
                result.Code = ApiResponseCode.Error;
                return BadRequest(result);
            }

        }

        [HttpPut]
        [Route("put/user/favourite")]
        public async Task<IActionResult> UpdateUserFavourite(string favouriteData, string name)
        {
            ResponseDto result = new ResponseDto();
            try
            {

                IMongoCollection<UserFavourites> FavouritesDataCollection = await this.repository.GetCollection();
                UserFavourites userFavourite = FavouritesDataCollection.Find(x => x.Username == name).FirstOrDefault();
                List<string> favouritesList = userFavourite.Favourites;
                favouritesList.Add(favouriteData);
                userFavourite.Favourites = favouritesList;
                FavouritesDataCollection.ReplaceOne(x=>x.Username == name, userFavourite);
                result.Data = userFavourite;
                result.Code = ApiResponseCode.Success;
                return Ok(result);
            }
            catch (Exception ex)
            {
                List<string> errors = new List<string>();
                errors.Add(ex.Message);
                result.Errors = errors;
                result.Code = ApiResponseCode.Error;
                return BadRequest(result);
            }

        }

        [HttpDelete]
        [Route("delete/user/favourite")]
        public async Task<IActionResult> DeleteUserFavourite(string favouriteData, string name)
        {
            ResponseDto result = new ResponseDto();
            try
            {
                IMongoCollection<UserFavourites> FavouritesDataCollection = await this.repository.GetCollection();
                UserFavourites userFavourite = FavouritesDataCollection.Find(x => x.Username == name).FirstOrDefault();
                List<string> favouritesList = userFavourite.Favourites;
                favouritesList.Remove(favouriteData);
                userFavourite.Favourites = favouritesList;
                FavouritesDataCollection.ReplaceOne(x => x.Username == name, userFavourite);
                result.Data = userFavourite;
                result.Code = ApiResponseCode.Success;
                return Ok(result);
            }
            catch (Exception ex)
            {
                List<string> errors = new List<string>();
                errors.Add(ex.Message);
                result.Errors = errors;
                result.Code = ApiResponseCode.Error;
                return BadRequest(result);
            }

        }
    }
}
