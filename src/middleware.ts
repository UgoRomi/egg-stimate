import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.endsWith('/signup')) return;
  // get the room id from the url
  const urlParts = request.nextUrl.pathname.split('/');
  const roomId = parseInt(urlParts[2]);
  // Check if the room exists
  const { data: rooms, error } = await supabase
    .from('rooms')
    .select()
    .eq('id', roomId);
  if (!rooms || rooms.length === 0) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (urlParts.at(-1) !== 'signup' && !request.cookies.get('user')?.value) {
    return NextResponse.redirect(
      new URL(`/rooms/${roomId}/signup`, request.url)
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/rooms/:path*',
};
