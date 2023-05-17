'use client';

import { Cards } from '@/components/Cards';
import { UpdateUserNameModal } from '@/components/UpdateUserNameModal';
import { Users } from '@/components/Users';
import { DEFAULT_USER_NAME } from '@/lib/consts';
import { User } from '@/lib/types';
import { fetcher } from '@/lib/utils';
import { useState } from 'react';
import useSWR from 'swr';

export default function Page({ params }: { params: { roomId: number } }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data } = useSWR<User, string>(
    `/api/rooms/${params.roomId}`,
    fetcher,
    {
      onSuccess(data) {
        if (data?.name === DEFAULT_USER_NAME && !modalIsOpen)
          setModalIsOpen(true);
      },
    }
  );

  return (
    <>
      {modalIsOpen && data?.id && (
        <UpdateUserNameModal
          open={modalIsOpen}
          setOpen={setModalIsOpen}
          userId={data.id.toString()}
        />
      )}
      <div>Welcome to room {params.roomId}</div>
      <div className='grid md:grid-cols-2 h-full'>
        <Users roomId={params.roomId} key={`users-${params.roomId}`} />
        <Cards key={`cards-${params.roomId}`} />
      </div>
    </>
  );
}
