import { useEffect, useState } from 'react'
import { fetchLikes, updateLikes } from '@/api/likes'
import { auth } from '@/api/firebaseApp'

export const useLikeData = (playlistId: string) => {
  const [isLikeFilled, setIsLikeFilled] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    const userId = auth.currentUser ? auth.currentUser.uid : null

    if (!userId) return

    const loadLikes = async () => {
      try {
        const data = await fetchLikes(playlistId)
        setLikeCount(data.likeCount || 0)
        setIsLikeFilled(!!data.userLikes[userId])
      } catch (error) {
        console.error('좋아요 불러오기 실패', error)
      }
    }

    loadLikes()
  }, [playlistId])

  const handleLikeClick = async () => {
    const userId = auth.currentUser ? auth.currentUser.uid : null

    if (!userId) return

    const newLikeFilled = !isLikeFilled
    setIsLikeFilled(newLikeFilled)

    const newCount = newLikeFilled ? likeCount + 1 : likeCount - 1
    setLikeCount(newCount)

    await updateLikes(playlistId, userId, newLikeFilled)
  }

  return {
    isLikeFilled,
    handleLikeClick,
    likeCount
  }
}
