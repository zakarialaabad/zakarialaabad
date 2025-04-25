import { Link } from "@inertiajs/react"


export function Logo(){
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="relative h-6 w-auto">
        <img src="/logo-ejar.jpeg" alt="E-JAR Logo" width={90} height={24} className="object-contain"  />
      </div>
    </Link>
  )
}
