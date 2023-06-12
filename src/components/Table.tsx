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
    <div className='flex flex-col justify-center items-center w-28 gap-3'>
      <div
        className={cn(
          'rounded-md h-24 w-16',
          vote !== null
            ? `bg-[url('/cards/${vote}.svg')]`
            : 'bg-white border-dashed border-orange-500 border'
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
      <div className='max-w-full py-1 px-2 bg-orange-500 rounded-md truncate'>
        <span className='text-sm text-white flex w-min'>{username}</span>
      </div>
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
      className={cn(`p-5 h-full w-full flex justify-center gap-12`, className)}
    >
      {children}
    </div>
  );
}

export function Table() {
  const raw_users = useStore((state) => state.users);
  const showVotes = useStore((state) => state.showVotes);
  const users = Array.from(raw_users.values()).filter(
    (user) => !user.is_spectator
  );
  const userLength = users.length;
  const room = useStore((state) => state.currentRoom);
  const leftUsers = users.splice(2, users.length >= 7 ? 2 : 1);
  const rightUsers = users.splice(2, users.length >= 6 ? 2 : 1);
  const middleIndex = Math.floor(users.length / 2);
  const topUsers = users.slice(0, middleIndex);
  const bottomUsers = users.slice(middleIndex);

  return (
    <div
      className={
        'grid grid-areas-table flex-grow grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto_1fr]'
      }
    >
      <div
        className={cn(
          'h-40 rounded-lg bg-orange-600 flex items-center justify-center grid-in-table mx-auto',
          userLength > 10
            ? 'w-[400px]'
            : userLength > 4
            ? 'w-[270px]'
            : 'w-[204px]'
        )}
      >
        <p className='text-white'>
          {!!room?.show_votes
            ? 'Carte scoperte 💫'
            : users.some((user) => user.current_vote !== null)
            ? 'Ci siamo quasi 🥁🥁🥁'
            : 'Tutti pronti?'}
        </p>
      </div>
      <CardContainer className='grid-in-top items-end'>
        {topUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
      <CardContainer className='grid-in-right justify-center flex-col'>
        {rightUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
      <CardContainer className='grid-in-bottom items-start'>
        {bottomUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
      <CardContainer className='grid-in-left justify-center flex-col items-end'>
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
