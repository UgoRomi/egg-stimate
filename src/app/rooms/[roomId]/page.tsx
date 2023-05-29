'use client';

import { Cards } from '@/components/Cards';
import { Users } from '@/components/Users';
import { removeRoomFromCookie } from '@/lib/utils';
import { useEffect } from 'react';

export default function Page({ params }: { params: { roomId: string } }) {
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
