'use client';
import { showHideVotes, vote } from '@/app/_actions';
import Image from 'next/image';
import { useTransition } from 'react';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import * as Avatar from '@radix-ui/react-avatar';
import { getRoomIdFromUrl, getUsernameFromCookie } from '@/lib/utils';
import { useStore } from '@/lib/zustand';

interface CardProps {
  value: number;
}

const Card: React.FC<CardProps> = ({ value }) => {
  let [, startTransition] = useTransition();
  const users = useStore((state) => state.users);
  const currentUser = useStore((state) => state.getCurrentUser());

  return (
    <div
      className='max-w-[93px] max-h-[146px] cursor-pointer'
      onClick={() => {
        startTransition(() => vote(value));
        // if every user has voted, toggle the votes
        if (
          Array.from(users.values()).every(
            (user) => user.current_vote !== null || user.id === currentUser?.id
          )
        ) {
          const roomId = getRoomIdFromUrl();
          if (!roomId) return;
          startTransition(() => showHideVotes(roomId, true));
        }
      }}
    >
      <AspectRatio.Root ratio={93 / 146}>
        <Image
          src={`/cards/${value}.svg`}
          alt={`Scrum poker card ${value}`}
          fill
        />
      </AspectRatio.Root>
    </div>
  );
};

export function Cards() {
  const username = getUsernameFromCookie();

  return (
    <div className='bg-white p-4 flex items-center flex-col'>
      <div className='w-full px-8 flex mb-7'>
        <Avatar.Root className='bg-black inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle ml-auto mr-2'>
          <Avatar.Fallback className='text-orange-500 leading-1 flex h-full w-full items-center justify-center bg-orange-100 text-sm font-medium'>
            {username?.at(0)?.toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
        <span className='mr-6 flex items-center'>{username}</span>
        <button
          type='button'
          className='rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-orange-500 shadow-sm ring-1 ring-inset ring-orange-500 hover:bg-gray-50'
        >
          Invite players
        </button>
      </div>
      <div className='grid grid-cols-[repeat(3,100px)] gap-7'>
        <p className='col-span-3'>Scegli la tua carta 👇🏻</p>
        <Card value={0} />
        <Card value={1} />
        <Card value={2} />
        <Card value={3} />
        <Card value={4} />
        <Card value={5} />
        <Card value={6} />
        <Card value={7} />
        <Card value={8} />
        <Card value={9} />
        <Card value={10} />
        <Card value={11} />
      </div>
    </div>
  );
}
