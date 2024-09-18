import { useQuery } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'

interface BookmarkList {
  id: string
  user: string
  createdAt: string
  playlistId: string
}

export const useFetchBookmarkList = (userId: string) => {
  const user = auth.currentUser // 현재 로그인한 사용자 가져오기

  return useQuery<BookmarkList[]>({
    queryKey: ['Bookmarks', userId],
    queryFn: async () => {
      if (!user) {
        // 사용자가 로그인하지 않은 경우 빈 배열을 반환
        return []
      }

      const db = getFirestore()
      const coll = collection(db, 'Bookmarks')
      // 현재 사용자의 북마크만 가져오기
      const BookmarkListQuery = query(coll, where('user', '==', user.uid))
      const querySnapshot = await getDocs(BookmarkListQuery)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BookmarkList[]
    },
    select(data) {
      return data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) // createdAt 기준으로 정렬
    }
  })
}
