import { createClient } from '@supabase/supabase-js'

const URL = 'https://izqxnlmiukziqwsxlqoi.supabase.co';
const API_KEY = 'sb_publishable_9VN1rUgPKwLl3i07ORKyEQ_7HuLlisN';
export const supabase = createClient(URL, API_KEY);

