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

export const useFetchPlaylists = () => {
  return useQuery<PlayList[]>({
    queryKey: ['playlists'],
    queryFn: async () => {
      const db = getFirestore()
      const coll = collection(db, 'PlayLists')
      const querySnapshot = await getDocs(
        query(coll, where('isPublic', '==', true))
      )
      return querySnapshot.docs.map(doc => {
        console.log(doc.data())
        return {
          id: doc.id,
          ...doc.data()
        }
      }) as PlayList[]
    }
  })
}
