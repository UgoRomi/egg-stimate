import { getUserFromCookie } from '@/lib/utils';
import * as Avatar from '@radix-ui/react-avatar';

export function UserProfile() {
  const currentUser = getUserFromCookie();
  if (!currentUser) return null;

  return (
    <div className='flex items-center ml-auto mr-4'>
      <Avatar.Root className='bg-black inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle ml-auto mr-2'>
        <Avatar.Fallback className='text-orange-500 leading-1 flex h-full w-full items-center justify-center bg-orange-100 text-sm font-medium'>
          {currentUser.name?.at(0)?.toUpperCase()}
        </Avatar.Fallback>
      </Avatar.Root>
      <span className='flex items-center'>{currentUser.name}</span>
    </div>
  );

  // return (
  //   <Popover.Root>
  //     <Popover.Trigger asChild>
  //       <button className='flex items-center ml-auto mr-4'>
  //         <Avatar.Root className='bg-black inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle ml-auto mr-2'>
  //           <Avatar.Fallback className='text-orange-500 leading-1 flex h-full w-full items-center justify-center bg-orange-100 text-sm font-medium'>
  //             {currentUser.name?.at(0)?.toUpperCase()}
  //           </Avatar.Fallback>
  //         </Avatar.Root>
  //         <span className='flex items-center'>
  //           {currentUser.name} <ChevronDown />
  //         </span>
  //       </button>
  //     </Popover.Trigger>
  //     <Popover.Portal>
  //       <Popover.Content
  //         className='rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade'
  //         sideOffset={5}
  //       >
  //         <form action={updateUser}>
  //           <div>
  //             <label
  //               htmlFor='email'
  //               className='block text-sm font-medium leading-6 text-gray-900'
  //             >
  //               Username
  //             </label>
  //             <div className='mt-2'>
  //               <input
  //                 type='email'
  //                 name='email'
  //                 id='email'
  //                 className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
  //                 placeholder='you@example.com'
  //               />
  //             </div>
  //           </div>
  //           <div
  //             className='flex items-center'
  //             style={{ display: 'flex', alignItems: 'center' }}
  //           >
  //             <label
  //               className='text-[15px] leading-none pr-[15px]'
  //               htmlFor='airplane-mode'
  //             >
  //               Spectating
  //             </label>
  //             <Switch.Root
  //               name='is_spectator'
  //               defaultChecked={!!currentUser.is_spectator}
  //               className='bg-orange-200 w-[42px] h-[25px] bg-blackA9 rounded-full relative shadow-sm shadow-orange-300 focus:shadow-[0_0_0_2px] focus:shadow-orange-300 data-[state=checked]:bg-orange-500 outline-none cursor-default'
  //               id='airplane-mode'
  //               style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
  //             >
  //               <Switch.Thumb className='block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-orange-300 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]' />
  //             </Switch.Root>
  //           </div>
  //         </form>
  //       </Popover.Content>
  //     </Popover.Portal>
  //   </Popover.Root>
  // );
}
