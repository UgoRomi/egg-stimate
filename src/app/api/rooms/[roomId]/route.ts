import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const urlParts = request.nextUrl.pathname.split('/');
  const roomId = urlParts.at(-1);
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', roomId)
    .maybeSingle();
  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }
  if (!data) {
    return new NextResponse('Room not found', { status: 404 });
  }
  return NextResponse.json({
    room: data,
  });
}
