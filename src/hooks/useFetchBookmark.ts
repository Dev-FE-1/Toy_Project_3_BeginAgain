import { useQuery } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'

interface Bookmarks {
  id: string
  user: string
  createdAt: string
  playlistId: string
  categories: string[]
  order: number
}

export const useFetchBookmarks = (playlistId: string) => {
  const user = auth.currentUser // 현재 로그인한 사용자 가져오기

  return useQuery<Bookmarks[]>({
    queryKey: ['bookmarks', playlistId],
    queryFn: async () => {
      if (!user) {
        return []
      }

      const db = getFirestore()
      const coll = collection(db, 'Bookmarks')
      // 현재 사용자의 북마크만 가져오기
      const bookmarksQuery = query(
        coll,
        where('user', '==', user.uid),
        where('playlistId', '==', playlistId)
      )
      const querySnapshot = await getDocs(bookmarksQuery)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Bookmarks[]
    },
    select(data) {
      return data.sort((a, b) => a.order - b.order) // order 기준으로 정렬하도록 변경
    }
  })
}
