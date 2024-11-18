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
      className={`${isFullscreen ? " " : " "}`}
    >
      {showCommentForm && (
        <CommentForm video_id={video_id} isFullscreen={isFullscreen} />
      )}

      <div className=" pb-4 pt-4 flex justify-between align-bottom">
        <button className={VideoPostStyle.likeButton}>
          <FiThumbsUp />
        </button>
        <button
          className={VideoPostStyle.commentButton}
          onClick={toggleCommentForm}
        >
          <FiMessageSquare/>
        </button>
        <button className={VideoPostStyle.shareButton}>
          <FiShare />
        </button>
      </div>
    </div>
  )
}

export default Interactions
