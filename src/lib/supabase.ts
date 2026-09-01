import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = 'https://ajadytxhlshccpuwxtci.supabase.co';
const supabaseAnonKey = 'sb_publishable_57yzoshk5CFnEWvMK9mlTQ_hSbLVLB';

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);