// frontend\components\comment\CommentForm.tsx
import React, { useState } from "react"
import useCommentStore from "../../zustand/store/commentStore"
import { FaPencilAlt } from "react-icons/fa"
import CommentsDisplay from "./CommentsDisplay"
import useAuthStore from "../../zustand/store/authStore"

interface Props {
  video_id: string // ID of the video for which the comment is being submitted
  isFullscreen: boolean // Add this prop to handle fullscreen state
}

const CommentForm: React.FC<Props> = ({ video_id, isFullscreen }) => {
  const [content, setContent] = useState("")
  const { postComment } = useCommentStore()
  const { user_id } = useAuthStore((state) => state) // Get user_id from auth store

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return // Do not submit empty comments

    try {
      // Dispatch an action to create the comment
      await postComment(video_id, content.trim(), user_id!) // Correct user_id usage
      console.log(`Comment posted successfully for video_id: ${video_id}`)
      // Clear the input field after submission
      setContent("")
    } catch (error) {
      console.error("Error creating comment:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="px-4">
      {video_id && (
        <CommentsDisplay video_id={video_id} isFullscreen={isFullscreen} />
      )}{" "}
      {/* Include CommentsDisplay above the form */}
      <form
        onSubmit={handleSubmit}
        className="mx-4 mt-4 flex items-center gap-2"
      >
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="w-full resize-none rounded-lg border border-gray-600 bg-yellow-100 p-2 pt-1 text-sm text-gray-700 placeholder-gray-500 shadow-inner focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 95%, #cccccc 95%)",
            backgroundSize: "100% 20px",
          }}
        />
        <button
          type="submit"
          className="flex h-12 w-8 items-center justify-center rounded-full bg-blue-400 p-1 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <FaPencilAlt className="text-lg" />
        </button>
      </form>
    </div>
  )
}

export default CommentForm
