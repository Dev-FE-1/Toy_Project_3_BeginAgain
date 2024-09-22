import { useState, useEffect } from 'react'
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'

export const useFetchUserBookmark = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const user = auth.currentUser

  useEffect(() => {
    if (!user) return

    const db = getFirestore()
    const coll = collection(db, 'Bookmarks')
    const bookmarksQuery = query(coll, where('user', '==', user.uid))

    // Firestore 실시간 리스너 설정
    const unsubscribe = onSnapshot(bookmarksQuery, snapshot => {
      const bookmarkIds = snapshot.docs.map(
        doc => doc.data().playlistId as string
      )
      setBookmarks(bookmarkIds) // 북마크 ID 배열을 상태로 업데이트
    })

    // 컴포넌트가 언마운트될 때 리스너 해제
    return () => unsubscribe()
  }, [user])

  return { data: bookmarks }
}
