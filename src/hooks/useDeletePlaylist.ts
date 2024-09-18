// GET - useQuery
// POST, PUT, PATCH, DELETE - useMutation

import { useMutation } from '@tanstack/react-query'
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'

export interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
}

export const useDeletePlaylist = () => {
  return useMutation({
    mutationFn: async (playlist: Playlist) => {
      const db = getFirestore()
      const user = auth.currentUser
      const coll = collection(db, 'Playlists')
      const docRef = doc(coll, playlist.id)
      if (user && playlist.userId === user.uid) {
        await deleteDoc(docRef)
      }
    }
  })
}
