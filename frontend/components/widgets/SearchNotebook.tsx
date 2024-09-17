import React, { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { CircularButtonVariant } from "../helpers/buttons"
import { twMerge } from "tailwind-merge"
import { PanelAnimations, PanelTransitions } from "../helpers/animations"

// Button styles
const ButtonBase =
  "rounded-none border-4 py-2 text-white shadow-lg transition-all active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
const ColorVariant = {
  blue: "border-blue-700 bg-blue-500",
  green: "border-green-700 bg-green-500",
  yellow: "border-yellow-700 bg-yellow-500",
  red: "border-red-700 bg-red-500",
}

const ButtonVariant = {
  blue: twMerge(ColorVariant.blue, ButtonBase),
  green: twMerge(ColorVariant.green, ButtonBase),
  yellow: twMerge(ColorVariant.yellow, ButtonBase),
  red: twMerge(ColorVariant.red, ButtonBase),
}

const SearchNotebook: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNotebook = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      {/* Ensure this button is always visible regardless of other components */}
      {!isOpen && (
        <button
          onClick={toggleNotebook}
          className={twMerge(
            "fixed left-12 top-24 z-50",
            CircularButtonVariant.green,
          )}
        >
          <FaSearch size={24} />
        </button>
      )}

      {/* Notebook panel when open */}
      <div
        className={twMerge(
          "fixed left-2 top-28 z-50 mt-12",
          PanelTransitions,
          isOpen ? PanelAnimations.open : PanelAnimations.leftClosed,
        )}
      >
        {/* Notebook UI when opened */}
        <div className="relative h-[32rem] w-96 transform overflow-hidden rounded-none border-4 border-gray-300 bg-white p-4 shadow-lg transition-all duration-300 ease-in-out">
          {/* Close Button */}
          <button
            onClick={toggleNotebook}
            className="relative left-[19rem] top-2 z-50 rounded-full bg-red-300 p-2 shadow-md hover:bg-red-400"
          >
            <FaSearch size={24} className="text-gray-700" />
          </button>

          {/* Red vertical line */}
          <div className="absolute bottom-0 left-4 top-0 w-1 bg-red-500"></div>

          {/* Horizontal lines */}
          <div className="absolute left-0 right-0 top-6 h-full">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className={`h-[1px] w-full bg-blue-200 ${
                  index === 0 ? "mt-12" : "mt-6"
                }`}
              ></div>
            ))}
          </div>

          {/* Content above lines */}
          <div className="relative z-50">
            {/* Search bar */}
            <div className="mb-8 mt-10 flex justify-center">
              <input
                type="text"
                placeholder="Search for a topic..."
                className="ml-6 w-full rounded-sm border border-gray-300 px-2 focus:border-blue-400 focus:outline-none"
              />
            </div>

            {/* 2x2 Grid Buttons */}
            <div className="ml-6 grid grid-cols-2 gap-8">
              <button className={ButtonVariant.green}>Science</button>
              <button className={ButtonVariant.red}>Math</button>
              <button className={ButtonVariant.yellow}>History</button>
              <button className={ButtonVariant.blue}>English</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchNotebook
