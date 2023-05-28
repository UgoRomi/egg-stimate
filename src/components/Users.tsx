'use client';

import { supabase } from '@/lib/supabase';
import { fetcher } from '@/lib/utils';
import { useEffect, useReducer, useState, useTransition } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { Table } from './Table';
import { User } from '@/lib/types';
import { resetVotes, showHideVotes } from '@/app/_actions';
import { useStore } from '@/lib/zustand';

let didInit = false;
let initialFetch = false;

export function Users({ roomId }: { roomId: string }) {
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
            setShowVotes(payload.new.show_votes);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(usersChannel);
        supabase.removeChannel(roomsChannel);
      };
    }
  }, [addUser, roomId, updateUser, setShowVotes]);

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
          onClick={() => startTransition(() => resetVotes(roomId))}
        >
          Resetta voti
        </button>
        <button
          disabled={showVotes}
          type='button'
          className='rounded-full bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={() => startTransition(() => showHideVotes(roomId, true))}
        >
          Mostra voti
        </button>
      </div>
      <Table />
    </div>
  );
}
