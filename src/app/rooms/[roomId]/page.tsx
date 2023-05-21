import { Cards } from '@/components/Cards';
import { Users } from '@/components/Users';

export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <main className='flex-grow grid md:grid-cols-[8fr_7fr]'>
      <Users roomId={params.roomId} key={`users-${params.roomId}`} />
      <Cards key={`cards-${params.roomId}`} />
    </main>
  );
}
