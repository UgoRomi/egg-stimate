import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // get the room id from the url
  const urlParts = request.nextUrl.pathname.split('/');
  const roomId = urlParts[1];
  // Check if the room exists
  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', roomId);
  if (!rooms || rooms.length === 0) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/room/:path*',
};
