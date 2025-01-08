// frontend\components\comment\CommentsDisplay.tsx
import React, { useEffect } from "react"
import useCommentStore from "../../zustand/store/commentStore"
import CommentLoadingSkeleton from "../loading/CommentLoadingSkeleton" // Import the loading skeleton

interface CommentsDisplayProps {
  video_id: string
  isFullscreen: boolean // Add this prop to handle fullscreen state
}

// Define a consistent pattern of rotation angles
const rotationPattern = [0.25, -0.5, 0.25, -0.25, 0.25, -0.5]

const CommentsList: React.FC<CommentsDisplayProps> = ({
  video_id,
  isFullscreen,
}) => {
  const { commentsByVideoId } = useCommentStore()
  const videoComments = commentsByVideoId[video_id] || {
    comments: [],
    loading: false,
    error: null,
  }

  // Show loading skeleton instead of "Loading comments..."
  if (videoComments.loading) return <CommentLoadingSkeleton />

  if (videoComments.error)
    return <div>Error loading comments: {videoComments.error}</div>

  return (
    <div
      className={`mt-4 pt-4 custom-scrollbar overflow-y-hidden overflow-x-hidden`}
    >
      {videoComments.comments.map((comment, index) => (
        <div
          key={comment.id}
          className="relative mb-4 rounded-md bg-yellow-200 p-4 shadow-md"
          style={{
            transform: `rotate(${rotationPattern[index % rotationPattern.length]}deg)`,
            backgroundImage:
              "linear-gradient(to bottom, transparent 90%, #cccccc 90%)",
            backgroundSize: "100% 20px", // Adjust the size to get more lines
          }}
        >
          <strong className="relative block text-sm text-gray-800">
            {comment.user_id}
          </strong>{" "}
          <p className="relative text-sm text-gray-700">{comment.content}</p>{" "}
          <small className="relative text-xs text-gray-600">
            {new Date(comment.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  )
}

export default CommentsList
