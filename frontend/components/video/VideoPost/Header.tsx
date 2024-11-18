// components/video/VideoPost/Header.tsx

import React from "react"
import { FiEdit } from "react-icons/fi"
import { VideoPostStyle } from "../utils/VideoPostStyles"
import { ThinRectButtonVariant } from "../../helpers/buttons"

interface HeaderProps {
  user_id: string
  current_user_id: string | null
  handleEditClick: () => void
  leftPinColor: { base: string; inner: string; border: string }
  rightPinColor: { base: string; inner: string; border: string }
  isFullscreen: boolean // Add this prop to handle fullscreen state
}

const Header: React.FC<HeaderProps> = ({
  user_id,
  current_user_id,
  handleEditClick,
  leftPinColor,
  rightPinColor,
  isFullscreen,
}) => { return (
  <div>
    <div
      className={
        isFullscreen ? VideoPostStyle.leftPinFS : VideoPostStyle.leftPin
      }
    >
      <div className={VideoPostStyle.pinBase(leftPinColor)}>
        <div className={VideoPostStyle.pinInner(leftPinColor)}></div>
      </div>
    </div>

    <div
      className={
        isFullscreen ? VideoPostStyle.rightPinFS : VideoPostStyle.rightPin
      }
    >
      <div className={VideoPostStyle.pinBase(rightPinColor)}>
        <div className={VideoPostStyle.pinInner(rightPinColor)}></div>
      </div>
    </div>

    <div className="flex justify-between gap-2 px-4 pb-6 pt-2 w-full">
      <h3 className={ThinRectButtonVariant.white}>{user_id}</h3>
      {current_user_id === user_id && (
        <button
          className={ThinRectButtonVariant.violet}
          onClick={handleEditClick}
        >
          <FiEdit />
        </button>
      )}
    </div>
    </div>
)}

export default Header
