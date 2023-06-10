import { useStore } from '@/lib/zustand';
import { useMemo, useRef, useState } from 'react';
import { Card } from './Card';
import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';

export function Results() {
  const users = useStore((state) => state.users);
  const ref = useRef<HTMLDivElement>(null);
  const setLottie = useStore((state) => state.setLottie);
  const votes = useMemo(() => {
    // show for each result how many times it was voted, ordered by most voted.
    // And keep track of who voted what
    const votes = new Map<number, string[]>();
    for (const user of users.values()) {
      if (user.current_vote === null) continue;
      if (votes.has(user.current_vote)) {
        votes.set(user.current_vote, [
          ...(votes.get(user.current_vote) || []),
          user.name,
        ]);
      } else {
        votes.set(user.current_vote, [user.name]);
      }
    }
    // sort the votes by most voted
    const newArray = Array.from(votes.entries()).sort(
      (a, b) => b[1].length - a[1].length
    );
    if (newArray.length === 1) {
      if (newArray[0][0] === 4) {
        // delfini
        setLottie(
          'https://assets7.lottiefiles.com/packages/lf20_ep5xgsuo.json'
        );
      } else {
        // default, confetti
        setLottie(
          'https://assets1.lottiefiles.com/packages/lf20_obhph3sh.json'
        );
      }
    }
    return newArray;
  }, [users, setLottie]);
  return (
    <div className='flex flex-col gap-5 w-full'>
      {votes.length === 1 ? (
        <>
          <Card size='large' value={votes[0][0]} className='self-center' />
          <span className='flex flex-col gap-1 items-center'>
            <span className='font-bold text-4xl capitalize block text-center'>
              TOP, BELLA!
            </span>
            <span className='text-center'>Siete tutti d’accordo 🏄🏻‍♀️</span>
          </span>
          <Image
            src={`/good-job.svg`}
            alt={`Good job badge`}
            width={144}
            height={144}
            className='absolute bottom-7 right-7'
          />
        </>
      ) : (
        <>
          <span className='text-md'>Ecco cosa ha votato il team 👇</span>
          <div
            ref={ref}
            className='flex flex-col gap-5 overflow-y-scroll'
            style={{
              maxHeight: `calc(100vh - ${
                ref.current?.offsetTop ?? 0
              }px - 16px)`,
            }}
          >
            {votes.map(([value, peopleWhoVoted]) => {
              const percentage = Math.round(
                (peopleWhoVoted.length / users.size) * 100
              );

              return (
                <div key={value} className='flex items-center gap-8 w-full'>
                  <Card value={value} />
                  <span className='flex-grow'>
                    <p className='text-xl font-bold'>
                      {peopleWhoVoted.length}{' '}
                      {peopleWhoVoted.length === 1 ? 'voto' : 'voti'}
                    </p>
                    <p className='text-sm text-gray-500 mb-2'>
                      {peopleWhoVoted.map((name, index) => (
                        <span key={name}>
                          {name}
                          {index !== peopleWhoVoted.length - 1 && ', '}
                        </span>
                      ))}
                    </p>
                    <div className='w-full h-3 bg-orange-100 rounded-full'>
                      <div
                        className={`h-full bg-orange-500 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
