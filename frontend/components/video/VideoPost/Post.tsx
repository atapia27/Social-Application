// components/video/VideoPost/Post.tsx

import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import {
  FiThumbsUp,
  FiMessageSquare,
  FiShare,
  FiMaximize,
  FiMinimize,
} from "react-icons/fi"
import CommentForm from "../../comment/CommentForm"
import useCommentStore from "../../../zustand/store/commentStore"
import useVideoStore from "../../../zustand/store/videoStore"
import { VideoPostStyle } from "../utils/VideoPostStyles"
import Controls from "./Controls"
import Header from "./Header"
import EditForm from "./EditForm"
import Interactions from "./Interactions"

interface VideoPostProps {
  video_id: string
  description: string
  video_url: string
  title: string
  user_id: string
  currentUserId: string | null
  leftPinColor: { base: string; inner: string; border: string }
  rightPinColor: { base: string; inner: string; border: string }
}

const VideoPost: React.FC<VideoPostProps> = ({
  video_id,
  description,
  video_url,
  title,
  user_id,
  currentUserId,
  leftPinColor,
  rightPinColor,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)
  const [volume, setVolume] = useState(0.8)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showVolume, setShowVolume] = useState(false)
  const [showSpeed, setShowSpeed] = useState(false)
  const [showCommentForm, setShowCommentForm] = useState(false)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<ReactPlayer>(null)

  const { fetchComments } = useCommentStore()
  const { editVideo } = useVideoStore()

  const handleEditClick = () => setIsEditing(!isEditing)
  const handleSaveClick = () => {
    editVideo({ video_id, title: newTitle, description: newDescription })
    setIsEditing(false)
  }

  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else if (playerContainerRef.current) {
      playerContainerRef.current.requestFullscreen()
    }
  }

  // Update the fullscreen status
  document.addEventListener("fullscreenchange", () => {
    setIsFullscreen(!!document.fullscreenElement)
  })

  const toggleCommentForm = () => {
    setShowCommentForm((prev) => !prev)
    if (!showCommentForm) fetchComments(video_id)
  }

  return (
    <div
      ref={playerContainerRef}
      className="relative mx-auto border-8 border-[#8B4513] bg-[#D2B48C]"
      style={{
        height: isFullscreen ? "100vh" : "100%",
        width: isFullscreen ? "100vw" : "45%",
        overflow: isFullscreen ? "none" : "none",
      }}
    >
      <Header
        user_id={user_id}
        currentUserId={currentUserId}
        handleEditClick={handleEditClick}
        leftPinColor={leftPinColor}
        rightPinColor={rightPinColor}
        isFullscreen={isFullscreen} // Pass the fullscreen state here
      />

      <div className="relative px-3">
        {isEditing ? (
          <EditForm
            title={newTitle}
            description={newDescription}
            setNewTitle={setNewTitle}
            setNewDescription={setNewDescription}
            handleSaveClick={handleSaveClick}
          />
        ) : (
          <>
            <div
              className={`relative ${isFullscreen ? "mx-auto aspect-video h-[50vh]" : "mx-auto aspect-video"}`}
            >
              <ReactPlayer
                ref={playerRef}
                url={video_url}
                width="100%"
                height="100%"
                volume={volume}
                playbackRate={playbackRate}
                controls={false}
              />
            </div>
            <Controls
              isFullscreen={isFullscreen}
              handleFullscreenToggle={handleFullscreenToggle}
              volume={volume}
              setVolume={setVolume}
              showVolume={showVolume}
              setShowVolume={setShowVolume}
              playbackRate={playbackRate}
              setPlaybackRate={setPlaybackRate}
              showSpeed={showSpeed}
              setShowSpeed={setShowSpeed}
              title={title}
            />

            <p className="mx-2 mt-2 border-b border-gray-500 text-xs font-medium text-gray-800">
              {description}
            </p>

            <Interactions
              video_id={video_id}
              showCommentForm={showCommentForm}
              toggleCommentForm={toggleCommentForm}
              isFullscreen={isFullscreen} // Pass the fullscreen state here
            />
          </>
        )}
      </div>
    </div>
  )
}

export default VideoPost
