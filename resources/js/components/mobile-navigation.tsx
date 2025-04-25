
import { Link } from "@inertiajs/react"
import { Heart, Bell, MessageCircle, User, Home } from "lucide-react"
import { useWindowSize, isMobileView } from "@/utils/responsive-utils"

export function MobileNavigation() {
  const { width } = useWindowSize()
  const isMobile = isMobileView(width)

  if (!isMobile) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t">
      <div className="grid h-full grid-cols-5">
        <Link href="/favorites" className="flex flex-col items-center justify-center">
          <Heart className="h-6 w-6 text-gray-500" />
          <span className="text-xs text-gray-500 mt-1">Favoris</span>
        </Link>

        <Link href="/notifications" className="flex flex-col items-center justify-center relative">
          <Bell className="h-6 w-6 text-gray-500" />
          <span className="absolute top-0 right-1/3 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
            2
          </span>
          <span className="text-xs text-gray-500 mt-1">Notifications</span>
        </Link>

        <Link href="/" className="flex flex-col items-center justify-center">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <Home className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs text-primary font-medium mt-1">E-JAR</span>
        </Link>

        <Link href="/messages" className="flex flex-col items-center justify-center relative">
          <MessageCircle className="h-6 w-6 text-gray-500" />
          <span className="absolute top-0 right-1/3 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
            4
          </span>
          <span className="text-xs text-gray-500 mt-1">Discussions</span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center justify-center">
          <User className="h-6 w-6 text-gray-500" />
          <span className="text-xs text-gray-500 mt-1">Mon profil</span>
        </Link>
      </div>
    </div>
  )
}
