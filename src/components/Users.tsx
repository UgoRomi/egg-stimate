'use client';

import { supabase } from '@/lib/supabase';
import { User } from '@/lib/types';
import { fetcher } from '@/lib/utils';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

let didInit = false;

export function Users({ roomId }: { roomId: string }) {
  const [users, setUsers] = useState<User[]>([]);
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
    <div className='w-full h-full bg-black'>
      {users.map((user) => (
        <div key={user.id}>
          {user.name} voted {user.current_vote}
        </div>
      ))}
    </div>
  );
}
