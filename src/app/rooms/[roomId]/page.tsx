'use client';

import { UpdateUserNameModal } from '@/components/UpdateUserNameModal';
import { DEFAULT_USER_NAME } from '@/lib/consts';
import { Database } from '@/types/supabase';
import { useState, useEffect } from 'react';

export default function Page({ params }: { params: { roomId: number } }) {
  const [data, setData] =
    useState<Database['public']['Tables']['users']['Row']>();
  const [isLoading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/rooms/${params.roomId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if (data.name === DEFAULT_USER_NAME) setModalIsOpen(true);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.roomId]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  return (
    <>
      {modalIsOpen && data.id && (
        <UpdateUserNameModal
          open={modalIsOpen}
          setOpen={setModalIsOpen}
          userId={data.id.toString()}
        />
      )}
      <div>Welcome to room {params.roomId}</div>
    </>
  );
}
