'use client';

import { createRoomUser } from '@/app/_actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CreateUserForm({ roomId }: { roomId: string }) {
  const [name, setName] = useState('');
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  return (
    <form
      className='flex gap-6 flex-col justify-center items-center'
      action={async (formData) => {
        setIsPending(true);
        formData.append('roomId', roomId);
        const { error } = await createRoomUser(formData);
        setIsPending(false);
        if (error) {
          console.error(error);
        } else {
          router.push(`/rooms/${roomId}`);
        }
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
            className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-md sm:leading-6'
            placeholder='In generale sto bene'
          />
        </div>
      </div>
      <button
        type='submit'
        disabled={!name || isPending}
        className='rounded-full bg-orange-600 cursor-pointer px-5 py-3 text-md text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
      >
        Conferma
      </button>
    </form>
  );
}
