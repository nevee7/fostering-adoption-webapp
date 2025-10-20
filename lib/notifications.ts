export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "success" | "info" | "warning"
  read: boolean
  createdAt: string
}

const NOTIFICATIONS_STORAGE_KEY = "shelter_notifications"

export const notificationService = {
  // Get all notifications for a user
  getByUserId: (userId: string): Notification[] => {
    if (typeof window === "undefined") return []
    const notifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    const allNotifications: Notification[] = notifications ? JSON.parse(notifications) : []
    return allNotifications.filter((n) => n.userId === userId)
  },

  // Get unread notifications count
  getUnreadCount: (userId: string): number => {
    return notificationService.getByUserId(userId).filter((n) => !n.read).length
  },

  // Create new notification
  create: (notification: Omit<Notification, "id" | "createdAt" | "read">): Notification => {
    if (typeof window === "undefined") return notification as Notification

    const notifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    const allNotifications: Notification[] = notifications ? JSON.parse(notifications) : []

    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date().toISOString(),
    }

    allNotifications.push(newNotification)
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(allNotifications))
    return newNotification
  },

  // Mark notification as read
  markAsRead: (id: string): void => {
    if (typeof window === "undefined") return

    const notifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    const allNotifications: Notification[] = notifications ? JSON.parse(notifications) : []

    const index = allNotifications.findIndex((n) => n.id === id)
    if (index !== -1) {
      allNotifications[index].read = true
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(allNotifications))
    }
  },

  // Mark all notifications as read for a user
  markAllAsRead: (userId: string): void => {
    if (typeof window === "undefined") return

    const notifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    const allNotifications: Notification[] = notifications ? JSON.parse(notifications) : []

    const updated = allNotifications.map((n) => (n.userId === userId ? { ...n, read: true } : n))

    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated))
  },

  // Delete notification
  delete: (id: string): void => {
    if (typeof window === "undefined") return

    const notifications = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    const allNotifications: Notification[] = notifications ? JSON.parse(notifications) : []

    const filtered = allNotifications.filter((n) => n.id !== id)
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(filtered))
  },
}
