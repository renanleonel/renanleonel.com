import { ArrowUp, Plus, Search } from 'lucide-react';
import type { FormEvent } from 'react';

import { MessageAvatar } from '@/features/messages/components/message-avatar';
import type { MessageContactId } from '@/features/messages/domain/enums/message-contact-id';
import type { MessageContact } from '@/features/messages/domain/models/message-contact';
import type { MessageConversation } from '@/features/messages/domain/models/message-conversation';
import {
  GLASS_SIDEBAR,
  GLASS_TOOLBAR_FIELD,
  GLASS_TOOLBAR_GROUP,
} from '@/shared/domain/constants/liquid-glass';
import { cn } from '@/shared/utils/cn';

type MessagesContentProps = {
  contacts: MessageContact[];
  conversation: MessageConversation;
  draft: string;
  query: string;
  selectedContact: MessageContact;
  sentMessages: string[];
  onDraftChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onSelectContact: (contactId: MessageContactId) => void;
  onSend: () => void;
};

export function MessagesContent({
  contacts,
  conversation,
  draft,
  query,
  selectedContact,
  sentMessages,
  onDraftChange,
  onQueryChange,
  onSelectContact,
  onSend,
}: MessagesContentProps) {
  const submitMessage = (event: FormEvent) => {
    event.preventDefault();
    onSend();
  };

  return (
    <div
      className={cn(
        'messages-app',
        'h-full min-h-0 flex text-(--label-primary) [background:var(--material-content)]',
        '[&_.bubble]:max-w-[70%] [&_.bubble]:m-[1px_0] [&_.bubble]:px-3 [&_.bubble]:py-[7px] [&_.bubble]:rounded-[18px] [&_.bubble]:text-[13px] [&_.bubble]:leading-[1.38] [&_.bubble]:[background:oklch(0.925_0.003_250)] [&_.bubble]:text-pretty',
        '[&_.bubble--sent]:self-end [&_.bubble--sent]:text-[white] [&_.bubble--sent]:[background:var(--system-blue)]',
        '[.desktop--dark_&_.bubble]:[background:oklch(0.3_0.006_250)] [.desktop--dark_&_.bubble--sent]:[background:var(--system-blue)]',
      )}
    >
      <aside
        className={cn(
          GLASS_SIDEBAR,
          'w-65 flex-[0_0_260px] min-h-0 flex flex-col px-2 pb-2',
          'max-[900px]:w-50 max-[900px]:basis-50 max-[600px]:hidden',
        )}
      >
        <div className='absolute inset-x-0 top-0 h-11 touch-none' data-window-drag-region />
        <label className='messages-search h-7 flex flex-none items-center gap-1.5 mx-1 mb-2 px-2.5 rounded-full text-[13px] text-(--label-secondary) [background:oklch(0.2_0.01_250/0.06)] focus-within:[box-shadow:0_0_0_3px_color-mix(in_oklch,var(--keyboard-focus)_40%,transparent)] [.desktop--dark_&]:[background:oklch(1_0_0/0.08)]'>
          <Search aria-hidden='true' size={14} strokeWidth={2} />
          <input
            aria-label='Search conversations'
            className='min-w-0 flex-1 border-0 bg-transparent text-(--label-primary) outline-none placeholder:text-(--label-tertiary) focus-visible:outline-none!'
            placeholder='Search'
            type='search'
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </label>
        <div className='messages-contact-list min-h-0 overflow-y-auto'>
          {contacts.length ? (
            contacts.map((contact) => (
              <button
                type='button'
                aria-pressed={contact.id === selectedContact.id}
                className={cn(
                  'w-full flex items-center gap-2.5 p-2 rounded-xl border-0 bg-transparent text-left',
                  'hover:[background:oklch(0.2_0.01_250/0.05)] [.desktop--dark_&]:hover:[background:oklch(1_0_0/0.06)]',
                  'aria-pressed:text-[white] aria-pressed:[background:var(--system-blue)] aria-pressed:hover:[background:var(--system-blue)]',
                )}
                key={contact.id}
                onClick={() => onSelectContact(contact.id)}
              >
                <MessageAvatar contact={contact} />
                <span className='min-w-0 flex flex-col'>
                  <strong className='text-[13px] font-semibold'>{contact.name}</strong>
                  <small className='truncate text-[12px] opacity-[0.7]'>{contact.preview}</small>
                </span>
              </button>
            ))
          ) : (
            <p className='px-3 py-4 text-center text-xs text-(--label-secondary)' role='status'>
              No conversations found
            </p>
          )}
        </div>
      </aside>
      <main className='min-w-0 min-h-0 flex-1 flex flex-col'>
        <header
          className='h-13 flex-[0_0_52px] flex items-center justify-center px-3 touch-none max-[600px]:pl-24 max-[600px]:justify-start'
          data-window-drag-region
        >
          <div
            className={cn('conversation-title', GLASS_TOOLBAR_GROUP, 'max-w-full gap-2 pl-1 pr-4')}
          >
            <MessageAvatar contact={selectedContact} small />
            <span className='min-w-0 flex flex-col items-start leading-[1.15]'>
              <strong className='max-w-full truncate text-[13px] font-semibold'>
                {selectedContact.name}
              </strong>
              <small className='max-w-full truncate text-[11px] text-(--label-secondary)'>
                {conversation.address}
              </small>
            </span>
          </div>
        </header>
        <div className='conversation min-h-0 flex-1 flex flex-col items-start overflow-auto px-5 pt-2 pb-5'>
          <time className='self-center mb-3 text-[11px] font-medium text-(--label-tertiary)'>
            {conversation.timestamp}
          </time>
          {conversation.incomingMessages.map((message) => (
            <p className='bubble bubble--incoming' key={message}>
              {message}
            </p>
          ))}
          {sentMessages.map((message, index) => (
            <p className='bubble bubble--sent' key={`${message}-${index}`}>
              {message}
            </p>
          ))}
        </div>
        <form className='flex flex-none items-center gap-2 px-3 pb-3' onSubmit={submitMessage}>
          <button
            type='button'
            aria-label='Add attachment'
            className={cn(GLASS_TOOLBAR_GROUP, 'w-9 justify-center p-0 text-(--label-secondary)')}
          >
            <Plus size={18} strokeWidth={2.2} />
          </button>
          <label className={cn(GLASS_TOOLBAR_FIELD, 'flex-1 pr-1')}>
            <input
              aria-label='Message'
              placeholder='iMessage'
              value={draft}
              onChange={(event) => onDraftChange(event.target.value)}
            />
            <button
              aria-label='Send message'
              className='size-7 flex-none grid place-items-center p-0 rounded-full border-0 text-[white] [background:var(--system-blue)] [transition:opacity_160ms_ease-out,scale_160ms_var(--ease-mac)] disabled:opacity-0 disabled:scale-75 disabled:cursor-default'
              disabled={!draft.trim()}
              type='submit'
            >
              <ArrowUp size={16} strokeWidth={2.6} />
            </button>
          </label>
        </form>
      </main>
    </div>
  );
}
