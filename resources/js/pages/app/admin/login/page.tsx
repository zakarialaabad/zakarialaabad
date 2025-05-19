import type React from "react"

import { useState } from "react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { router } from "@inertiajs/react"
export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple demo authentication
    // In a real application, this would be a server request
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        // Store authentication state
        localStorage.setItem("adminAuthenticated", "true")
        router.visit("/admin/dashboard")
      } else {
        setError("Identifiants invalides. Veuillez réessayer.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo className="h-12 w-auto" />
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Administration E-JAR</CardTitle>
            <CardDescription className="text-center">
              Connectez-vous pour accéder au panneau d'administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nom d'utilisateur</Label>
                  <Input
                    id="username"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && <div className="text-sm text-red-500">{error}</div>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Connexion en cours...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      Se connecter
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-500">
              Utilisez les identifiants de démonstration:
              <div className="font-medium text-gray-700">admin / admin123</div>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
              <img src="/ejar-logo.png" alt="E-JAR Logo"  className="object-cover w-full h-full" />
            </div>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} E-JAR. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  )
}
