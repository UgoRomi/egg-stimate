import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const urlParts = request.nextUrl.pathname.split('/');
  const roomId = urlParts[urlParts.length - 2];
  const users = await supabase.from('users').select('*').eq('room', roomId);
  return NextResponse.json({
    users: users.data || [],
  });
}

export async function DELETE(request: NextRequest) {
  const urlParts = request.nextUrl.pathname.split('/');
  const roomId = urlParts[urlParts.length - 2];
  const userToken = JSON.parse(request.cookies.get('user')?.value || '');
  const userId = userToken?.id;
  if (userId) {
    await supabase.from('users').delete().eq('room', roomId).eq('id', userId);
  }
}
