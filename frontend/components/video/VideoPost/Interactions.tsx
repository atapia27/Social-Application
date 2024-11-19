// components/video/VideoPost/Interactions.tsx

import React from "react"
import { FiThumbsUp, FiMessageSquare, FiShare } from "react-icons/fi"
import CommentSection from "../../comment/CommentSection"
import { VideoPostStyle } from "../utils/VideoPostStyles"

interface InteractionsProps {
  video_id: string
  showCommentSection: boolean
  toggleCommentSection: () => void
  isFullscreen: boolean // Add this prop to handle fullscreen state
}

const Interactions: React.FC<InteractionsProps> = ({
  video_id,
  showCommentSection,
  toggleCommentSection,
  isFullscreen, // Add fullscreen state
}) => {
  return (
    <div className="flex flex-col justify-between h-full overflow-y-auto custom-scrollbar px-4 py-2 mb-2">
            {showCommentSection && (
        <CommentSection video_id={video_id} isFullscreen={isFullscreen} />
      )}
    <div className="flex pt-2 px-2 sm:px-10 justify-between">



        <button className={VideoPostStyle.likeButton}>
          <FiThumbsUp />
        </button>

        <button
          className={VideoPostStyle.commentButton}
          onClick={toggleCommentSection}
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
