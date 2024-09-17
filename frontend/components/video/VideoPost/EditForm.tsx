// components/video/VideoPost/EditForm.tsx

import React from "react"

interface EditFormProps {
  title: string
  description: string
  setNewTitle: (title: string) => void
  setNewDescription: (description: string) => void
  handleSaveClick: () => void
}

const EditForm: React.FC<EditFormProps> = ({
  title,
  description,
  setNewTitle,
  setNewDescription,
  handleSaveClick,
}) => (
  <div className="z-20 p-4">
    <label
      className="mb-2 mt-2 block font-semibold text-gray-700"
      htmlFor="title"
    >
      Title
    </label>
    <input
      type="text"
      id="title"
      className="mb-4 block w-full border p-2"
      value={title}
      onChange={(e) => setNewTitle(e.target.value)}
      placeholder="New title"
    />

    <label
      className="mb-2 block font-semibold text-gray-700"
      htmlFor="description"
    >
      Description
    </label>
    <textarea
      id="description"
      className="mb-4 block w-full border p-2"
      value={description}
      onChange={(e) => setNewDescription(e.target.value)}
      placeholder="New description"
    />

    <button
      className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
      onClick={handleSaveClick}
    >
      Save
    </button>
  </div>
)

export default EditForm
