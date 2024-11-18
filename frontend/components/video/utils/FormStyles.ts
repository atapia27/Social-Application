//frontend\components\video\Styles\FormStyles.ts

import { twMerge } from "tailwind-merge"

// Define base styles once for reuse
const buttonBase =
  "flex items-center justify-center rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
const inputBase =
  "w-full rounded-md border border-gray-300 p-2 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-400"
const decorativeBase = "absolute bottom-0"

export const FormStyle = {
  formText: "mb-1 block text-sm font-medium text-gray-100 ",
  // Form container and grid
  formContainer:
    "relative mb-6 rounded-lg border-8 border-[#8B4513] bg-green-700 p-6 pb-10 sm:p-6 text-white shadow-lg",
  formGrid: "mb-4 grid grid-cols-1 gap-4 md:grid-cols-2",

  // Button base and variants using the buttonBase
  redButton: twMerge(
    buttonBase,
    "bg-red-500 hover:bg-red-600 focus:ring-red-500",
  ),
  blueButton: twMerge(
    buttonBase,
    "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500",
  ),
  // Input base and variants using the inputBase
  inputYellowBackground: twMerge(inputBase, "bg-yellow-100"),

  // Decorative elements using decorativeBase
  chalk: twMerge(
    decorativeBase,
    "left-4 h-2 w-16 rounded-sm border border-gray-100 bg-white shadow-md",
  ),
  ruler: twMerge(
    decorativeBase,
    "right-4 h-1 w-32 rounded border border-yellow-700 bg-yellow-500 shadow-md",
  ),
  triangularRuler: twMerge(
    decorativeBase,
    "right-48 h-12 w-12 border border-blue-900 bg-blue-500",
  ),
  greenTriangularHole: twMerge(
    decorativeBase,
    "right-[13.25rem] h-4 w-4 border border-green-900 bg-green-700 shadow-md",
  ),
  chalkEraser: twMerge(
    decorativeBase,
    "left-48 h-1 w-20 border border-orange-700 bg-orange-400",
  ),
  chalkEraserShadow: twMerge(
    decorativeBase,
    "left-48 h-3 w-20 border border-black bg-black",
  ),
}
