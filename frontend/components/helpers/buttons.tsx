// frontend\components\helpers\buttons.tsx

import { twMerge } from "tailwind-merge"
import { ButtonAnimations } from "./animations"

//////////////////////////////////////// BASE BUTTON STYLES ////////////////////////////////////////

const buttonBaseStyles = {
  square: "flex h-full w-full sm:w-auto sm:aspect-square cursor-pointer select-none items-center justify-center rounded-lg border-b-[1px]",
  rect: "flex h-full w-full cursor-pointer select-none items-center justify-center rounded-lg border-b-[1px]",
  thinRect: "flex w-full cursor-pointer select-none items-center justify-center rounded-lg border-b-[1px]",
  circular: "flex w-full cursor-pointer select-none items-center justify-center rounded-full border-[1px] transition-all ease-in-out text-white hover:scale-110",
}

const ButtonBases = {
  square: twMerge(buttonBaseStyles.square, ButtonAnimations.push),
  rect: twMerge(buttonBaseStyles.rect, ButtonAnimations.push),
  thinRect: twMerge(buttonBaseStyles.thinRect, ButtonAnimations.push),
  circular: twMerge(buttonBaseStyles.circular, ButtonAnimations.push),
}

//////////////////////////////////////// COLOR VARIANTS ////////////////////////////////////////

// Helper function for box shadows with custom active shadow for white button
const boxShadowStyles = (color: string, shade: string, activeShade?: string) => 
  `[box-shadow:0_10px_0_0_${color},0_15px_0_0_${shade}] active:[box-shadow:0_0px_0_0_${color},0_0px_0_0_${activeShade || shade}]`

const colorVariants = {
  blue: `border-blue-400 bg-blue-500 ${boxShadowStyles('#1b6ff8', '#1b70f841')}`,
  green: `border-green-400 bg-green-500 ${boxShadowStyles('#15803d', '#16a34a41')}`,
  yellow: `border-yellow-400 bg-yellow-500 ${boxShadowStyles('#d97706', '#f59e0b41')}`,
  red: `border-red-400 bg-red-500 ${boxShadowStyles('#b91c1c', '#dc262641')}`,
  violet: `border-violet-400 bg-violet-500 ${boxShadowStyles('#7c3aed', '#8b5cf641')}`,
  white: `border-gray-300 bg-white ${boxShadowStyles('#d1d5db', 'rgba(0,0,0,0.05)', '#e5e7eb')}`,
  orange: `border-orange-400 bg-orange-500 ${boxShadowStyles('#dd6b20', '#dd6b2041')}`,
}

//////////////////////////////////////// BUTTON VARIANTS ////////////////////////////////////////

// Helper to merge button base styles with color variants
const createButtonVariant = (baseStyle: string, colorStyle: string) => twMerge(baseStyle, colorStyle)

export const SquareButtonVariant = {
  blue: createButtonVariant(ButtonBases.square, colorVariants.blue),
  green: createButtonVariant(ButtonBases.square, colorVariants.green),
  yellow: createButtonVariant(ButtonBases.square, colorVariants.yellow),
  red: createButtonVariant(ButtonBases.square, colorVariants.red),
  violet: createButtonVariant(ButtonBases.square, colorVariants.violet),
}

export const RectButtonVariant = {
  violet: createButtonVariant(ButtonBases.rect, colorVariants.violet),
  white: createButtonVariant(ButtonBases.rect, colorVariants.white),
}

export const ThinRectButtonVariant = {
  violet: createButtonVariant(ButtonBases.thinRect, colorVariants.violet),
  white: createButtonVariant(ButtonBases.thinRect, colorVariants.white),
  yellow: createButtonVariant(ButtonBases.thinRect, colorVariants.yellow),
}

export const CircularButtonVariant = {
  orange: createButtonVariant(ButtonBases.circular, colorVariants.orange),
  green: createButtonVariant(ButtonBases.circular, colorVariants.green),
  blue: createButtonVariant(ButtonBases.circular, colorVariants.blue),
}

export const ButtonLogoText = "text-white"
