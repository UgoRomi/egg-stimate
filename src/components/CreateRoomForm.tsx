'use client';

import { createRoom } from '@/app/_actions';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default function CreateRoomForm() {
  const [name, setName] = useState('');
  const [pending, setPending] = useState(false);

  return (
    <form
      className='flex gap-6 flex-col'
      action={async (formData) => {
        setPending(true);
        const { data, error } = await createRoom(formData);
        setPending(false);
        if (error || !data) {
          console.error(error);
          return;
        }
        redirect(`/rooms/${data[0].id}`);
      }}
    >
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Room Name
        </label>
        <div className='mt-2'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            name='name'
            id='name'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6'
            placeholder='Unobraslow'
          />
        </div>
      </div>
      <button
        type='submit'
        disabled={!name || pending}
        className='rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
      >
        Create Room
      </button>
    </form>
  );
}
