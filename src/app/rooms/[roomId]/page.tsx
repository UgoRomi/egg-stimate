'use client';

import { useState, useEffect } from 'react';

export default function Page({ params }: { params: { roomId: number } }) {
  const [data, setData] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/rooms/${params.roomId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.roomId]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;
  return <div>Welcome to room {params.roomId} </div>;
}
