/// <reference types="vite/client" />
// Supabase client configuration for use throughout the app

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

// PUBLIC_INTERFACE
export const supabase = createClient(supabaseUrl, supabaseKey);
