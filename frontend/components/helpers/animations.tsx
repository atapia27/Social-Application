// frontend\components\helpers\animations.tsx

export const ButtonAnimations = {
  push: "active:translate-y-2 active:border-b-[0px]",
}

// Define open and closed animations for left-side sliding panel
export const PanelAnimations = {
  open: "max-h-[32rem] w-96 translate-x-0 opacity-100 delay-150",
  leftClosed: "max-h-0 w-96 -translate-x-full opacity-0",
  rightClosed: "max-h-0 w-96 translate-x-full opacity-0",
}

// Define transition and transform animations
export const PanelTransitions =
  "transform transition-all duration-500 ease-in-out"

// Animation for expanding and collapsing the form
export const FormPanelAnimations = {
  expanded: "max-h-[500px] opacity-100 delay-150",
  collapsed: "max-h-0 opacity-0",
}

// Animation for form transition
export const FormTransitions = "transition-all duration-500 ease-in-out"
