import { Bluetooth, Moon, Sun, SunMoon, Volume2, Wifi } from 'lucide-react';
import { useState } from 'react';
import { AirDropGlyph } from '@/features/desktop/components/airdrop-glyph';
import { ControlCenterSlider } from '@/features/desktop/components/control-center-slider';
import { ControlCenterToggle } from '@/features/desktop/components/control-center-toggle';
import { SystemMenu } from '@/features/desktop/components/system-menu';
import { GLASS_MODULE } from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';
type ControlCenterProps = {
  dark: boolean;
  setDark: (value: boolean) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  doNotDisturb: boolean;
  setDoNotDisturb: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
};
export function ControlCenter({
  dark,
  setDark,
  brightness,
  setBrightness,
  doNotDisturb,
  setDoNotDisturb,
  volume,
  setVolume,
}: ControlCenterProps) {
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(true);
  const [airDrop, setAirDrop] = useState(false);
  return (
    <SystemMenu
      anchored={false}
      className='control-center top-8.5! right-2.5! w-80! p-2.5! rounded-[28px]! contrast-more:[&.control-center]:[outline:1px_solid_var(--separator)] max-[600px]:right-1.5! max-[600px]:w-[min(320px,calc(100vw-12px))]!'
    >
      <div className='grid grid-cols-2 gap-2.5'>
        <div className={cn(GLASS_MODULE, 'row-span-2 flex flex-col justify-center gap-3 p-2.5')}>
          <ControlCenterToggle
            icon={<Wifi size={16} strokeWidth={2.25} />}
            title='Wi-Fi'
            status={wifi ? 'Home' : 'Off'}
            on={wifi}
            onToggle={() => setWifi(!wifi)}
          />
          <ControlCenterToggle
            icon={<Bluetooth size={16} strokeWidth={2.25} />}
            title='Bluetooth'
            status={bluetooth ? 'On' : 'Off'}
            on={bluetooth}
            onToggle={() => setBluetooth(!bluetooth)}
          />
          <ControlCenterToggle
            icon={<AirDropGlyph />}
            title='AirDrop'
            status={airDrop ? 'Everyone' : 'Contacts Only'}
            on={airDrop}
            onToggle={() => setAirDrop(!airDrop)}
          />
        </div>
        <ControlCenterToggle
          className={cn(GLASS_MODULE, 'p-2.5')}
          icon={<Moon size={16} strokeWidth={2.25} />}
          title='Focus'
          status={doNotDisturb ? 'Do Not Disturb' : 'Off'}
          on={doNotDisturb}
          onToggle={() => setDoNotDisturb(!doNotDisturb)}
        />
        <ControlCenterToggle
          className={cn(GLASS_MODULE, 'p-2.5')}
          icon={<SunMoon size={16} strokeWidth={2.25} />}
          title='Dark Mode'
          status={dark ? 'On' : 'Off'}
          on={dark}
          onToggle={() => setDark(!dark)}
        />
        <ControlCenterSlider
          icon={<Sun size={14} strokeWidth={2.25} />}
          label='Display'
          ariaLabel='Display brightness'
          min={10}
          value={brightness}
          onChange={setBrightness}
        />
        <ControlCenterSlider
          icon={<Volume2 size={14} strokeWidth={2.25} />}
          label='Sound'
          ariaLabel='Sound volume'
          min={0}
          value={volume}
          onChange={setVolume}
        />
      </div>
    </SystemMenu>
  );
}
