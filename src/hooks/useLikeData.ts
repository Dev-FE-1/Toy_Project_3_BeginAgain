import { useEffect, useState } from 'react'
import { fetchLikes, updateLikes } from '@/api/likes'

export const useLikeData = (playlistId: string, userId: string) => {
  const [isLikeFilled, setIsLikeFilled] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const loadLikes = async () => {
      try {
        const data = await fetchLikes(playlistId)
        setLikeCount(data.likeCount || 0)
        setIsLikeFilled(!!data.userLikes[userId])
      } catch (error) {
        console.error('좋아요 실패', error)
      }
    }

    loadLikes()
  }, [playlistId, userId])

  const handleLikeClick = async () => {
    const newLikeFilled = !isLikeFilled
    setIsLikeFilled(newLikeFilled)

    const newCount = newLikeFilled ? 1 : 0
    setLikeCount(newCount)
    await updateLikes(playlistId, userId, newLikeFilled)
  }

  return {
    isLikeFilled,
    handleLikeClick,
    likeCount
  }
}
