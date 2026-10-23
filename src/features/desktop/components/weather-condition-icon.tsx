import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from 'lucide-react';

type WeatherConditionIconProps = { code: number; isDay: boolean };

/** The condition glyph for a WMO weather code: a yellow sun, white clouds and moon. */
export function WeatherConditionIcon({ code, isDay }: WeatherConditionIconProps) {
  const cloud = 'fill-white text-white';
  if (code === 0) {
    return isDay ? (
      <Sun size={15} className='fill-[oklch(0.86_0.17_90)] text-[oklch(0.86_0.17_90)]' />
    ) : (
      <Moon size={15} className={cloud} />
    );
  }
  if (code <= 3) return isDay ? <CloudSun size={15} className={cloud} /> : <CloudMoon size={15} className={cloud} />;
  if (code <= 48) return <CloudFog size={15} className={cloud} />;
  if (code >= 95) return <CloudLightning size={15} className={cloud} />;
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return <CloudSnow size={15} className={cloud} />;
  if (code >= 51) return <CloudRain size={15} className={cloud} />;
  return <Cloud size={15} className={cloud} />;
}
