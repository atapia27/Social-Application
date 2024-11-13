// frontend\auth\ProtectedRoute.tsx
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import useAuthStore from "../zustand/store/authStore"

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user_id, logged_in, login } = useAuthStore()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!logged_in) {
      console.log("Not logged in, redirecting to login")
      router.push("/login")
    }
  }, [mounted, logged_in, router])

  if (!mounted || !logged_in) {
    return <div> Loading... </div> // Show a loading indicator while checking authentication
  }

  return <>{children}</>
}

export default ProtectedRoute
