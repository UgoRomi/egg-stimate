import { cn } from '@/lib/utils';
import Image from 'next/image';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { useStore } from '@/lib/zustand';

function Card({
  username,
  vote,
  showVote,
}: {
  username: string;
  vote: number | null;
  showVote: boolean;
}) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div
        className={cn(
          'border rounded-md h-24 w-16 border-dashed border-orange-500',
          vote !== null ? `bg-[url('/cards/${vote}.svg')]` : 'bg-white'
        )}
      >
        {vote !== null && (
          <AspectRatio.Root ratio={93 / 146}>
            <Image
              src={showVote ? `/cards/${vote}.svg` : '/cards/back.svg'}
              alt={`Scrum poker card ${vote}`}
              style={{ objectFit: 'contain' }}
              fill
            />
          </AspectRatio.Root>
        )}
      </div>
      <span className='text-sm text-gray-500'>{username}</span>
    </div>
  );
}

function CardContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`p-5 h-full w-full flex justify-around items-center ${className}`}
    >
      {children}
    </div>
  );
}

export function Table() {
  const raw_users = useStore((state) => state.users);
  const showVotes = useStore((state) => state.showVotes);
  const users = Array.from(raw_users.values());
  const leftUsers = users.splice(2, 1);
  const rightUsers = users.splice(3, 1);
  const middleIndex = Math.floor(users.length / 2);
  const topUsers = users.slice(0, middleIndex);
  const bottomUsers = users.slice(middleIndex);

  return (
    <div className='grid grid-areas-table grid-cols-3 grid-rows-[1fr_2fr_1fr]'>
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-72 h-48 rounded-lg bg-orange-600 flex items-center justify-center grid-in-table'>
          <p className='text-white'>Tutti pronti?</p>
        </div>
      </div>
      <CardContainer className='grid-in-top'>
        {topUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
      <CardContainer className='grid-in-right'>
        {rightUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
      <CardContainer className='grid-in-bottom'>
        {bottomUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
      <CardContainer className='grid-in-left'>
        {leftUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
    </div>
  );
}
