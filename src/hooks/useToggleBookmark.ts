// src/hooks/useToggleBookmark.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  serverTimestamp
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
}

export const useToggleBookmark = () => {
  const queryClient = useQueryClient()
  const db = getFirestore()

  return useMutation<void, Error, Playlist>({
    mutationFn: async (playlist: Playlist) => {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) throw new Error('User not logged in')

      const bookmarkRef = doc(db, 'Bookmarks', `${user.uid}_${playlist.id}`)
      const docSnapshot = await getDoc(bookmarkRef)

      if (docSnapshot.exists()) {
        // 북마크 삭제
        await deleteDoc(bookmarkRef)
      } else {
        // 북마크 추가
        await setDoc(bookmarkRef, {
          id: playlist.id,
          userId: user.uid,
          title: playlist.title,
          createdAt: serverTimestamp(), // 서버 시간으로 기록
          isPublic: playlist.isPublic,
          urls: playlist.urls
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
    }
  })
}
