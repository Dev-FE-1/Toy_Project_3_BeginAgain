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
  playlistid: string
  userId: string
}

export const useFetchComments = (playlistid: string) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', playlistid],
    queryFn: async () => {
      const db = getFirestore()
      const coll = collection(db, 'Comments')
      console.log('playlistid::', playlistid)
      const querySnapshot = await getDocs(
        query(coll, where('playlistId', '==', playlistid))
      )
      return querySnapshot.docs.map(doc => {
        console.log(doc)
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as Comment[]
    },
    select(data) {
      console.log('select::', data)
      return data.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    }
  })
}
