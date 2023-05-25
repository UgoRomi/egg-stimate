import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // get the room id from the url
  const urlParts = request.nextUrl.pathname.split('/');
  const roomId = parseInt(urlParts[2]);
  // Check if the room exists
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select()
    .eq('id', roomId);
  if (error || !rooms || rooms.length === 0) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.endsWith('/signup')) return;

  // if there is no user cookie redirect to signup
  const userCookie = request.cookies.get('user')?.value;
  if (!userCookie) {
    return NextResponse.redirect(
      new URL(`/rooms/${roomId}/signup`, request.url)
    );
  }

  // otherwise check if the user's ID is already in the room
  const { data: roomUsers, error: roomUsersError } = await supabase
    .from('users')
    .select()
    .eq('room', roomId);
  if (roomUsersError) {
    return NextResponse.redirect(
      new URL(`/rooms/${roomId}/signup`, request.url)
    );
  }
  const parsedUserCookie = JSON.parse(userCookie);
  const user = roomUsers?.find((u) => u.id === parsedUserCookie.id);
  if (!user) {
    const { data, error } = await supabase
      .from('users')
      .insert({ name: parsedUserCookie.name, room: roomId })
      .select();
    if (error || !data) {
      return NextResponse.redirect(
        new URL(`/rooms/${roomId}/signup`, request.url)
      );
    }
    const response = NextResponse.next()
    response.cookies.set('user', JSON.stringify(data[0]));
    return response
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/rooms/:path*',
};
