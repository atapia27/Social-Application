// components/video/VideoPost/Interactions.tsx

import React from "react"
import { FiThumbsUp, FiMessageSquare, FiShare } from "react-icons/fi"
import CommentForm from "../../comment/CommentForm"
import { VideoPostStyle } from "../utils/VideoPostStyles"

interface InteractionsProps {
  video_id: string
  showCommentForm: boolean
  toggleCommentForm: () => void
  isFullscreen: boolean // Add this prop to handle fullscreen state
}

const Interactions: React.FC<InteractionsProps> = ({
  video_id,
  showCommentForm,
  toggleCommentForm,
  isFullscreen, // Add fullscreen state
}) => {
  return (
    <div
      className={`${isFullscreen ? "fixed bottom-0 left-0 right-0 p-4" : " max-w-[40vw]"}`}
    >
      {showCommentForm && (
        <CommentForm video_id={video_id} isFullscreen={isFullscreen} />
      )}

      <div className=" mb-4 mt-4 flex items-center justify-between pt-4">
        <button className={VideoPostStyle.likeButton}>
          <FiThumbsUp className="mr-2" />
          Like
        </button>
        <button
          className={VideoPostStyle.commentButton}
          onClick={toggleCommentForm}
        >
          <FiMessageSquare className="mr-2" />
          Comments
        </button>
        <button className={VideoPostStyle.shareButton}>
          <FiShare className="mr-2" />
          Share
        </button>
      </div>
    </div>
  )
}

export default Interactions
