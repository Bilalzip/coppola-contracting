import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  session: Session | null
  user: User | null
  loading: boolean
  signOutReason: 'expired' | 'inactivity' | null
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

// Auto sign-out after this long with no mouse/keyboard/touch activity —
// protects an unlocked admin panel on a shared/showroom computer.
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [signOutReason, setSignOutReason] = useState<'expired' | 'inactivity' | null>(null)
  const wasSignedIn = useRef(false)
  const signingOutForInactivity = useRef(false)
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      wasSignedIn.current = !!session
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Only flag a reason when a previously-active session disappears on
      // its own — not on a deliberate sign-out via the Sign Out button,
      // which clears wasSignedIn synchronously in signOut() below.
      if (!session && wasSignedIn.current) {
        setSignOutReason(signingOutForInactivity.current ? 'inactivity' : 'expired')
      }
      signingOutForInactivity.current = false
      setSession(session)
      setUser(session?.user ?? null)
      wasSignedIn.current = !!session
    })

    return () => subscription.unsubscribe()
  }, [])

  // Inactivity timeout: reset a timer on any user interaction while signed
  // in; sign out and flag it distinctly from an expired/revoked token.
  useEffect(() => {
    if (!session) {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
      return
    }

    const resetTimer = () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
      inactivityTimer.current = setTimeout(() => {
        signingOutForInactivity.current = true
        supabase.auth.signOut()
      }, INACTIVITY_TIMEOUT_MS)
    }

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
    events.forEach((event) => window.addEventListener(event, resetTimer))
    resetTimer()

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer))
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    }
  }, [session])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) setSignOutReason(null)
    return { error }
  }

  const signOut = async () => {
    wasSignedIn.current = false
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, user, loading, signOutReason, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
