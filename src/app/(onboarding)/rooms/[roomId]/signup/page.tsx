import { CreateUserForm } from '@/components/CreateUser';

export default function Page({ params }: { params: { roomId: string } }) {
  return (
    <div className='px-6 py-10 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-2xl flex flex-col gap-3'>
        <h1 className='text-3xl tracking-tight text-center'>
          Ci siamo, è il tempo di stimare!
        </h1>
        <p className='text-xl text-center'>Mi dia le sue generalità</p>
        <CreateUserForm roomId={params.roomId} />
      </div>
    </div>
  );
}
