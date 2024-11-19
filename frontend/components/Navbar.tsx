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
  const LeftButtonsStyling = twMerge(RectButtonVariant.violet, "w-4/5 sm:w-2/5")
  const RightButtonsStyling = twMerge(RectButtonVariant.white, " h-full w-full sm:w-auto text-xs sm:text-sm px-1 sm:justify-items-center sm:gap-1")


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

      <nav className=" w-screen pt-4 pb-4 grid grid-flow-col  grid-cols-3 justify-between  sticky top-0 z-50  h-16  items-center border-b-[1px] border-[#D97745] bg-[#FD9B63] [box-shadow:0_10px_0_0_#D97745]">
        {/* logo button  */}
        <div className="flex h-full w-full  pl-2 sm:pl-6 justify-start ">
          <Link href="" className={LeftButtonsStyling}>
            <Image
              src="/FULL_LOGO_COLOR.png"
              alt="Logo"
              width={100}
              height={100}
              className="flex px-1 sm:px-2"
            />
          </Link>
        </div>
        {/* center widgets (4) */}
        <div className="flex h-full w-full justify-between gap-1 sm:justify-center sm:gap-6 ">
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
        {/* username display + logout OR register + logout buttons */}
        <div className="flex h-full w-full pr-2 sm:pr-6 justify-end">

          {logged_in ? (
                <div className="flex h-full min-w-[80%] gap-2 justify-end sm:min-w-[40%]">
                  {/* 1 button */}
                    <div className={RightButtonsStyling}>
                      <Image
                        src={icon ? `/icons/${icon}.png` : "/icons/Cat.png"}
                        alt="Profile"
                        width= {30}
                        height={30}
                        className=" max-w-[6vw] sm:w-1/4"
                      />
                      <div className="hidden sm:flex truncate  ">{user_id}</div>

                    </div>
      

              {/* 2 button */}
                <button className={RightButtonsStyling}
                  onClick={handleLogout}
                  disabled={loading || isLogoutClicked}
                >
                  Logout
                </button>
            </div>
          ) : (
            <div className="flex h-full min-w-[80%] gap-2 justify-end sm:min-w-[40%]">
                <Link href="/login" className={RightButtonsStyling}>
                  Login
                </Link>

                <Link href="/register" className={RightButtonsStyling}>
                  Register
                </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
