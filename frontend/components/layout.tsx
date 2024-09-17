// frontend\components\layout.tsx
import { ReactNode, useEffect, useState } from "react"
import Navbar from "./Navbar"

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // or a loading spinner, etc.

  return (
    <div className="flex h-screen min-w-min flex-col">
      <Navbar />
      {/* Ensure main content takes the remaining height and is scrollable */}
      <main className="no-scrollbar mt-2 flex-1 overflow-auto">{children}</main>
    </div>
  )
}

export default Layout
