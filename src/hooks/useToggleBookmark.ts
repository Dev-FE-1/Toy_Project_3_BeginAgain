// import { useState, useEffect } from 'react'
// import { getAuth } from 'firebase/auth'

// // 북마크 참조용으로 사용되는 전역 상태 혹은 저장소
// const bookmarkRefs: { [key: string]: string[] } = {}

// export const useToggleBookmark = (playlistId: string) => {
//   const [isBookmarked, setIsBookmarked] = useState(false)
//   const auth = getAuth()
//   const user = auth.currentUser

//   useEffect(() => {
//     if (!user) return

//     // 북마크 참조에서 현재 사용자의 북마크 목록을 확인
//     const userBookmarks = bookmarkRefs[user.uid] || []
//     setIsBookmarked(userBookmarks.includes(playlistId))
//   }, [playlistId, user])

//   const toggleBookmark = () => {
//     if (!user) return

//     // 현재 사용자의 북마크 목록을 불러옴
//     const userBookmarks = bookmarkRefs[user.uid] || []
//     let updatedBookmarks

//     if (isBookmarked) {
//       // 이미 북마크된 경우 -> 북마크 해제
//       updatedBookmarks = userBookmarks.filter(id => id !== playlistId)
//     } else {
//       // 북마크되지 않은 경우 -> 북마크 추가
//       updatedBookmarks = [...userBookmarks, playlistId]
//     }

//     // 북마크 참조를 업데이트
//     bookmarkRefs[user.uid] = updatedBookmarks
//     setIsBookmarked(!isBookmarked)
//   }

//   return { isBookmarked, toggleBookmark }
// }

import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useBookmarkStore } from '@/stores/useBookmarkStore'

export const useToggleBookmark = (playlistId: string) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const auth = getAuth()
  const user = auth.currentUser
  const addBookmark = useBookmarkStore(state => state.addBookmark)
  const removeBookmark = useBookmarkStore(state => state.removeBookmark)

  useEffect(() => {
    if (!user) return

    const userBookmarks = useBookmarkStore.getState().bookmarks[user.uid] || []
    setIsBookmarked(userBookmarks.includes(playlistId))
  }, [playlistId, user])

  const toggleBookmark = () => {
    if (!user) return

    if (isBookmarked) {
      removeBookmark(user.uid, playlistId)
    } else {
      addBookmark(user.uid, playlistId)
    }
    setIsBookmarked(!isBookmarked)
  }

  return { isBookmarked, toggleBookmark }
}
