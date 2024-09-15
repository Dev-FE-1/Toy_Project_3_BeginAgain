// GET - useQuery
// POST, PUT, PATCH, DELETE - useMutation

import { useMutation } from '@tanstack/react-query'
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

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
    mutationFn: async (palylist: Playlist) => {
      const db = getFirestore()
      const auth = getAuth()
      const user = auth.currentUser
      const coll = collection(db, 'Playlists')
      const docRef = doc(coll, palylist.id)
      if (user && palylist.userId === user.uid) {
        await deleteDoc(docRef)
      }
    }
  })
}
