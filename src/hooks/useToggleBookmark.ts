// import { useState, useEffect } from 'react'
// import { auth } from '@/api/firebaseApp'
// import { useBookmarkStore } from '@/stores/useBookmark'

// export const useToggleBookmark = (playlistId?: string) => {
//   const [isBookmarked, setIsBookmarked] = useState(false)
//   const user = auth.currentUser
//   const addBookmark = useBookmarkStore(state => state.addBookmark)
//   const removeBookmark = useBookmarkStore(state => state.removeBookmark)

//   useEffect(() => {
//     if (!user || !playlistId) return

//     const userBookmarks = useBookmarkStore.getState().bookmarks[user.uid] || []
//     setIsBookmarked(userBookmarks.includes(playlistId))
//   }, [playlistId, user])

//   const toggleBookmark = () => {
//     if (!user || !playlistId) return
//     console.log('hello')
//     if (isBookmarked) {
//       removeBookmark(user.uid, playlistId)
//     } else {
//       addBookmark(user.uid, playlistId)
//     }

//     setIsBookmarked(prev => !prev) // 상태를 동기적으로 업데이트
//   }

//   return { isBookmarked, toggleBookmark }
// }

import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'
export const useToggleBookmark = (playlistId: string) => {
  const queryClient = useQueryClient()
  const user = auth.currentUser

  return useMutation({
    mutationFn: async (_isBookmarked: boolean) => {
      const isBookmarked = _isBookmarked
      const db = getFirestore()
      const coll = collection(db, 'Bookmarks')

      if (!user) return

      if (isBookmarked) {
        // 북마크 제거
        const bookmarksQuery = query(
          coll,
          where('playlistId', '==', playlistId),
          where('user', '==', user.uid)
        )
        const querySnapshot = await getDocs(bookmarksQuery)
        querySnapshot.forEach(async doc => {
          await deleteDoc(doc.ref)
        })
      } else {
        // 북마크 추가
        await addDoc(coll, {
          user: user.uid,
          playlistId,
          createdAt: new Date().toISOString()
        })
      }
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(['bookmarks', playlistId])
      queryClient.invalidateQueries({ queryKey: ['bookmarks', playlistId] })
    }
  })

  // return { mutate: toggleBookmark, isBookmarked }
}
