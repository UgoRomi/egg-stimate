'use client'
import { createRoomUser } from '@/app/_actions';
import { SubmitButton } from './SubmitButton';
import { useState } from 'react';

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
      <SubmitButton isDisabled={!name} />
    </form>
  );
}
