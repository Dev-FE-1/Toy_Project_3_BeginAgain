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

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { comment: string; feedId: string }) => {
      const { comment, feedId } = payload
      const db = getFirestore()
      const auth = getAuth()
      const user = auth.currentUser
      const coll = collection(db, 'Comments')
      console.log('Create Comment', user)
      if (!user) return
      await addDoc(coll, {
        user: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        content: comment,
        createdAt: new Date().toISOString(),
        feedId
      })
    },
    onSuccess: (_data, payload) => {
      const { feedId } = payload
      queryClient.invalidateQueries({ queryKey: ['comments', feedId] })
    }
  })
}
