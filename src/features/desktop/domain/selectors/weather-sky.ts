import { WeatherSky } from '@/features/desktop/domain/enums/weather-sky';
import type { WeatherSnapshot } from '@/features/desktop/domain/models/weather-snapshot';

/** Fog, rain, snow, and storms (WMO code 45 and up) read as overcast day or night. */
export function weatherSky({ code, isDay }: WeatherSnapshot): WeatherSky {
  if (code >= 45) return WeatherSky.OVERCAST;
  if (!isDay) return WeatherSky.NIGHT;
  return code === 0 ? WeatherSky.CLEAR : WeatherSky.PARTLY_CLOUDY;
}
