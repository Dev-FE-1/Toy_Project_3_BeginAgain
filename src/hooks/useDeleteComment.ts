import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  where
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import type { User } from 'firebase/auth'

interface Comment {
  id: string
  user: User
  content: string
  createdAt: string
  feedId: string
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { commentId: string; feedId: string }) => {
      const { commentId } = payload
      const db = getFirestore()
      const coll = collection(db, 'Comments')
      await deleteDoc(doc(coll, commentId))
    },
    onSuccess: (_data, payload) => {
      const { feedId } = payload
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] })
    }
  })
}
