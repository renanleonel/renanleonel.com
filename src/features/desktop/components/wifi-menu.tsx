import { SystemMenu } from '@/features/desktop/components/system-menu';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { MENU_SWITCH } from '@/shared/domain/constants/liquid-glass';
import { Check, Wifi } from 'lucide-react';
import { useState } from 'react';

type WifiMenuProps = { openSettings: (section: SettingsSectionId) => void };
export function WifiMenu({ openSettings }: WifiMenuProps) {
  const [enabled, setEnabled] = useState(true);
  const [network, setNetwork] = useState('Studio Wi-Fi');
  const [showOtherNetworks, setShowOtherNetworks] = useState(false);
  return (
    <SystemMenu className='status-menu wifi-menu w-65! [--menu-width:260px]'>
      <div className='min-h-8 flex items-center justify-between px-2.5 pt-1 pb-1.5'>
        <strong className='text-[13px] font-semibold'>Wi-Fi</strong>
        <input
          className={MENU_SWITCH}
          type='checkbox'
          role='switch'
          aria-label='Wi-Fi'
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
      </div>
      <hr />
      <span className='block px-2.5 pt-1 pb-0.5 text-[12px] font-semibold text-(--label-secondary)'>
        Known Networks
      </span>
      {['Studio Wi-Fi', 'iPhone', 'Guest Network'].map((name, index) => (
        <button
          type='button'
          className='network-row'
          key={name}
          disabled={!enabled}
          onClick={() => setNetwork(name)}>
          <Wifi size={15} />
          <span>{name}</span>
          {network === name ? (
            <Check size={13} />
          ) : index === 0 ? null : (
            <span className='network-lock [&.network-lock]:justify-self-center [&.network-lock]:text-[oklch(0.5_0.01_250)] [&.network-lock]:text-[7px]'>
              ●
            </span>
          )}
        </button>
      ))}
      <hr />
      <button
        type='button'
        aria-expanded={showOtherNetworks}
        aria-controls='other-networks'
        onClick={() => setShowOtherNetworks((visible) => !visible)}>
        Other Networks… <span>{showOtherNetworks ? '⌄' : '›'}</span>
      </button>
      {showOtherNetworks ? (
        <div
          className='other-networks [&.other-networks]:m-[2px_0_4px] [&.other-networks]:p-1 [&.other-networks]:rounded-lg [&.other-networks]:[background:oklch(1_0_0/0.16)] [&.other-networks]:[box-shadow:inset_0_0_0_1px_oklch(1_0_0/0.24),inset_0_1px_3px_oklch(0.2_0.02_250/0.12)] [&.other-networks]:[backdrop-filter:blur(10px)_saturate(1.4)] [&.other-networks]:[-webkit-backdrop-filter:blur(10px)_saturate(1.4)] [&.other-networks]:animate-[other-networks-in_140ms_var(--ease-mac)_both] [&.other-networks_.network-row]:min-h-6.75'
          id='other-networks'
          role='region'
          aria-label='Other Networks'>
          {['Coffee Shop Guest', 'Library Public', 'Phone Hotspot'].map((name, index) => (
            <button
              type='button'
              className='network-row'
              key={name}
              disabled={!enabled}
              onClick={() => {
                setNetwork(name);
                setShowOtherNetworks(false);
              }}>
              <Wifi size={15} />
              <span>{name}</span>
              {network === name ? (
                <Check size={13} />
              ) : index === 1 ? null : (
                <span className='network-lock [&.network-lock]:justify-self-center [&.network-lock]:text-[oklch(0.5_0.01_250)] [&.network-lock]:text-[7px]'>
                  ●
                </span>
              )}
            </button>
          ))}
        </div>
      ) : null}
      <button type='button' onClick={() => openSettings(SettingsSectionId.WIFI)}>
        Wi-Fi Settings…
      </button>
    </SystemMenu>
  );
}
