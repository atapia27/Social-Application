// components/video/VideoPost/Controls.tsx

import React from "react"
import { FiMaximize, FiMinimize } from "react-icons/fi"
import { FaVolumeUp } from "react-icons/fa"
import { RiSpeedLine } from "react-icons/ri"

const controlStyle = "text-gray-700 text-2xl border-4 rounded-sm bg-white"

interface ControlsProps {
  isFullscreen: boolean
  handleFullscreenToggle: () => void
  volume: number
  setVolume: (volume: number) => void
  showVolume: boolean
  setShowVolume: (show: boolean) => void
  playbackRate: number
  setPlaybackRate: (rate: number) => void
  showSpeed: boolean
  setShowSpeed: (show: boolean) => void
  title: string
}

const Controls: React.FC<ControlsProps> = ({
  isFullscreen,
  handleFullscreenToggle,
  volume,
  setVolume,
  showVolume,
  setShowVolume,
  playbackRate,
  setPlaybackRate,
  showSpeed,
  setShowSpeed,
  title,
}) => (
  <div className="mx-2 mt-2 flex items-center justify-between">
    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    <div className="flex items-center gap-4">


      <button
        onClick={() => setShowVolume(!showVolume)}
        className={controlStyle}
      >
        <FaVolumeUp />
      </button>
      {showVolume && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32"
        />
      )}

      <button
        onClick={() => setShowSpeed(!showSpeed)}
        className={controlStyle}
      >
        <RiSpeedLine />
      </button>
      {showSpeed && (
        <select
          value={playbackRate}
          onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
          className="border p-1"
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      )}
      
      <button className={controlStyle} onClick={handleFullscreenToggle}>
      {isFullscreen ? <FiMinimize /> : <FiMaximize />}
      </button>
    </div>
  </div>
)

export default Controls
