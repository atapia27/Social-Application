// frontend/components/Navbar.tsx
import { FC, useEffect, useState } from "react"
import Link from "next/link"
import { FiHome, FiUsers, FiBell, FiMessageCircle } from "react-icons/fi"
import Image from "next/image"
import useAuthStore from "../zustand/store/authStore"
import LoadingModal from "./loading/LoadingModal"
import { twMerge } from "tailwind-merge"
import {
  SquareButtonVariant,
  RectButtonVariant,
  ButtonLogoText,
} from "./helpers/buttons"
import { useRouter } from "next/router"

const Navbar: FC = () => {
  const { user_id, icon, logged_in, logout, loading } = useAuthStore()
  const [mounted, setMounted] = useState(false)
  const [isLogoutClicked, setIsLogoutClicked] = useState(false) // Local state to prevent multiple clicks
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Reset the `isLogoutClicked` state after logout completes and user is logged out
    if (!logged_in && isLogoutClicked) {
      setIsLogoutClicked(false)
      router.push("/login") // Redirect to login page after successful logout
    }
  }, [logged_in, isLogoutClicked, router])

  const handleLogout = () => {
    if (!loading && !isLogoutClicked) {
      setIsLogoutClicked(true) // Prevent further logout clicks
      logout()
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* Loading Modal - show only when logging out */}
      {loading && isLogoutClicked && <LoadingModal message="Logging out..." />}

      <nav className="min-w-screen sticky top-0 z-50 grid h-16 grid-cols-3 items-center border-b-[1px] border-[#D97745] bg-[#FD9B63] px-4 [box-shadow:0_10px_0_0_#D97745]">
        {/* Left-aligned logo */}
        <div className="flex justify-start">
          <Link href="" className={RectButtonVariant.violet}>
            <Image
              src="/FULL_LOGO_COLOR.png"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className="min-w-32"
            />
          </Link>
        </div>
        {/* Center-aligned main widgets */}
        <div className="mb-3 flex justify-center space-x-6">
          <Link href="/" className={SquareButtonVariant.blue}>
            <div className={ButtonLogoText}>
              <FiHome />
            </div>
          </Link>

          <Link href="" className={SquareButtonVariant.green}>
            <span className={ButtonLogoText}>
              <FiUsers />
            </span>
          </Link>
          <Link href="" className={SquareButtonVariant.yellow}>
            <span className={ButtonLogoText}>
              <FiBell />
            </span>
          </Link>
          <Link href="" className={SquareButtonVariant.red}>
            <span className={ButtonLogoText}>
              <FiMessageCircle />
            </span>
          </Link>
        </div>
        {/* Right-aligned user profile or login/logout buttons */}
        <div className="flex items-center justify-end gap-3 pr-2 text-sm">
          {logged_in ? (
            <>
              <div className={RectButtonVariant.white}>
                <Link href="" className="flex items-center gap-3">
                  <Image
                    src={icon ? `/icons/${icon}.png` : "/defaultIcon.png"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="min-h-[80%]"
                  />
                  <span>{user_id}</span>
                </Link>
              </div>
                <button
                  onClick={handleLogout}
                  className={RectButtonVariant.white}
                  disabled={loading || isLogoutClicked}
                >
                  Logout
                </button>
            </>
          ) : (
            <>
              <Link href="/login" className={RectButtonVariant.white}>
                Login
              </Link>

              <Link href="/register" className={RectButtonVariant.white}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
