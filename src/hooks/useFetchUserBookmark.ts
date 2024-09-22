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
        return []
      }

      const db = getFirestore()
      const coll = collection(db, 'Bookmarks')
      const bookmarksQuery = query(coll, where('user', '==', user.uid))
      const querySnapshot = await getDocs(bookmarksQuery)
      return querySnapshot.docs.map(doc => doc.data().playlistId) as string[]
    },

    enabled: !!user // 로그인 상태일 때만 쿼리 실행
  })
}
