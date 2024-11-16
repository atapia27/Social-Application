// frontend/pages/index.tsx

import type { NextPage } from "next"
import VideoFeed from "../components/video/VideoFeed"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useAuthStore from "../zustand/store/authStore"
import SearchNotebook from "../components/widgets/SearchNotebook"
import Calculator from "../components/widgets/Calculator"

const Home: NextPage = () => {
  const { logged_in, loading } = useAuthStore()
  const router = useRouter()

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!logged_in && !loading) {
      router.push("/login")
    }
  }, [logged_in, loading, router])

  // Don't show content when the user is NOT logged in and loading is NOT active
  if (!logged_in && !loading) {
    return null
  }

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/style/Classroom.png')" }}
    >
      <main className="relative mx-auto max-w-7xl rounded-lg bg-transparent p-4">
        {/* VideoFeed (Centered on the page) */}
        <div className="z-10 flex justify-center">
          <VideoFeed />
        </div>
      </main>
    </div>
  )
}

export default Home
