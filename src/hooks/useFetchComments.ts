import { useQuery } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import type { User } from 'firebase/auth'

interface Comment {
  id: string
  user: User
  content: string
  createdAt: string
  palylistId: string
}

export const useFetchComments = (palylistId: string) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', palylistId],
    queryFn: async () => {
      const db = getFirestore()
      const coll = collection(db, 'Comments')
      const querySnapshot = await getDocs(
        query(coll, where('palylistId', '==', palylistId))
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
