// GET - useQuery
// POST, PUT, PATCH, DELETE - useMutation

import { useQuery, useMutation } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export interface PlayList {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
}

export const useFetchPlaylist = (id: string) => {
  return useQuery<PlayList>({
    queryKey: ['playlists', id],
    queryFn: async () => {
      const db = getFirestore()
      const coll = collection(db, 'PlayLists')
      const docRef = doc(coll, id)
      const docSnap = await getDoc(docRef)
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as PlayList
    }
  })
}
