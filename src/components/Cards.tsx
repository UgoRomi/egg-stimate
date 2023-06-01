'use client';
import { showHideVotes, vote } from '@/app/_actions';
import Image from 'next/image';
import { useTransition } from 'react';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import * as Avatar from '@radix-ui/react-avatar';
import { cn, getRoomIdFromUrl, getUserFromCookie } from '@/lib/utils';
import { useStore } from '@/lib/zustand';
import { Results } from './Results';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';

interface CardProps {
  value: number;
}

const Card: React.FC<CardProps> = ({ value }) => {
  let [, startTransition] = useTransition();
  const users = useStore((state) => state.users);
  const updateUser = useStore((state) => state.updateUser);
  const userCookie = getUserFromCookie();
  const currentUser = !userCookie ? undefined : users.get(userCookie.id);
  if (!currentUser) {
    return null;
  }
  const hasLowerFocus =
    currentUser?.current_vote !== undefined &&
    currentUser.current_vote !== null &&
    currentUser.current_vote !== value;
  const isCurrentVote = currentUser?.current_vote === value;

  return (
    <div className={cn('w-[120px] h-[189px] flex justify-center items-center')}>
      <div
        className={cn(
          'w-[93px] h-[146px] cursor-pointer transition-all',
          hasLowerFocus && 'opacity-50',
          isCurrentVote && 'w-[120px] h-[189px]'
        )}
        onClick={() => {
          startTransition(() => vote(value));
          updateUser({ ...currentUser, current_vote: value });
          // if every user has voted, toggle the votes
          if (
            Array.from(users.values()).every(
              (user) => user.current_vote !== null
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
            priority
            src={`/cards/${value}.svg`}
            alt={`Scrum poker card ${value}`}
            fill
          />
        </AspectRatio.Root>
      </div>
    </div>
  );
};

export function Cards() {
  const showVotes = useStore((state) => state.showVotes);
  const username = getUserFromCookie()?.name;

  return (
    <div className='bg-white p-4 flex items-center flex-col'>
      <div className='w-full flex mb-7'>
        <Avatar.Root className='bg-black inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle ml-auto mr-2'>
          <Avatar.Fallback className='text-orange-500 leading-1 flex h-full w-full items-center justify-center bg-orange-100 text-sm font-medium'>
            {username?.at(0)?.toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
        <span className='mr-6 flex items-center'>{username}</span>
        <button
          onClick={() => {
            // copy the current URL to the clipboard
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copiato negli appunti');
          }}
          type='button'
          className='rounded-full flex justify-center items-center gap-2 bg-white px-4 py-2.5 text-sm font-semibold text-orange-500 shadow-sm ring-1 ring-inset ring-orange-500'
        >
          <Copy />
          Invita il team
        </button>
      </div>
      <div className='px-16 w-full h-full flex justify-center items-center'>
        {showVotes ? (
          <Results />
        ) : (
          <div className='grid grid-cols-[repeat(3,100px)] gap-x-7 gap-y-2'>
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
        )}
      </div>
    </div>
  );
}
