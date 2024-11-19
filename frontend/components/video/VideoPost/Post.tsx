// components/video/VideoPost/Post.tsx

import React, { useState, useRef } from "react"
import ReactPlayer from "react-player"
import useCommentStore from "../../../zustand/store/commentStore"
import useVideoStore from "../../../zustand/store/videoStore"
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
  current_user_id: string | null
  leftPinColor: { base: string; inner: string; border: string }
  rightPinColor: { base: string; inner: string; border: string }
}

const VideoPost: React.FC<VideoPostProps> = ({
  video_id,
  description,
  video_url,
  title,
  user_id,
  current_user_id,
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
  const [showCommentSection, setShowCommentSection] = useState(false)
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

  const toggleCommentSection = () => {
    setShowCommentSection((prev) => !prev)
    if (!showCommentSection) fetchComments(video_id)
  }

  return (
    <div
      ref={playerContainerRef}
      className={`flex  flex-col place-self-center border-8 border-[#8B4513] bg-[#D2B48C] ${
        isFullscreen ? "h-screen max-h-screen" : "w-4/5 sm:w-3/5"
      }`}
    >
      <div className="flex flex-col h-full">
        {isEditing ? (
          <EditForm
            title={newTitle}
            description={newDescription}
            setNewTitle={setNewTitle}
            setNewDescription={setNewDescription}
            handleSaveClick={handleSaveClick}
          />
        ) : (
          <div className={` flex flex-col justify-between max-h-[100vh] ${isFullscreen ? "h-full" : "h-full"}`}>
            <div className="flex flex-col">
               <Header
                user_id={user_id}
                current_user_id={current_user_id}
                handleEditClick={handleEditClick}
                leftPinColor={leftPinColor}
                rightPinColor={rightPinColor}
                isFullscreen={isFullscreen} // Pass the fullscreen state here
              />

              <div
                className={`flex ${isFullscreen ? "mx-auto aspect-video w-[70vw] sm:h-auto" : "mx-auto aspect-video w-[95%]"}`}
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
              />
              <h2 className="place-self-center text-center font-semibold text-gray-900 sm:w-2/5">
                {title}
              </h2>
              <p className="mx-2 mt-2 w-full place-self-center border-b border-gray-500 pb-1 text-center text-xs font-medium text-gray-800">
                {description}
              </p>
            </div>
            <div className="flex flex-col align-bottom max-h-[50vh] overflow-y-auto">
            <Interactions
                video_id={video_id}
                showCommentSection={showCommentSection}
                toggleCommentSection={toggleCommentSection}
                isFullscreen={isFullscreen} // Pass the fullscreen state here
              />
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default VideoPost
