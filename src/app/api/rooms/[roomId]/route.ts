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
  const userCookie = cookies().get('user');
  let userData, userError;
  if (userCookie?.value) {
    const user = JSON.parse(userCookie.value);
    const { data: tempUserData, error: tempUserError } = await supabase
      .from('users')
      .upsert({ room: roomId, name: user.name, id: user.id })
      .select();
    userData = tempUserData?.[0];
    userError = tempUserError;
  } else {
    const { data: tempUserData, error: tempUserError } = await supabase
      .from('users')
      .insert({ room: roomId, name: DEFAULT_USER_NAME })
      .select();
    userData = tempUserData?.[0];
    userError = tempUserError;
  }
  if (userError)
    return NextResponse.json({ message: userError.message }, { status: 500 });
  if (!userData)
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  // @ts-ignore bug in NextJs types
  cookies().set('user', JSON.stringify(userData));
  return NextResponse.json({
    ...userData,
  });
}
