import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bilbzehlimyqqtdkltdku.supabase.co'

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbGJ6ZWhsaW15cXRka2x0ZGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2ODk0NjcsImV4cCI6MjA5OTI2NTQ2N30.tWxSkeC3oCOk5pHuyZ5dJCfYiWsu3WNUD5fIAdLnwks'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)