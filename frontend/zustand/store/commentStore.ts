// frontend\zustand\store\commentStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  fetchCommentsAPI,
  postCommentAPI,
  Comment,
  CommentsResponse,
} from "../../api/comment"

interface VideoCommentsState {
  comments: Comment[]
  loading: boolean
  error: string | null
}

interface CommentState {
  commentsByVideoId: { [video_id: string]: VideoCommentsState }
}

interface CommentActions {
  fetchComments: (video_id: string) => void
  postComment: (video_id: string, content: string, user_id: string) => void
}

const useCommentStore = create<CommentState & CommentActions>()(
  persist(
    (set, get) => ({
      commentsByVideoId: {},
      fetchComments: async (video_id: string) => {
        console.log(`fetchComments called with video_id: ${video_id}`)
        set((state) => ({
          commentsByVideoId: {
            ...state.commentsByVideoId,
            [video_id]: {
              ...state.commentsByVideoId[video_id],
              loading: true,
              error: null,
            },
          },
        }))
        try {
          const data: CommentsResponse = await fetchCommentsAPI(video_id)
          set((state) => ({
            commentsByVideoId: {
              ...state.commentsByVideoId,
              [video_id]: {
                comments: data.comments,
                loading: false,
                error: null,
              },
            },
          }))
        } catch (error: any) {
          console.error(`Error fetching comments: ${error.message}`)
          set((state) => ({
            commentsByVideoId: {
              ...state.commentsByVideoId,
              [video_id]: {
                ...state.commentsByVideoId[video_id],
                error: error.message,
                loading: false,
              },
            },
          }))
        }
      },
      postComment: async (
        video_id: string,
        content: string,
        user_id: string,
      ) => {
        console.log(
          `postComment called with video_id: ${video_id}, content: ${content}, user_id: ${user_id}`,
        )
        set((state) => ({
          commentsByVideoId: {
            ...state.commentsByVideoId,
            [video_id]: {
              ...state.commentsByVideoId[video_id],
              loading: true,
              error: null,
            },
          },
        }))
        try {
          await postCommentAPI(video_id, content, user_id)
          console.log("Comment posted successfully")
          // Optionally fetch comments again to update the state
          const data: CommentsResponse = await fetchCommentsAPI(video_id)
          console.log(
            `Updated comments fetched: ${JSON.stringify(data.comments)}`,
          )
          set((state) => ({
            commentsByVideoId: {
              ...state.commentsByVideoId,
              [video_id]: {
                comments: data.comments,
                loading: false,
                error: null,
              },
            },
          }))
        } catch (error: any) {
          console.error(`Error posting comment: ${error.message}`)
          set((state) => ({
            commentsByVideoId: {
              ...state.commentsByVideoId,
              [video_id]: {
                ...state.commentsByVideoId[video_id],
                error: error.message,
                loading: false,
              },
            },
          }))
        }
      },
    }),
    {
      name: "comment-storage",
    },
  ),
)

export default useCommentStore
