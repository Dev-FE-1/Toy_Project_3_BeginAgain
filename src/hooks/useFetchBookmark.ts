// src/hooks/useFetchBookmark.ts
import { useQuery } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  DocumentData
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: Date // Date 타입으로 변환
}

export const useFetchBookmark = () => {
  const auth = getAuth()
  const user = auth.currentUser

  return useQuery<Playlist[]>({
    queryKey: ['bookmarks', user?.uid],
    queryFn: async (): Promise<Playlist[]> => {
      if (!user) throw new Error('User not logged in')

      const db = getFirestore()
      const coll = collection(db, 'Bookmarks')
      const querySnapshot = await getDocs(
        query(coll, where('userId', '==', user.uid))
      )

      return querySnapshot.docs.map(doc => {
        const data = doc.data() as DocumentData
        return {
          id: doc.id,
          urls: data.urls,
          title: data.title,
          description: data.description,
          isPublic: data.isPublic,
          userId: data.userId,
          createdAt: data.createdAt.toDate() // Timestamp를 Date로 변환
        }
      })
    },
    enabled: !!user // user가 존재할 때만 쿼리 실행
  })
}
