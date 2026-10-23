import { Navigation } from 'lucide-react';

import { WeatherConditionIcon } from '@/features/desktop/components/weather-condition-icon';
import { WeatherSky } from '@/features/desktop/domain/enums/weather-sky';
import { weatherDescription } from '@/features/desktop/domain/selectors/weather-description';
import { weatherSky } from '@/features/desktop/domain/selectors/weather-sky';
import { useMaringaWeather } from '@/features/desktop/hooks/use-maringa-weather';
import { GLASS_WIDGET } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

/** Apple's Weather widget paints the sky behind the forecast. */
const SKY_BACKGROUND: Record<WeatherSky, string> = {
  [WeatherSky.CLEAR]: '[background:linear-gradient(180deg,oklch(0.55_0.15_252),oklch(0.72_0.11_236))]!',
  [WeatherSky.PARTLY_CLOUDY]:
    '[background:linear-gradient(180deg,oklch(0.56_0.11_248),oklch(0.73_0.07_238))]!',
  [WeatherSky.OVERCAST]: '[background:linear-gradient(180deg,oklch(0.5_0.03_248),oklch(0.66_0.025_240))]!',
  [WeatherSky.NIGHT]: '[background:linear-gradient(180deg,oklch(0.2_0.05_268),oklch(0.35_0.06_258))]!',
};

export function WeatherWidget() {
  const { weather, updatedAt } = useMaringaWeather();
  const conditions = weatherDescription(weather.code);
  return (
    <section
      className={cn(
        GLASS_WIDGET,
        SKY_BACKGROUND[weatherSky(weather)],
        'flex flex-col p-4 text-white! [text-shadow:0_1px_2px_oklch(0.2_0.05_250/0.18)]',
      )}
      aria-live='polite'
      aria-label={`Weather in Maringá, Paraná: ${Math.round(weather.temperature)} degrees, ${conditions}`}
      title={
        updatedAt
          ? `Updated ${updatedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`
          : undefined
      }
    >
      <span className='flex items-center gap-1 text-[13px] leading-4 font-semibold'>
        Maringá
        <Navigation size={9} className='fill-white' />
      </span>
      <span className='text-[42px] leading-12 font-light tracking-[-0.03em] tabular-nums'>
        {Math.round(weather.temperature)}°
      </span>
      <span className='mt-auto flex flex-col gap-0.5 text-[12px] leading-3.75 font-semibold'>
        <WeatherConditionIcon code={weather.code} isDay={weather.isDay} />
        <span className='truncate'>{conditions}</span>
        <span className='truncate font-medium opacity-90'>
          Feels like {Math.round(weather.apparentTemperature)}°
        </span>
      </span>
    </section>
  );
}
