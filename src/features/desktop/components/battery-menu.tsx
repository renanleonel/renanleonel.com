import { SystemMenu } from '@/features/desktop/components/system-menu';
import { SettingsSectionId } from '@/features/settings/domain/enums/settings-section-id';
import { MENU_SWITCH } from '@/shared/domain/constants/liquid-glass';
type BatteryMenuProps = {
  openSettings: (section: SettingsSectionId) => void;
  lowPower: boolean;
  setLowPower: (value: boolean) => void;
};
export function BatteryMenu({ openSettings, lowPower, setLowPower }: BatteryMenuProps) {
  return (
    <SystemMenu className='status-menu battery-menu w-65! [--menu-width:260px]'>
      <div className='flex flex-col gap-0.5 px-2.5 pt-1 pb-1.5'>
        <span className='flex items-baseline justify-between text-[13px]'>
          <strong className='font-semibold'>Battery</strong>
          <span className='text-(--label-secondary) tabular-nums'>84%</span>
        </span>
        <small className='text-[12px] text-(--label-secondary)'>Power Source: Power Adapter</small>
      </div>
      <hr />
      <label className='min-h-7 flex items-center justify-between gap-3 px-2.5 text-[13px]'>
        Low Power Mode
        <input
          className={MENU_SWITCH}
          type='checkbox'
          role='switch'
          checked={lowPower}
          onChange={() => setLowPower(!lowPower)}
        />
      </label>
      <hr />
      <div className='flex flex-col gap-0.5 px-2.5 py-1 text-[13px]'>
        <strong className='font-semibold'>Using Significant Energy</strong>
        <span className='text-(--label-secondary)'>No Apps Using Significant Energy</span>
      </div>
      <hr />
      <button type='button' onClick={() => openSettings(SettingsSectionId.BATTERY)}>
        Battery Settings…
      </button>
    </SystemMenu>
  );
}
