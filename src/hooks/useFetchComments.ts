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
