"use client"

import { useEffect, useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { notificationService, type Notification } from "@/lib/notifications"
import { useAuth } from "@/lib/auth-context"

export function NotificationsDropdown() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (user?.email) {
      loadNotifications()
    }
  }, [user])

  const loadNotifications = () => {
    if (!user?.email) return

    const userNotifications = notificationService.getByUserId(user.email)
    setNotifications(
      userNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    )
    setUnreadCount(notificationService.getUnreadCount(user.email))
  }

  const handleMarkAsRead = (id: string) => {
    notificationService.markAsRead(id)
    loadNotifications()
  }

  const handleMarkAllAsRead = () => {
    if (user?.email) {
      notificationService.markAllAsRead(user.email)
      loadNotifications()
    }
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-pink-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="h-auto p-1 text-xs">
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">No notifications yet</div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start p-4 cursor-pointer ${!notification.read ? "bg-purple-50" : ""}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="font-semibold text-purple-900">{notification.title}</div>
                <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                <div className="text-xs text-gray-400 mt-2">
                  {new Date(notification.createdAt).toLocaleDateString()} at{" "}
                  {new Date(notification.createdAt).toLocaleTimeString()}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
