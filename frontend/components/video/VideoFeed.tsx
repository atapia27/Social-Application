// frontend\components\video\VideoFeed.tsx
import VideoPost from "../video/VideoPost/Post"
// import VideoPost from "./VideoPost"; // Import VideoPost from the correct path
import CreateVideoForm from "./CreateVideoForm"
import { useEffect, useState, useMemo } from "react"
import useVideoStore from "../../zustand/store/videoStore"
import useAuthStore from "../../zustand/store/authStore" // Import useAuthStore
import { colorPalette } from "./utils/VideoFeedStyles"
import VideoFeedSkeleton from "../loading/VideoFeedSkeleton"

const VideoFeed: React.FC = () => {
  const { loading, videos, error, fetchAllVideos } = useVideoStore((state) => ({
    loading: state.loading,
    videos: state.videos,
    error: state.error,
    fetchAllVideos: state.fetchAllVideos,
  }))

  const { user_id: currentUserId } = useAuthStore() // Get the current user ID
  const [videoIndices, setVideoIndices] = useState<{ [key: string]: number }>(
    {},
  )
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    fetchAllVideos()
  }, [fetchAllVideos])

  useEffect(() => {
    setVideoIndices((prevIndices) => {
      const newIndices = { ...prevIndices }
      videos.forEach((video) => {
        if (!(video.id in newIndices)) {
          newIndices[video.id] = Object.keys(newIndices).length
        }
      })
      return newIndices
    })
  }, [videos])

  const memoizedColors = useMemo(() => {
    return videos.reduce(
      (acc, video) => {
        const videoIndex = videoIndices[video.id] % colorPalette.length
        acc[video.id] = {
          leftPinColor: colorPalette[videoIndex] || colorPalette[0], // Fallback to first color
          rightPinColor:
            colorPalette[(videoIndex + 1) % colorPalette.length] ||
            colorPalette[1], // Fallback to second color
        }
        return acc
      },
      {} as {
        [key: string]: {
          leftPinColor: (typeof colorPalette)[0]
          rightPinColor: (typeof colorPalette)[0]
        }
      },
    )
  }, [videoIndices, videos])

  if (loading) return <VideoFeedSkeleton />
  if (error) return <div>Error: {error}</div>

  const loadMoreVideos = () => setVisibleCount((prevCount) => prevCount + 3)

  return (
    <div className="container mx-auto">
      <CreateVideoForm />
      <div className="grid gap-8 xl:grid-cols-1">
        {videos.slice(0, visibleCount).map((video) => {
          const { leftPinColor, rightPinColor } = memoizedColors[video.id]
          return (
            <VideoPost
              key={video.id}
              video_id={video.id}
              title={video.title}
              description={video.description}
              video_url={video.video_url}
              user_id={video.user_id}
              leftPinColor={leftPinColor}
              rightPinColor={rightPinColor}
              currentUserId={currentUserId} // Pass currentUserId to VideoPost
            />
          )
        })}
      </div>
      {visibleCount < videos.length && (
        <div className="mt-8 flex justify-center">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            onClick={loadMoreVideos}
          >
            More
          </button>
        </div>
      )}
    </div>
  )
}

export default VideoFeed
