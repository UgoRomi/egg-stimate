import CreateRoomForm from '@/components/CreateRoomForm';

export default function Home() {
  return (
    <div className='px-6 py-24 sm:px-6 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl flex flex-col gap-12'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-800 sm:text-4xl text-center'>
          Start your scrum poker now by creating a room.
        </h1>
        <CreateRoomForm />
      </div>
    </div>
  );
}
