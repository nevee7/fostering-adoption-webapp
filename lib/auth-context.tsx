"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth"
import { auth, isFirebaseConfigValid } from "./firebase"

interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, role?: "user" | "admin") => Promise<void>
  signOut: () => Promise<void>
  isConfigured: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const checkIsAdmin = (email: string | null): boolean => {
  if (!email) return false
  const admins = JSON.parse(localStorage.getItem("admins") || "[]")
  return admins.includes(email)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const isConfigured = isFirebaseConfigValid()

  useEffect(() => {
    if (!isConfigured || !auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      const adminStatus = checkIsAdmin(user?.email || null)
      setIsAdmin(adminStatus)
      setLoading(false)
    })

    return unsubscribe
  }, [isConfigured])

  const signIn = async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add environment variables.")
    }
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string, role: "user" | "admin" = "user") => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add environment variables.")
    }
    await createUserWithEmailAndPassword(auth, email, password)

    if (role === "admin") {
      const admins = JSON.parse(localStorage.getItem("admins") || "[]")
      if (!admins.includes(email)) {
        admins.push(email)
        localStorage.setItem("admins", JSON.stringify(admins))
      }
      setIsAdmin(true)
    }
  }

  const signOut = async () => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add environment variables.")
    }
    await firebaseSignOut(auth)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isConfigured, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
