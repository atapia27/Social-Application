// frontend\components\loading\VideoFeedSkeleton.tsx
import React from "react"

const VideoFeedSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto animate-pulse">
      <div className="grid gap-8 xl:grid-cols-1">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="relative mx-auto mb-8 w-[55%] overflow-hidden border-8 border-[#8B4513] bg-[#D2B48C]"
          >
            {/* Top-left pin */}
            <div className="absolute left-0 top-0 h-4 w-4 rounded-full bg-[#8B4513]"></div>

            {/* Top-right pin */}
            <div className="absolute right-0 top-0 h-4 w-4 rounded-full bg-[#8B4513]"></div>

            <div className="px-4 py-2">
              <div className="mb-4 h-6 w-1/3 rounded-md bg-gray-400"></div>{" "}
              {/* User ID Placeholder */}
            </div>

            <div className="relative px-3">
              <div className="mb-4 h-64 rounded-md bg-gray-300"></div>{" "}
              {/* Video Placeholder */}
            </div>

            <div className="p-4">
              <div className="mb-4 h-6 w-1/2 rounded-md bg-gray-400"></div>{" "}
              {/* Title Placeholder */}
              <div className="mb-2 h-4 w-full rounded-md bg-gray-400"></div>{" "}
              {/* Description line 1 */}
              <div className="mb-2 h-4 w-5/6 rounded-md bg-gray-400"></div>{" "}
              {/* Description line 2 */}
              <div className="mb-2 h-4 w-4/6 rounded-md bg-gray-400"></div>{" "}
              {/* Description line 3 */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-500 pt-4 text-sm">
                <div className="h-4 w-16 rounded-md bg-gray-400"></div>{" "}
                {/* Like Button Placeholder */}
                <div className="h-4 w-20 rounded-md bg-gray-400"></div>{" "}
                {/* Comments Button Placeholder */}
                <div className="h-4 w-16 rounded-md bg-gray-400"></div>{" "}
                {/* Share Button Placeholder */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoFeedSkeleton
