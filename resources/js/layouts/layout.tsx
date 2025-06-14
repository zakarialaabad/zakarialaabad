import React,{ReactNode} from "react"
import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/contexts/auth-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { NotificationsProvider } from "@/contexts/notifications-context"
import { NotificationToastsManager } from "@/components/notifications/notification-toasts-manager"
// إذا كنت تستخدم Google Fonts عبر npm أو CDN، يمكن استيراد الخط هنا
// أو عبر <link> في public/index.html
// مثال باستخدام className: "inter-font" بعد تعريفها في CSS
type LayoutProps = {
    children: ReactNode;
  };
function App({ children}:LayoutProps) {
  return (
    <div lang="fr" className="inter-font">
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <FavoritesProvider>
            <NotificationsProvider>
                    <NotificationToastsManager />

              {children}
            </NotificationsProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
