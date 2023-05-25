'use client';

import { createRoom } from '@/app/_actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateRoomForm() {
  const [name, setName] = useState('');
  const router = useRouter();

  return (
    <form
      className='flex gap-6 flex-col justify-center items-center'
      action={async (formData) => {
        const { data, error } = await createRoom(formData);
        if (error || !data) {
          console.error(error);
          return;
        }
        router.push(`/rooms/${data[0].id}`);
      }}
    >
      <div className='max-w-xs min-w-[250px] h-'>
        <label htmlFor='name' className='sr-only'>
          Room Name
        </label>
        <div className='mt-2'>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            name='name'
            id='name'
            className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-md sm:leading-6'
            placeholder='Drip e Top Bella non valgono'
          />
        </div>
      </div>
      <button
        type='submit'
        disabled={!name}
        className='rounded-full bg-orange-600 cursor-pointer px-5 py-3 text-md text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Crea la room
      </button>
    </form>
  );
}
