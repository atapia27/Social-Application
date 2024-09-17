import React, { useState } from "react"
import { FaCalculator } from "react-icons/fa"
import { CircularButtonVariant } from "../helpers/buttons"
import { twMerge } from "tailwind-merge"
import { PanelAnimations, PanelTransitions } from "../helpers/animations"

// Button styles
const NumberButtonStyle =
  "rounded-md bg-gray-300 py-4 text-black shadow-lg hover:bg-gray-400"
const OperatorButtonStyle =
  "rounded-md bg-orange-500 py-4 text-white shadow-lg hover:bg-orange-600"

const Calculator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCalculator = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      {/* Ensure this button is always visible regardless of other components */}
      {!isOpen && (
        <button
          onClick={toggleCalculator}
          className={twMerge(
            "fixed right-12 top-24 z-50",
            CircularButtonVariant.orange,
          )}
        >
          <FaCalculator size={24} />
        </button>
      )}

      {/* Calculator panel when open */}
      <div
        className={twMerge(
          "fixed right-2 top-28 z-50 mt-12",
          PanelTransitions,
          isOpen ? PanelAnimations.open : PanelAnimations.rightClosed,
        )}
      >
        {/* Calculator UI when opened */}
        <div className="relative h-[32rem] w-96 transform overflow-hidden rounded-none border-4 border-gray-300 bg-white p-4 shadow-lg transition-all duration-300 ease-in-out">
          {/* Close Button */}
          <button
            onClick={toggleCalculator}
            className="relative left-2 top-2 z-50 rounded-full bg-red-300 p-2 shadow-md hover:bg-red-400"
          >
            <FaCalculator size={24} className="text-gray-700" />
          </button>

          {/* Calculator display */}
          <div className="mb-4 mt-4 flex h-16 items-center justify-end rounded-md bg-gray-200 p-4 font-mono text-2xl text-black">
            0
          </div>

          {/* Calculator buttons */}
          <div className="grid grid-cols-4 gap-4">
            <button className={NumberButtonStyle}>7</button>
            <button className={NumberButtonStyle}>8</button>
            <button className={NumberButtonStyle}>9</button>
            <button className={OperatorButtonStyle}>/</button>

            <button className={NumberButtonStyle}>4</button>
            <button className={NumberButtonStyle}>5</button>
            <button className={NumberButtonStyle}>6</button>
            <button className={OperatorButtonStyle}>x</button>

            <button className={NumberButtonStyle}>1</button>
            <button className={NumberButtonStyle}>2</button>
            <button className={NumberButtonStyle}>3</button>
            <button className={OperatorButtonStyle}>-</button>

            <button className="col-span-2 rounded-md bg-gray-300 py-4 text-black shadow-lg hover:bg-gray-400">
              0
            </button>
            <button className={NumberButtonStyle}>.</button>
            <button className={OperatorButtonStyle}>+</button>

            <button className="col-span-4 rounded-md bg-orange-600 py-4 text-white shadow-lg hover:bg-orange-700">
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
