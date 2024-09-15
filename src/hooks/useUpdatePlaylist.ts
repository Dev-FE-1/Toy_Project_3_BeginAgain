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

export const useUpdatePlaylist = () => {
  return useMutation({
    mutationFn: async (feed: PlayList) => {
      const db = getFirestore()
      const auth = getAuth()
      const user = auth.currentUser
      const coll = collection(db, 'PlayLists')
      const docRef = doc(coll, feed.id)
      if (user && feed.userId === user.uid) {
        await updateDoc(docRef, {
          title: '박영웅'
        })
      }
    }
  })
}
