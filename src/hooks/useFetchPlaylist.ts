// GET - useQuery
// POST, PUT, PATCH, DELETE - useMutation

import { useQuery } from '@tanstack/react-query'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'

export interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: Date | string | undefined
}

export const useFetchPlaylist = (id: string) => {
  return useQuery<Playlist>({
    queryKey: ['playlists', id],
    queryFn: async () => {
      const db = getFirestore()
      const coll = collection(db, 'Playlists')
      const docRef = doc(coll, id)
      const docSnap = await getDoc(docRef)
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Playlist
    }
  })
}
