import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  // get yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 16);

  const rooms = await supabase
    .from('rooms')
    .delete()
    .lt('created_at', yesterday.toISOString());
  return NextResponse.json({ count: rooms.count, rooms: rooms.data });
}
