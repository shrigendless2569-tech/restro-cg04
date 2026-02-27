import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client (uses anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side admin client (uses service role key - never expose to browser)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  category: 'starters' | 'mains' | 'breads' | 'rice' | 'desserts' | 'beverages'
  image_url: string | null
  is_veg: boolean
  is_available: boolean
  created_at: string
}

export type Review = {
  id: string
  author_name: string
  rating: number
  comment: string
  created_at: string
}

export type Reservation = {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  special_requests: string | null
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
}
