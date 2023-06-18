import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  //#region check if room exists
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
  //#endregion

  //#region check if cookie exists
  // if there is no user cookie redirect to signup
  const userCookie = request.cookies.get('user')?.value;
  if (!userCookie) {
    return NextResponse.redirect(
      new URL(`/rooms/${roomId}/signup`, request.url)
    );
  }
  //#endregion

  //#region upsert user
  // otherwise check if the user's ID is already in the room
  const parsedUserCookie = JSON.parse(userCookie);
  if (parsedUserCookie.room === roomId) return;
  // upsert the user
  const { data, error: upsertError } = await supabase
    .from('users')
    .upsert({ ...parsedUserCookie, room: roomId })
    .select();

  if (upsertError || !data) {
    return NextResponse.redirect(
      new URL(`/rooms/${roomId}/signup`, request.url)
    );
  }
  const response = NextResponse.next();
  response.cookies.set('user', JSON.stringify(data[0]));
  return response;
  //#endregion
}

export const config = {
  matcher: '/rooms/:path*',
};
