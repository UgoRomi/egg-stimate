import { createRoom } from '@/app/_actions';
import { SubmitButton } from './SubmitButton';

export default function CreateRoomForm() {
  return (
    <form
      className='flex gap-6 flex-col justify-center items-center'
      action={createRoom}
    >
      <div className='max-w-xs min-w-[250px] h-'>
        <label htmlFor='name' className='sr-only'>
          Room Name
        </label>
        <div className='mt-2'>
          <input
            type='text'
            name='name'
            id='name'
            className='block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-md sm:leading-6'
            placeholder='Drip e Top Bella non valgono'
          />
        </div>
      </div>
      <SubmitButton text='Crea la super room' />
    </form>
  );
}
