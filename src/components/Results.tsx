import { useStore } from '@/lib/zustand';
import { useMemo } from 'react';
import { Card } from './Card';

export function Results() {
  const users = useStore((state) => state.users);
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
    return Array.from(votes.entries()).sort(
      (a, b) => b[1].length - a[1].length
    );
  }, [users]);
  return (
    <div className='flex flex-col gap-5 w-full'>
      <span className='text-md'>Ecco cosa ha votato il team 👇</span>
      {votes.map(([value, peopleWhoVoted]) => {
        const percentage = Math.round(
          (peopleWhoVoted.length / users.size) * 100
        );

        return (
          <div key={value} className='flex items-center gap-8 w-full'>
            <Card value={value} />
            <span className='flex-grow'>
              <p className='text-xl font-bold'>{peopleWhoVoted.length} voti</p>
              <p className='text-sm text-gray-500 mb-2'>
                {peopleWhoVoted.map((name, index) => (
                  <span key={name}>
                    {name}
                    {index !== peopleWhoVoted.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <div className='w-full h-3 bg-orange-300 rounded-full'>
                <div
                  className={`h-full bg-orange-500 w-[${percentage}%] rounded-full`}
                ></div>
              </div>
            </span>
          </div>
        );
      })}
    </div>
  );
}
