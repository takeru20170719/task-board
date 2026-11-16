import { createClient } from '@supabase/supabase-js'

// .env から接続情報を読み込む(Viteでは VITE_ で始まる変数のみ参照可能)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
