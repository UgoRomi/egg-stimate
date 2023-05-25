'use client';

import { supabase } from '@/lib/supabase';
import { fetcher } from '@/lib/utils';
import { useEffect, useReducer, useState, useTransition } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { Table } from './Table';
import { User } from '@/lib/types';
import { resetVotes, showHideVotes } from '@/app/_actions';

let didInit = false;
let initialFetch = false;

enum UserActionType {
  INSERT = 'INSERT',
  INSERT_MULTI = 'INSERT_MULTI',
  UPDATE = 'UPDATE',
}

interface AddUserAction {
  event: UserActionType.INSERT;
  payload: User;
}

interface AddMultipleUserAction {
  event: UserActionType.INSERT_MULTI;
  payload: User[];
}

interface UpdateUserAction {
  event: UserActionType.UPDATE;
  payload: User;
}

function usersReducer(
  state: Map<number, User>,
  action: AddUserAction | UpdateUserAction | AddMultipleUserAction
) {
  const newState = new Map(state);
  switch (action.event) {
    case UserActionType.INSERT:
      return newState.set(action.payload.id, action.payload);
    case UserActionType.UPDATE:
      return newState.set(action.payload.id, action.payload);
    case UserActionType.INSERT_MULTI:
      action.payload.forEach((user) => {
        newState.set(user.id, user);
      });
      return newState;
    default:
      return newState;
  }
}

export function Users({ roomId }: { roomId: string }) {
  const [users, dispatch] = useReducer(usersReducer, new Map<number, User>);
  const [showVotes, setShowVotes] = useState(false);
  const [, startTransition] = useTransition();

  useSWR(`/api/rooms/${roomId}/users`, fetcher, {
    onSuccess: (data) => {
      if (!initialFetch) {
        initialFetch = true;
        dispatch({ event: UserActionType.INSERT_MULTI, payload: data.users });
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
            dispatch({
              event: UserActionType.INSERT,
              payload: payload.new as User,
            });
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
            dispatch({
              event: UserActionType.UPDATE,
              payload: payload.new as User,
            });
          }
        )
        .subscribe();

      const roomsChannel = supabase.channel('rooms').on(
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
      ).subscribe();
      return () => {
        supabase.removeChannel(usersChannel);
        supabase.removeChannel(roomsChannel);
      };
    }
  }, [roomId]);

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
          type='button'
          className='rounded-full bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
          onClick={() => startTransition(() => showHideVotes(roomId, !showVotes))}
        >
          Toggle Cards
        </button>
      </div>
      <Table users={Array.from(users.values())} showVotes={showVotes} />
    </div>
  );
}
