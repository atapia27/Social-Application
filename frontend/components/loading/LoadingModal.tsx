// frontend\components\loading\LoadingModal.tsx
import { FC } from "react"

interface LoadingModalProps {
  message: string
}

const LoadingModal: FC<LoadingModalProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
        <div className="loader mb-4" />
        <p>{message}</p>
      </div>
      <style jsx>{`
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingModal
