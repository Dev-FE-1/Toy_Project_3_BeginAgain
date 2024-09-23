import { useEffect, useState } from 'react'
import { useFetchComments } from '@/hooks/useFetchComments'
import { useFetchUserData } from '@/hooks/useFetchUser'
import { useFetchBookmarks } from '@/hooks/useFetchBookmark'
import { useToggleBookmark } from '@/hooks/useToggleBookmark'
import { Playlist } from '@/components/playlist/Playlist'

export const usePlaylistData = (playlist?: Playlist) => {
  const [commentCount, setCommentCount] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isToastVisible, setIsToastVisible] = useState(false)

  const comments = useFetchComments(playlist?.id || '')
  const userData = useFetchUserData(playlist?.userId)
  const { mutate: toggleBookmark } = useToggleBookmark(playlist?.id || '')
  const { data: BookmarkedData } = useFetchBookmarks(playlist?.id || '')

  useEffect(() => {
    if (comments) {
      setCommentCount(comments.length)
    }
  }, [comments])

  useEffect(() => {
    if (BookmarkedData) {
      setIsBookmarked(BookmarkedData.length > 0)
    } else {
      setIsBookmarked(false)
    }
  }, [BookmarkedData])

  const handleBookmark = () => {
    if (playlist && BookmarkedData !== undefined) {
      toggleBookmark(isBookmarked)
      setToastMessage(
        !isBookmarked ? '북마크가 추가되었습니다.' : '북마크가 해제되었습니다.'
      )
      setIsToastVisible(true)
    }
  }

  const hideToast = () => {
    setIsToastVisible(false)
  }

  return {
    commentCount,
    userData,
    isBookmarked,
    handleBookmark,
    toastMessage,
    isToastVisible,
    hideToast
  }
}
