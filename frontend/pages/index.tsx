// frontend/pages/index.tsx

import type { NextPage } from "next"
import VideoFeed from "../components/video/VideoFeed"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useAuthStore from "../zustand/store/authStore"
import SearchNotebook from "../components/widgets/SearchNotebook" // New Import
import Calculator from "../components/widgets/Calculator" // New Import

const Home: NextPage = () => {
  const { loggedIn } = useAuthStore()
  const router = useRouter()

  // Keep this instead of protected routes?
  useEffect(() => {
    if (!loggedIn) {
      router.push("/login")
    }
  }, [loggedIn, router])

  if (!loggedIn) {
    return <div>Loading...</div> // Or any other loading indicator
  }

  return (
    <div
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/style/Classroom.png')" }}
    >
      <main className="relative mx-auto max-w-7xl rounded-lg bg-transparent p-4">
        {/* SearchNotebook (Pinned on the left, does not affect VideoFeed) */}
        <div className="fixed mt-12 z-30">
          <SearchNotebook />
        </div>

        {/* VideoFeed (Centered on the page) */}
        <div className="flex justify-center z-10">
          <VideoFeed />
        </div>

        {/* Calculator (Pinned on the right, symmetrical to SearchNotebook) */}
        <div className="fixed mt-12 z-30">
          <Calculator />
        </div>
      </main>
    </div>
  )
}

export default Home
