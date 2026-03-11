import { createClient } from '@supabase/supabase-js';

// Menggunakan SERVICE_ROLE_KEY untuk bypass keamanan (HANYA BOLEH DI SERVER)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseKey);