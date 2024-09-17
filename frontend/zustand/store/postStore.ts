// zustand/store/postStore.ts

import { create } from "zustand"

interface PostStore {
  isFullscreen: boolean
  setIsFullscreen: (isFullscreen: boolean) => void
}

const usePostStore = create<PostStore>((set) => ({
  isFullscreen: false,
  setIsFullscreen: (isFullscreen: boolean) => set({ isFullscreen }),
}))

export default usePostStore
