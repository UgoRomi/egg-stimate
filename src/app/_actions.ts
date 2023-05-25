'use server';

import { DEFAULT_USER_NAME } from '@/lib/consts';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function createRoom(formData: FormData) {
  const name = (formData.get('name') as string) || 'Unobraslow';
  const { data, error } = await supabase
    .from('rooms')
    .insert({ name })
    .select();
  return { data, error };
}

export async function createRoomUser(formData: FormData) {
  const name = (formData.get('name') as string) || DEFAULT_USER_NAME;
  const roomId = formData.get('roomId') as string;

  const userCookie = cookies().get('user')?.value;
  if (userCookie) {
    const user = JSON.parse(userCookie);
    if (user.room === parseInt(roomId)) {
      if (user.name === name) return { data: [user] };
      const { data, error } = await supabase.from('users').update({ name }).eq('id', user.id).select();
      if (error) {
        throw new Error(error.message);
      }
      // @ts-ignore bug in NextJs types
      cookies().set('user', JSON.stringify(data[0]));
      return { data };
    }
  }


  const { data, error } = await supabase
    .from('users')
    .insert({ name, room: parseInt(roomId) })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // @ts-ignore bug in NextJs types
  cookies().set('user', JSON.stringify(data[0]));
  return { data };
}

export async function updateUserName(formData: FormData) {
  const name = (formData.get('name') as string) || DEFAULT_USER_NAME;
  const userId = formData.get('userId') as string;
  const { data, error } = await supabase
    .from('users')
    .update({ name })
    .eq('id', userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // @ts-ignore bug in NextJs types
  cookies().set('user', JSON.stringify(data[0]));
  return { data, error };
}

export async function vote(value: number) {
  const userCookie = cookies().get('user');
  if (!userCookie?.value) {
    throw new Error('User token missing');
  }
  const userId = JSON.parse(userCookie.value).id;

  const { error } = await supabase
    .from('users')
    .update({ current_vote: value })
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return;
}

export async function resetVotes(roomId: string) {
  await supabase.from('users').update({ current_vote: null }).eq('room', roomId);
}

export async function showHideVotes(roomId: string, show: boolean) {
  await supabase.from('rooms').update({ show_votes: show }).eq('id', roomId);
}
