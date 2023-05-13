'use server';

import { supabase } from '@/lib/supabase';

export async function createRoom(formData: FormData) {
  const name = (formData.get('name') as string) || 'Unobraslow';
  const { data, error } = await supabase
    .from('rooms')
    .insert({ name })
    .select();
  return { data, error };
}
