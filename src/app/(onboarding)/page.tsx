'use client';

import CreateRoomForm from '@/components/CreateRoomForm';
import { useStore } from '@/lib/zustand';

export default function Home() {
  const setCurrentRoom = useStore((state) => state.setCurrentRoom);
  setCurrentRoom(undefined);
  return (
    <div className='px-6 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl flex flex-col gap-3'>
        <h1 className='text-3xl tracking-tight text-center'>
          Crea una room per il tuo team.
        </h1>
        <p className='text-xl text-center'>Come vuoi chiamarla?</p>
        <CreateRoomForm />
      </div>
    </div>
  );
}
