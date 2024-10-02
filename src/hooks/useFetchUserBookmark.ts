// order 값을 추가한 코드
import { useQuery } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'

export const useFetchUserBookmark = () => {
  const user = auth.currentUser // 현재 로그인한 사용자 가져오기

  return useQuery({
    queryKey: ['userBookmarks', user?.uid],
    queryFn: async () => {
      if (!user) {
        return new Map()
      }

      const db = getFirestore()
      const coll = collection(db, 'Bookmarks')
      const bookmarksQuery = query(coll, where('user', '==', user.uid))
      const querySnapshot = await getDocs(bookmarksQuery)

      // Map을 생성하여 playlistId를 키로, bookmarkTimestamp를 값으로 저장
      const bookmarkMap = new Map()
      querySnapshot.docs.forEach(doc => {
        const data = doc.data()
        bookmarkMap.set(data.playlistId, {
          createdAt: data.createdAt,
          order: data.order // order 값도 저장
        })
      })
      return bookmarkMap
    },
    enabled: !!user // 로그인 상태일 때만 쿼리 실행
  })
}
