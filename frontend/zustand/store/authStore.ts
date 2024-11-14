// frontend/zustand/store/authStore.ts 

import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  registerUserAPI,
  loginUserAPI,
  logoutUserAPI,
  AuthResponse,
} from "../../api/auth"

interface AuthState {
  user_id: string | null
  icon: string | null
  first_name: string | null
  last_name: string | null
  logged_in: boolean
  loading: boolean
  error: string | null
  login: (user_id: string) => void
  register: (first_name: string, last_name: string, icon: string) => void
  logout: () => void
  resetState: () => void // Add a method to reset state
  setError : (error: string) => void
  setLoading : (loading: boolean) => void
}

// Allows for instant login when page first loads
const defaultState = {
  user_id: null,
  icon: null,
  first_name: null,
  last_name: null,
  logged_in: false,
  loading: false,
  error: null,
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...defaultState, // Spread the default state here
      login: async (user_id: string) => {
        set({ loading: true, error: null })
        const minimumLoadingTime = new Promise<void>((resolve) =>
          setTimeout(resolve, 1500) // Ensure loading state lasts for at least 1.5 seconds
        )
        try {
          const data: AuthResponse = await loginUserAPI(user_id)
          await minimumLoadingTime
          set({
            user_id: data.user_id,
            icon: data.icon,
            first_name: data.first_name,
            last_name: data.last_name,
            logged_in: data.logged_in,
            loading: false,
            error: null,
          })
        } catch (error: any) {
          await minimumLoadingTime
          console.error("Login error:", error)
          set({ error: error.message, loading: false })
        }
      },
      register: async (first_name: string, last_name: string, icon: string) => {
        set({ loading: true, error: null })
        const minimumLoadingTime = new Promise<void>((resolve) =>
          setTimeout(resolve, 1500) // Ensure loading state lasts for at least 1.5 seconds
        )
        try {
          const data: AuthResponse = await registerUserAPI(
            first_name,
            last_name,
            icon,
          )
          await minimumLoadingTime
          set({
            user_id: data.user_id,
            icon: data.icon,
            first_name: data.first_name,
            last_name: data.last_name,
            logged_in: data.logged_in,
            loading: false,
            error: null,
          })
        } catch (error: any) {
          await minimumLoadingTime
          console.error("Register error:", error)
          set({ error: error.message, loading: false })
        }
      },
      logout: async () => {
        const user_id = get().user_id
        if (user_id) {
          set({ loading: true, error: null })

          const minimumLoadingTime = new Promise<void>((resolve) =>
            setTimeout(resolve, 1500) // Ensure loading state lasts for at least 1.5 seconds
          )

          try {
            // Perform the logout API call
            await logoutUserAPI(user_id)

            // Wait for both the minimum loading time and the API call completion
            await minimumLoadingTime

            // Reset state after successful logout
            set(defaultState)
          } catch (error: any) {
            // Ensure minimum loading time is completed before handling the error
            await minimumLoadingTime

            console.error("Logout failed", error)

            // Handle logout failure - keep the current user's state but stop loading
            set({
              loading: false,
              error: "Logout failed. Please try again.",
            })
          }
        }
      },
      resetState: () => {
        set(defaultState) // Method to reset state
      },
      setError: (error) => set({ error }),
      setLoading: (loading) => set({ loading }),
      
    }),
    {
      name: "auth-storage",
    },
  ),
)

export default useAuthStore
