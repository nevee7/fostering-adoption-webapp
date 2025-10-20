"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { PawPrint } from "lucide-react"

export function NavBar() {
  const { user, signOut, isAdmin } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <nav className="border-b bg-white cute-shadow border-purple-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent flex items-center gap-2"
        >
          <PawPrint className="h-6 w-6 text-purple-500" />
          PawsConnect
          <PawPrint className="h-5 w-5 text-violet-500" />
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-purple-600 font-medium">Welcome, {user.email}</span>
              <NotificationsDropdown />
              {isAdmin && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-purple-300 hover:bg-purple-50 bg-transparent"
                  >
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="rounded-full border-violet-300 hover:bg-violet-50 bg-transparent"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
