export interface WeatherModal {
    name: string,
    country: string,
    lattitude: number,
    longitude: number,
    localTime: string,
    localDate: string,
    sunriseDateTime: string,
    sunsetDateTime: string,
    description: string,
    temp: number,
    temp_min: number,
    temp_max: number,
    real_feel: number,
    speed: number,
    humidity: number,
    icon: string,
    hourlyForecast: HourlyForecast[]
    dailyForecast: HourlyForecast[]
}

export interface HourlyForecast {
    localTime: string,
    localDate: string,
    temp: number,
    icon: string,
    message: string,
}
export interface LocationsModal {
    userId: string,
    username: string,
    favourites: string[]
}