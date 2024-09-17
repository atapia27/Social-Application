// frontend\components\video\Styles\VideoPostStyles.ts
import { twMerge } from "tailwind-merge"

// Define base styles
const pinLocation = "absolute top-14 z-10"
const pinBase =
  "h-6 w-6 flex items-center justify-center rounded-none shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]"
const pinInnerBase = "h-3 w-3 rounded-none border-[1px]"
const buttonBase =
  "flex items-center rounded-none border-4 px-4 py-2 text-gray-700 shadow-[8px_8px_0_rgba(0,0,0,0.25)] transition-all duration-150 hover:text-gray-900 active:translate-x-[4px] active:translate-y-[4px] active:shadow-[8px_8px_0_rgba(0,0,0,0)]"

// Export reusable styles
export const VideoPostStyle = {
  // Pin styles
  leftPin: twMerge(pinLocation, "left-1"),
  leftPinFS: twMerge(pinLocation, "left-[16.25rem]"),
  rightPin: twMerge(pinLocation, "right-1 rotate-45"),
  rightPinFS: twMerge(pinLocation, "right-[16.25rem] rotate-45"),
  pinBase: (color: { base: string }) => twMerge(pinBase, color.base),
  pinInner: (color: { inner: string; border: string }) =>
    twMerge(pinInnerBase, color.inner, color.border),

  // Button styles
  likeButton: twMerge(buttonBase, "border-pink-300 bg-pink-200"),
  commentButton: twMerge(buttonBase, "border-blue-300 bg-blue-200"),
  shareButton: twMerge(buttonBase, "border-yellow-300 bg-yellow-200"),
}
