import { cn } from '@/lib/utils';
import { useStore } from '@/lib/zustand';

const cards = {
  0: 'bg-[url("/cards/0.svg")]',
  1: 'bg-[url("/cards/1.svg")]',
  2: 'bg-[url("/cards/2.svg")]',
  3: 'bg-[url("/cards/3.svg")]',
  4: 'bg-[url("/cards/4.svg")]',
  5: 'bg-[url("/cards/5.svg")]',
  6: 'bg-[url("/cards/6.svg")]',
  7: 'bg-[url("/cards/7.svg")]',
  8: 'bg-[url("/cards/8.svg")]',
  9: 'bg-[url("/cards/9.svg")]',
  10: 'bg-[url("/cards/10.svg")]',
  11: 'bg-[url("/cards/11.svg")]',
};

interface CardProps {
  username: string;
  vote: keyof typeof cards | null;
  showVote: boolean;
}

function Card({ username, vote, showVote }: CardProps) {
  return (
    <div className='flex flex-col justify-center items-center w-20 gap-3'>
      <div
        className={cn(
          'rounded-md h-24 w-16 relative [transform-style:preserve-3d] duration-300',
          vote !== null
            ? ``
            : 'bg-white border-dashed border-orange-500 border',
          vote !== null && showVote ? '[transform:rotateY(180deg)]' : ''
        )}
      >
        {vote !== null && (
          <>
            <div
              className={cn(
                `absolute top-0 left-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-contain bg-no-repeat`,
                vote ? cards[vote] : ''
              )}
            ></div>
            <div
              className={`absolute top-0 left-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(0deg)] bg-[url('/cards/back.svg')] bg-contain bg-no-repeat`}
            ></div>
          </>
        )}
      </div>
      <div className='max-w-full p-1 bg-orange-500 rounded-md truncate'>
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
    <div className={cn(`h-full w-full flex justify-center gap-12`, className)}>
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
      <CardContainer className='grid-in-top items-end pb-16'>
        {topUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote as CardProps['vote']}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
      <CardContainer className='grid-in-right justify-center flex-col pl-16'>
        {rightUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote as CardProps['vote']}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
      <CardContainer className='grid-in-bottom items-start pt-16'>
        {bottomUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote as CardProps['vote']}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
      <CardContainer className='grid-in-left justify-center flex-col items-end pr-16'>
        {leftUsers.map((user) => (
          <Card
            key={user.id}
            username={user.name}
            vote={user.current_vote as CardProps['vote']}
            showVote={showVotes}
          />
        ))}
      </CardContainer>
    </div>
  );
}
