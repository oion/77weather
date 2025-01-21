import type { Weather } from '~/types/weather';

const OpenWeatherApiKey = useRuntimeConfig().public.openweathermapApiKey;

const TomorrowioApiKey = useRuntimeConfig().public.tomorrowioApiKey;

const enum WeatherProvider {
  OPENWEATHER = 'openweather',
  TOMORROWIO = 'tomorrowio',
}

const getWeather = async (city: string) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OpenWeatherApiKey}&units=metric`,
    );

    const weather = await response.json();

    return normalizeResponse(WeatherProvider.OPENWEATHER, weather);
  } catch {
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${TomorrowioApiKey}`,
    );
    const weather = await response.json();

    return normalizeResponse(WeatherProvider.TOMORROWIO, weather);
  }
};

const normalizeResponse = (provider: WeatherProvider, weather: Weather) => {
  let response = {};
  if (provider === WeatherProvider.OPENWEATHER) {
    response = { ...weather };
  } else if (provider === WeatherProvider.TOMORROWIO) {
    // TODO: map/tranform response from TOMORROWIO to application's {Weather} type
    // placeholder for now, using the same response as OPENWEATHER
    response = { ...weather };
  }
  return response;
};

export default defineEventHandler(async (event) => {
  const { city }: { city: string } = getQuery(event);

  return await getWeather(city);
});
