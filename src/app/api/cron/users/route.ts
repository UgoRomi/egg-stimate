import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  // get yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const users = await supabase
    .from('users')
    .delete()
    .lt('created_at', yesterday.toISOString())
    .order('created_at', { ascending: false });
  return NextResponse.json({ count: users.count, users: users.data });
}
