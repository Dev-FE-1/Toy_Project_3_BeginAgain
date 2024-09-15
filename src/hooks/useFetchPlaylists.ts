// GET - useQuery
// POST, PUT, PATCH, DELETE - useMutation

import { useQuery } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'

export interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
}

export const useFetchPlaylists = () => {
  return useQuery<Playlist[]>({
    queryKey: ['playlists'],
    queryFn: async () => {
      const db = getFirestore()
      const coll = collection(db, 'Playlists')
      const querySnapshot = await getDocs(
        query(coll, where('isPublic', '==', true))
      )
      return querySnapshot.docs.map(doc => {
        console.log(doc.data())
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as Playlist[]
    }
  })
}
