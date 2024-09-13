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

export const useFetchComments = (feedId: string) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', feedId],
    queryFn: async () => {
      const db = getFirestore()
      const coll = collection(db, 'Comments')
      const querySnapshot = await getDocs(
        query(coll, where('feedId', '==', feedId))
      )
      return querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as Comment[]
    },
    select(data) {
      return data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    }
  })
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
