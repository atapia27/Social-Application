// frontend/pages/login.tsx

import type { NextPage } from "next"
import React, { useState } from "react"
import { useRouter } from "next/router"
import useAuthStore from "../zustand/store/authStore"

const Login: NextPage = () => {
  const [user_id, setUserId] = useState("")
  const { login } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await login(user_id)
      router.push("/")
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  return (
    <div className="flex items-center justify-center p-4 pt-16">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        <div>
          <label
            htmlFor="user_id"
            className="block text-xl font-medium text-gray-700"
          >
            User ID: 
          </label>
          <p className="text-sm text-gray-600 ">
            Input 'user_name' for testing *
          </p>
          <input
            type="text"
            id="user_id"
            placeholder="user_name"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            className="placeholder-gray-400 mt-1 text-sm block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
