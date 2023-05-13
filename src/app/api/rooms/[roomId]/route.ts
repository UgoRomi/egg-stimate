import { DEFAULT_USER_NAME } from '@/lib/consts';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const rawRoomId = request.nextUrl.pathname.split('/').pop();
  if (!rawRoomId) {
    return NextResponse.json({ status: 400, body: 'Bad request' });
  }

  // Check if the room exists
  const roomId = parseInt(rawRoomId, 10);
  const { data, error } = await supabase
    .from('rooms')
    .select()
    .eq('id', roomId)
    .single();
  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  // Create the user
  const userName =
    JSON.parse(cookies().get('user')?.value || '{}').name || DEFAULT_USER_NAME;
  const { data: userData, error: userError } = await supabase
    .from('users')
    .insert({ room: roomId, name: userName })
    .select();
  if (userError)
    return NextResponse.json({ message: userError.message }, { status: 500 });
  if (!userData)
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );

  const user = userData[0];
  // @ts-ignore bug in NextJs types
  cookies().set('user', JSON.stringify(user));
  return NextResponse.json({
    ...user,
  });
}
