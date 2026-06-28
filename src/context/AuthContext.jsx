import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  createUser as apiCreateUser,
  fetchSession,
  fetchUsers as apiFetchUsers,
  loginMaster as apiLoginMaster,
  loginUser as apiLoginUser,
  logout as apiLogout,
} from '../utils/auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshSession = useCallback(async () => {
    try {
      const current = await fetchSession()
      setSession(current)
      return current
    } catch {
      setSession(null)
      return null
    }
  }, [])

  useEffect(() => {
    refreshSession().finally(() => setLoading(false))
  }, [refreshSession])

  const loginMaster = useCallback(async (userId, password) => {
    const result = await apiLoginMaster(userId, password)
    if (result.ok) setSession(result.session)
    return result
  }, [])

  const loginUser = useCallback(async (userId, password) => {
    const result = await apiLoginUser(userId, password)
    if (result.ok) setSession(result.session)
    return result
  }, [])

  const logout = useCallback(async () => {
    try {
      await apiLogout()
    } finally {
      setSession(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      session,
      loading,
      isMasterLoggedIn: session?.role === 'master',
      isUserLoggedIn: session?.role === 'user',
      loginMaster,
      loginUser,
      logout,
      refreshSession,
      fetchUsers: apiFetchUsers,
      createUser: apiCreateUser,
    }),
    [session, loading, loginMaster, loginUser, logout, refreshSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
