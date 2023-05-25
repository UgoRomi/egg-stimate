'use client'
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export function SubmitButton({ isDisabled }: { isDisabled?: boolean }) {
  const { pending } = useFormStatus();

  return <button
    type='submit'
    disabled={pending || isDisabled}
    className='rounded-full bg-orange-600 cursor-pointer px-5 py-3 text-md text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 disabled:opacity-50 disabled:cursor-not-allowed'
  >
    {pending ? 'Loading...' : 'Submit'}
  </button>
}
