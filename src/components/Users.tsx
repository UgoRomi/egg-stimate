'use client';

import { supabase } from '@/lib/supabase';
import { cn, fetcher } from '@/lib/utils';
import { useEffect, useTransition } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { Table } from './Table';
import { Room, User } from '@/lib/types';
import { resetVotes, showHideVotes } from '@/app/_actions';
import { useStore } from '@/lib/zustand';

let didInit = false;
let initialFetch = false;

export function Users({ roomId }: { roomId: string }) {
  const currentRoom = useStore((state) => state.currentRoom);
  const setCurrentRoom = useStore((state) => state.setCurrentRoom);
  const addUser = useStore((state) => state.addUser);
  const addUsers = useStore((state) => state.addUsers);
  const updateUser = useStore((state) => state.updateUser);
  const showVotes = useStore((state) => state.showVotes);
  const setShowVotes = useStore((state) => state.setShowVotes);
  const [, startTransition] = useTransition();

  useSWR(`/api/rooms/${roomId}/users`, fetcher, {
    onSuccess: (data) => {
      if (!initialFetch) {
        initialFetch = true;
        addUsers(data.users);
      }
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
            addUser(payload.new as User);
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
            updateUser(payload.new as User);
          }
        )
        .subscribe();

      const roomsChannel = supabase
        .channel('rooms')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'rooms',
          },
          (payload) => {
            if (payload.new.id.toString() !== roomId) return;
            setCurrentRoom(payload.new as Room);
            setShowVotes(payload.new.show_votes);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(usersChannel);
        supabase.removeChannel(roomsChannel);
      };
    }
  }, [addUser, roomId, updateUser, setShowVotes, setCurrentRoom]);

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex justify-between p-4'>
        <div className='flex justify-center items-center gap-1'>
          <Image src='/logo-no-text.svg' alt='Logo' width={52} height={62} />
          <span className='text-xl font-semibold'>{currentRoom?.name}</span>
        </div>
        <button
          type='button'
          className={cn(
            'rounded-full px-4 py-2.5 w-36 text-sm transition-all font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
            showVotes
              ? 'bg-white text-orange-500 border-2 border-orange-500 focus-visible:outline-white'
              : 'bg-orange-500 text-white border-2 border-orange-500 hover:border-orange-600 hover:bg-orange-600 focus-visible:outline-orange-500'
          )}
          onClick={() => {
            if (showVotes) {
              startTransition(() => resetVotes(roomId));
            } else {
              setShowVotes(true);
              startTransition(() => showHideVotes(roomId, true));
            }
          }}
        >
          {showVotes ? 'Vota ancora' : 'Scopri le carte'}
        </button>
      </div>
      <Table />
    </div>
  );
}
