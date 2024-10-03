import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hspmxytfbywljwkydlpi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcG14eXRmYnl3bGp3a3lkbHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNDY1MDcsImV4cCI6MjA0MjYyMjUwN30.ToyvVv5pnlJwwGVIdMzJnyFky6YRzICBzBz6pgzxl-s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
