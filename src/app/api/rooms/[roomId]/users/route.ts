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
  const userId = JSON.parse(request.cookies.get('user')?.value || '')?.id;
  if (userId) {
    await supabase.from('users').delete().eq('room', roomId).eq('id', userId);
  }
  const { data: remainingUsers } = await supabase
    .from('users')
    .select('*')
    .eq('room', roomId);
  // if there are 0 remaining users, delete the room
  if (remainingUsers && remainingUsers.length === 0) {
    supabase.from('rooms').delete().eq('id', roomId);
  }
}
