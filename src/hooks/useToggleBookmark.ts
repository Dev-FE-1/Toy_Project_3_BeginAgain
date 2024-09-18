import { useState, useEffect } from 'react'
import { auth } from '@/api/firebaseApp'
import { useBookmarkStore } from '@/stores/useBookmark'

export const useToggleBookmark = (playlistId?: string) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const user = auth.currentUser
  const addBookmark = useBookmarkStore(state => state.addBookmark)
  const removeBookmark = useBookmarkStore(state => state.removeBookmark)

  useEffect(() => {
    if (!user || !playlistId) return

    const userBookmarks = useBookmarkStore.getState().bookmarks[user.uid] || []
    setIsBookmarked(userBookmarks.includes(playlistId))
  }, [playlistId, user])

  const toggleBookmark = () => {
    if (!user || !playlistId) return

    if (isBookmarked) {
      removeBookmark(user.uid, playlistId)
    } else {
      addBookmark(user.uid, playlistId)
    }

    setIsBookmarked(prev => !prev) // 상태를 동기적으로 업데이트
  }

  return { isBookmarked, toggleBookmark }
}
