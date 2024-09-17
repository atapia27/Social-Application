//frontend\components\helpers\buttons.tsx

import { twMerge } from "tailwind-merge"
import { ButtonAnimations } from "./animations"

//////////////////////////////////////// SQUARE BUTTONS ////////////////////////////////////////

const SqButtonBase =
  "flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-lg border-b-[1px] transition-all duration-150"

// Color variants
const ColorVariantSquare = {
  blue: "border-blue-400 bg-blue-500 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]",
  green:
    "border-green-400 bg-green-500 [box-shadow:0_10px_0_0_#15803d,0_15px_0_0_#16a34a41] active:[box-shadow:0_0px_0_0_#15803d,0_0px_0_0_#16a34a41]",
  yellow:
    "border-yellow-400 bg-yellow-500 [box-shadow:0_10px_0_0_#d97706,0_15px_0_0_#f59e0b41] active:[box-shadow:0_0px_0_0_#d97706,0_0px_0_0_#f59e0b41]",
  red: "border-red-400 bg-red-500 [box-shadow:0_10px_0_0_#b91c1c,0_15px_0_0_#dc262641] active:[box-shadow:0_0px_0_0_#b91c1c,0_0px_0_0_#dc262641]",
  violet:
    "border-violet-400 bg-violet-500 [box-shadow:0_10px_0_0_#7c3aed,0_15px_0_0_#8b5cf641] active:[box-shadow:0_0px_0_0_#7c3aed,0_0px_0_0_#8b5cf641]",
  white:
    "border-gray-300 bg-white [box-shadow:0_10px_0_0_#d1d5db,0_15px_0_0_rgba(0,0,0,0.1)] active:[box-shadow:0_0px_0_0_#d1d5db,0_0px_0_0_#e5e7eb]",
  orange:
    "border-orange-400 bg-orange-500 [box-shadow:0_10px_0_0_#dd6b20,0_15px_0_0_#dd6b2041] active:[box-shadow:0_0px_0_0_#dd6b20,0_0px_0_0_#dd6b2041]",
} // [box-shadow:0_10px_0_0_#d1d5db,0_15px_0_0_rgba(0,0,0,0.1)] change?

const SquareButton = twMerge(SqButtonBase, ButtonAnimations.push)

//////////////////////////////////////// RECTANGULAR BUTTONS ////////////////////////////////////////

const RectButtonBase =
  "px-3 mb-3 flex h-10 w-fit cursor-pointer select-none items-center justify-center rounded-lg border-b-[1px] transition-all duration-150"

const ThinRectButtonBase =
  "px-3 mb-4 flex h-8 w-fit cursor-pointer select-none items-center justify-center rounded-lg border-b-[1px] transition-all duration-150"

const RectButton = twMerge(RectButtonBase, ButtonAnimations.push)

const ThinRectButton = twMerge(ThinRectButtonBase, ButtonAnimations.push)
//////////////////////////////////////// CIRCULAR BUTTONS ////////////////////////////////////////

const CircularButtonBase =
  "flex h-12 w-12 cursor-pointer select-none items-center justify-center rounded-full border-[1px] transition-all duration-150 ease-in-out text-white hover:scale-110"

const ColorVariantCircular = {
  orange:
    "border-orange-400 bg-orange-500 [box-shadow:0_8px_0_0_#dd6b20,0_13px_0_0_#dd6b2041] active:[box-shadow:0_0px_0_0_#dd6b20,0_0px_0_0_#dd6b2041]",
  green:
    "border-green-400 bg-green-500 [box-shadow:0_8px_0_0_#2f855a,0_13px_0_0_#2f855a41] active:[box-shadow:0_0px_0_0_#2f855a,0_0px_0_0_#2f855a41]",
  blue: "border-blue-400 bg-blue-500 [box-shadow:0_8px_0_0_#1b6ff8,0_13px_0_0_#1b70f841] active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]", // Custom blue variant
}

const CircularButton = twMerge(CircularButtonBase, ButtonAnimations.push)

//////////////////////////////////////// EXPORTS ////////////////////////////////////////

export const SquareButtonVariant = {
  blue: twMerge(ColorVariantSquare.blue, SquareButton),
  green: twMerge(ColorVariantSquare.green, SquareButton),
  yellow: twMerge(ColorVariantSquare.yellow, SquareButton),
  red: twMerge(ColorVariantSquare.red, SquareButton),
  violet: twMerge(ColorVariantSquare.violet, SquareButton),
}

export const RectButtonVariant = {
  violet: twMerge(ColorVariantSquare.violet, RectButton),
  white: twMerge(ColorVariantSquare.white, RectButton),
}

export const ThinRectButtonVariant = {
  violet: twMerge(ColorVariantSquare.violet, ThinRectButton),
  white: twMerge(ColorVariantSquare.white, ThinRectButton),
  yellow: twMerge(ColorVariantSquare.yellow, ThinRectButton),
}

export const CircularButtonVariant = {
  orange: twMerge(ColorVariantCircular.orange, CircularButton),
  green: twMerge(ColorVariantCircular.green, CircularButton),
  blue: twMerge(ColorVariantCircular.blue, CircularButton),
}

export const ButtonLogoText = "text-lg font-bold text-white w-auto h-auto"
