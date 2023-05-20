import { Cards } from '@/components/Cards';
import { Users } from '@/components/Users';

export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <>
      <div>Welcome to room {params.roomId}</div>
      <div className='grid md:grid-cols-2 h-full'>
        <Users roomId={params.roomId} key={`users-${params.roomId}`} />
        <Cards key={`cards-${params.roomId}`} />
      </div>
    </>
  );
}
