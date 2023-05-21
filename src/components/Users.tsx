'use client';

import { supabase } from '@/lib/supabase';
import { User } from '@/lib/types';
import { fetcher } from '@/lib/utils';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';

let didInit = false;

export function Users({ roomId }: { roomId: string }) {
  const [users, setUsers] = useState<User[]>([]);
  const [showVotes, setShowVotes] = useState(false);
  useSWR(`/api/rooms/${roomId}/users`, fetcher, {
    onSuccess: (data) => {
      setUsers(data.users);
    },
  });

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // Subscribe to the user events
      const usersChannel = supabase
        .channel('users')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'users',
          },
          (payload) => {
            if (payload.new.room.toString() !== roomId) return;
            setUsers((prev) => [...prev, payload.new as User]);
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'users',
          },
          (payload) => {
            if (payload.new.room.toString() !== roomId) return;
            setUsers((prev) => {
              const index = prev.findIndex(
                (user) => user.id === payload.new.id
              );
              if (index === -1) return prev;
              const newUsers = [...prev];
              newUsers[index] = payload.new as User;
              return newUsers;
            });
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(usersChannel);
      };
    }
  }, [roomId]);

  // list all the users
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex justify-between p-4'>
        <Image
          src='/***REMOVED***.svg'
          alt='Logo ***REMOVED***'
          width={141}
          height={31}
        />
        <button
          type='button'
          className='rounded-full bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
          onClick={() => setShowVotes(!showVotes)}
        >
          Reveal Cards
        </button>
      </div>
      <div className='flex-grow flex justify-center items-center'>
        <div className='h-72 w-48 rounded-full bg-orange-600 flex items-center justify-center'>
          <p className='text-white'>Tutti pronti?</p>
        </div>
      </div>
      {/* {users.map((user) => (
        <div key={user.id}>
          {user.name} voted {showVotes ? user.current_vote : 'MISTEROOOO'}
        </div>
      ))} */}
    </div>
  );
}
