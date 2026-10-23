import { MessageAvatarVariant } from '@/features/messages/domain/enums/message-avatar-variant';
import type { MessageContact } from '@/features/messages/domain/models/message-contact';
import { cn } from '@/shared/utils/cn';

type MessageAvatarProps = {
  contact: MessageContact;
  small?: boolean;
};

export function MessageAvatar({ contact, small = false }: MessageAvatarProps) {
  return (
    <span
      className={cn(
        'avatar grid flex-none place-items-center rounded-full font-semibold text-[white]',
        small ? 'size-8 text-[13px]' : 'size-10 text-[15px]',
        contact.avatarVariant === MessageAvatarVariant.BLUE
          ? '[background:linear-gradient(180deg,oklch(0.76_0.14_225),oklch(0.55_0.2_260))]'
          : '[background:linear-gradient(180deg,oklch(0.79_0.17_70),oklch(0.6_0.18_35))]',
      )}
    >
      {contact.avatar}
    </span>
  );
}
