
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationItem } from "@/components/notifications/notification-item"
import { useNotifications } from "@/contexts/notifications-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [activeTab, setActiveTab] = useState<string>("all")

  // Fermer le panneau avec la touche Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const filteredNotifications = () => {
    if (activeTab === "unread") {
      return notifications.filter((notification) => !notification.read)
    }
    return notifications
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: 300, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 300, y: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-xl"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white">
                      {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={markAllAsRead}>
                      <CheckCircle className="mr-1 h-4 w-4" />
                      Tout marquer comme lu
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Fermer</span>
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all" className="flex-1" onValueChange={setActiveTab}>
                <div className="border-b">
                  <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                    <TabsTrigger
                      value="all"
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Toutes
                    </TabsTrigger>
                    <TabsTrigger
                      value="unread"
                      className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Non lues {unreadCount > 0 && `(${unreadCount})`}
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="flex-1 p-0 data-[state=active]:mt-0">
                  <ScrollArea className="h-[calc(100vh-8rem)]">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                      ))
                    ) : (
                      <div className="flex h-40 items-center justify-center">
                        <p className="text-sm text-gray-500">Aucune notification</p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="unread" className="flex-1 p-0 data-[state=active]:mt-0">
                  <ScrollArea className="h-[calc(100vh-8rem)]">
                    {filteredNotifications().length > 0 ? (
                      filteredNotifications().map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} onMarkAsRead={markAsRead} />
                      ))
                    ) : (
                      <div className="flex h-40 items-center justify-center">
                        <p className="text-sm text-gray-500">Aucune notification non lue</p>
                      </div>
                    )}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
