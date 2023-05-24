import { Cards } from '@/components/Cards';
import { Users } from '@/components/Users';

export default function Page({ params }: { params: { roomId: string } }) {
  // TODO: Maybe?
  // useEffect(() => {
  //   const callback = (ev: BeforeUnloadEvent) => {
  //     fetch(`/api/rooms/${params.roomId}/users`, {
  //       method: 'DELETE',
  //     });
  //   };
  //   window.addEventListener('beforeunload', callback);
  //   return () => {
  //     window.removeEventListener('beforeunload', callback);
  //   };
  // }, [params.roomId]);
  return (
    <main className='flex-grow grid md:grid-cols-[7fr_6fr]'>
      <Users roomId={params.roomId} key={`users-${params.roomId}`} />
      <Cards key={`cards-${params.roomId}`} />
    </main>
  );
}
