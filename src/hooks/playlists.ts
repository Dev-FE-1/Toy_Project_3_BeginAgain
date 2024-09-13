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

export const useUpdatePlayList = () => {
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

export const useDeletePlayList = () => {
  return useMutation({
    mutationFn: async (feed: PlayList) => {
      const db = getFirestore()
      const auth = getAuth()
      const user = auth.currentUser
      const coll = collection(db, 'PlayLists')
      const docRef = doc(coll, feed.id)
      if (user && feed.userId === user.uid) {
        await deleteDoc(docRef)
      }
    }
  })
}
