// frontend\components\video\CreateVideoForm.tsx
import React, { useState } from "react"
import useAuthStore from "../../zustand/store/authStore"
import useVideoStore from "../../zustand/store/videoStore"
import { PostVideo } from "../../api/video"
import { FaWandMagicSparkles } from "react-icons/fa6"
import { TiCancel } from "react-icons/ti"
import { twMerge } from "tailwind-merge"
import { FormPanelAnimations, FormTransitions } from "../helpers/animations"
import { CircularButtonVariant } from "../helpers/buttons"
import { FormStyle } from "./utils/FormStyles" // Import the FormStyle object

const CreateVideoForm: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const { user_id } = useAuthStore()
  const { postVideo: addVideo } = useVideoStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user_id) {
      const post_info: PostVideo = {
        user_id: user_id,
        description: description,
        video_url: videoUrl,
        title: title,
      }
      try {
        console.log("Submitting video:", post_info)
        await addVideo(post_info)
        console.log("Video submitted successfully")
        setTitle("")
        setDescription("")
        setVideoUrl("")
        setIsExpanded(false)
      } catch (error) {
        console.error("Error submitting video:", error)
      }
    } else {
      console.error("User ID is not available")
    }
  }

  return (
    <div className="flex flex-col  ">
      <div
        className={twMerge(
          "relative overflow-hidden ",
          FormTransitions,
          isExpanded
            ? FormPanelAnimations.expanded
            : FormPanelAnimations.collapsed,
        )}
      >
        <form onSubmit={handleSubmit} className={FormStyle.formContainer}>
          <div className={FormStyle.formGrid}>
            <div>
              <label htmlFor="title" className={FormStyle.formText}>
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                className={FormStyle.inputYellowBackground}
                required
              />
            </div>
            <div>
              <label htmlFor="videoUrl" className={FormStyle.formText}>
                Video URL
              </label>
              <input
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="Ex: https://youtu.be/e0tq2NtHL9g"
                className={FormStyle.inputYellowBackground}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className={FormStyle.formText}>
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              className={FormStyle.inputYellowBackground}
              required
            />
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-gray-400 pt-2 text-sm">
            <button
              type="button"
              className={FormStyle.redButton}
              onClick={() => setIsExpanded(false)}
            >
              <TiCancel className="text-2xl" />
            </button>
            <button type="submit" className={FormStyle.blueButton}>
              <FaWandMagicSparkles className="text-2xl" />
            </button>
          </div>
          <div className={FormStyle.chalk}></div>
          <div className={FormStyle.ruler}></div>

        </form>
      </div>

      {!isExpanded && (
        <div
          className={twMerge(CircularButtonVariant.blue, " mb-6 max-w-[25vw] sm:max-w-[15vw] py-1  place-self-center")}
          onClick={() => setIsExpanded(true)}
        >
          <FaWandMagicSparkles className="text-2xl" />
        </div>
      )}
    </div>
  )
}

export default CreateVideoForm
