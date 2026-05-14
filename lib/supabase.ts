import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if env vars are available
export const supabase = 
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Export a safe wrapper function
export function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials not configured")
    return null
  }
  return supabase
}

// Safe logout function
export async function safeLogout() {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized")
    }

    // Sign out from Supabase
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw error
    }

    // Clear all cookies related to auth
    if (typeof window !== "undefined") {
      // Clear Supabase auth tokens
      document.cookie = "sb-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
      document.cookie = "sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
      
      // Clear any other auth cookies
      const cookies = document.cookie.split(";")
      cookies.forEach((cookie) => {
        const eqPos = cookie.indexOf("=")
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
        if (name.toLowerCase().includes("auth") || name.toLowerCase().includes("session")) {
          document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
        }
      })
    }

    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false, error }
  }
}
