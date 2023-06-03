'use client';
import { createRoomUser } from '@/app/_actions';
import { SubmitButton } from './SubmitButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';
import { Switch } from '@headlessui/react';
import { cn } from '@/lib/utils';

export function CreateUserForm({ roomId }: { roomId: string }) {
  const [name, setName] = useState('');
  const [spectator, setSpectator] = useState(false);

  return (
    <form
      className='flex gap-6 flex-col justify-center items-center'
      action={async (formData) => {
        formData.append('roomId', roomId);
        formData.append('isSpectator', spectator.toString());
        await createRoomUser(formData);
      }}
    >
      <div className='max-w-xs min-w-[250px] h-'>
        <label htmlFor='name' className='sr-only'>
          Nome utente
        </label>
        <div className='mt-2'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            name='name'
            id='name'
            className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-md sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:cursor-not-allowed disabled:focus-visible:outline-offset-0 disabled:focus-visible:outline-orange-600 disabled:focus-visible:outline-2 disabled:focus-visible:outline'
            placeholder='In generale sto bene'
          />
        </div>
      </div>
      <div className='flex items-center'>
        <Switch.Group as='div' className='flex items-center'>
          <Switch
            checked={spectator}
            onChange={setSpectator}
            className={cn(
              spectator ? 'bg-orange-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2'
            )}
          >
            <span
              aria-hidden='true'
              className={cn(
                spectator ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
          <Switch.Label as='span' className='ml-3 text-sm'>
            <span className='font-medium text-gray-900'>
              Entro come spettatore 👀
            </span>
          </Switch.Label>
        </Switch.Group>
      </div>
      <div className='flex gap-4'>
        <button
          onClick={() => {
            // copy the current URL to the clipboard
            navigator.clipboard.writeText(
              window.location.href.endsWith('/signup')
                ? window.location.href.replace('/signup', '')
                : window.location.href
            );
            toast.success('Link copiato negli appunti');
          }}
          type='button'
          className='rounded-full flex justify-center items-center gap-2 bg-transparent px-4 py-2.5 text-sm font-semibold text-orange-500 shadow-sm ring-1 ring-inset ring-orange-500'
        >
          <Copy />
          Invita collegucci
        </button>
        <SubmitButton isDisabled={!name} text='Conferma' />
      </div>
    </form>
  );
}
