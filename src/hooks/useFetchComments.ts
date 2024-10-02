import { useQuery } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import type { User } from 'firebase/auth'

export interface Comment {
  id: string
  user: User
  content: string
  createdAt: string
  playlistId: string
  userId: string
}

export const useFetchComments = (playlistId: string) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', playlistId],
    queryFn: async () => {
      const db = getFirestore()
      const coll = collection(db, 'Comments')
      const querySnapshot = await getDocs(
        query(coll, where('playlistId', '==', playlistId))
      )
      return querySnapshot.docs.map(doc => {
        const data = doc.data() as Omit<Comment, 'id'>
        return {
          id: doc.id,
          ...data
        }
      })
    },
    select(data) {
      return data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    }
  })
}
