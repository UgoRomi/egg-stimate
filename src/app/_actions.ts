'use server';

import { DEFAULT_USER_NAME } from '@/lib/consts';
import { supabase } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { User } from '@/lib/types';

export async function createRoom(formData: FormData) {
  const name = (formData.get('name') as string) || 'Unobraslow';
  const { data, error } = await supabase
    .from('rooms')
    .insert({ name })
    .select();
  if (error) throw new Error(error.message);
  if (!data) throw new Error('No data returned');
  return redirect(`/rooms/${data[0].id}`);
}

export async function createRoomUser(formData: FormData) {
  const name = (formData.get('name') as string) || DEFAULT_USER_NAME;
  const roomId = formData.get('roomId') as string;
  const isSpectator = formData.get('is_spectator') === 'on';

  const userCookie = cookies().get('user')?.value;

  // If user already exists in this room, just update the name
  if (userCookie) {
    const user = JSON.parse(userCookie);
    if (user.room === parseInt(roomId)) {
      const { data, error } = await supabase
        .from('users')
        .update({ name })
        .eq('id', user.id)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      // @ts-ignore bug in NextJs types
      cookies().set('user', JSON.stringify(data[0]));
      return redirect(`/rooms/${roomId}`);
    }
  }

  const { data, error } = await supabase
    .from('users')
    .insert({ name, room: parseInt(roomId), is_spectator: isSpectator })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // @ts-ignore bug in NextJs types
  cookies().set('user', JSON.stringify(data[0]));
  return redirect(`/rooms/${roomId}`);
}

export async function updateUser(formData: FormData) {
  const userId = parseInt(formData.get('userId') as string);
  const name = formData.get('name') as string;
  const isSpectator = formData.get('is_spectator') === 'on';
  let userCookie = cookies().get('user')?.value;
  if (!userCookie) {
    console.warn('User cookie not found, fetching from DB');
    const { data: userFromDb } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      .single();
    if (!userFromDb) {
      throw new Error('User not found');
    }
    userCookie = JSON.stringify(userFromDb);
  }
  const currentUser = JSON.parse(userCookie) as User;

  // need to do this cause somehow updating the name to the same name causes the whole thing to be skipped
  // and is_spectator is not updated
  const updateObj: { name?: string; is_spectator?: boolean } = {};
  if (name !== currentUser.name) {
    updateObj.name = name;
  }
  if (isSpectator !== currentUser.is_spectator) {
    updateObj.is_spectator = isSpectator;
  }

  const { data, error } = await supabase
    .from('users')
    .update(updateObj)
    .eq('id', userId)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  // @ts-ignore bug in NextJs types
  cookies().set('user', JSON.stringify(data[0]));
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
  await supabase
    .from('users')
    .update({ current_vote: null })
    .eq('room', roomId);
  await supabase.from('rooms').update({ show_votes: false }).eq('id', roomId);
}

export async function showHideVotes(roomId: string, show: boolean) {
  await supabase.from('rooms').update({ show_votes: show }).eq('id', roomId);
}
