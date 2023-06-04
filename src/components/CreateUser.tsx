'use client';
import { createRoomUser } from '@/app/_actions';
import { SubmitButton } from './SubmitButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';

export function CreateUserForm({ roomId }: { roomId: string }) {
  const [name, setName] = useState('');

  return (
    <form
      className='flex gap-6 flex-col justify-center items-center'
      action={async (formData) => {
        formData.append('roomId', roomId);
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
        <label htmlFor='is_spectator' className='pr-3'>
          Entro come spettatore 👀
        </label>
        <Switch.Root
          name='is_spectator'
          className='bg-gray-200 w-[42px] h-[25px] bg-blackA9 rounded-full relative shadow-sm shadow-gray-300 focus:shadow-[0_0_0_2px] focus:shadow-orange-300 data-[state=checked]:shadow-orange-300 data-[state=checked]:bg-orange-500 outline-none cursor-default'
          id='is_spectator'
          style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
        >
          <Switch.Thumb className='block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-gray-300 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px] data-[state=checked]:shadow-orange-300' />
        </Switch.Root>
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
