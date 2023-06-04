'use client';

import { Cards } from '@/components/Cards';
import { Users } from '@/components/Users';
import { fetcher, removeRoomFromCookie } from '@/lib/utils';
import { useStore } from '@/lib/zustand';
import { useEffect } from 'react';
import useSWR from 'swr';

let initialFetch = false;

export default function Page({ params }: { params: { roomId: string } }) {
  const setCurrentRoom = useStore((state) => state.setCurrentRoom);
  useSWR(`/api/rooms/${params.roomId}`, fetcher, {
    onSuccess: (data) => {
      if (!initialFetch) {
        initialFetch = true;
        setCurrentRoom(data.room);
      }
    },
  });
  useEffect(() => {
    const callback = (ev: BeforeUnloadEvent) => {
      removeRoomFromCookie();
      fetch(`/api/rooms/${params.roomId}/users`, {
        method: 'DELETE',
      });
    };
    window.addEventListener('beforeunload', callback);
    return () => {
      window.removeEventListener('beforeunload', callback);
    };
  }, [params.roomId]);

  return (
    <main className='flex-grow grid md:grid-cols-[3fr_2fr]'>
      <Users roomId={params.roomId} key={`users-${params.roomId}`} />
      <Cards key={`cards-${params.roomId}`} />
    </main>
  );
}
