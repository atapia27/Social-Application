// frontend\components\loading\LoadingSkeleton.tsx
import React from "react"

const CommentLoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="relative mb-4 rounded-md bg-yellow-200 p-4 opacity-25 shadow-md">
        <div className="mb-2 h-4 w-1/3 rounded-md bg-gray-400"></div>{" "}
        {/* User ID Placeholder */}
        <div className="mb-2 h-3 w-full rounded-md bg-gray-400"></div>{" "}
        {/* Comment Content Placeholder */}
        <div className="h-3 w-2/3 rounded-md bg-gray-400"></div>{" "}
        {/* Timestamp Placeholder */}
      </div>
    </div>
  )
}

export default CommentLoadingSkeleton
