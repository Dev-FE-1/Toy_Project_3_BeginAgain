import { useState, useEffect } from 'react'

export const useToggleBookmark = (playlistId: string) => {
  const [isBookmarked, setIsBookmarked] = useState(false)

  // 나중에 playlistId를 Firestore와 함께 사용
  useEffect(() => {
    // Firestore에서 playlistId를 사용하여 데이터를 가져오는 로직을 추가할 수 있습니다.
    console.log(playlistId) // 이 부분을 실제 로직으로 대체
  }, [playlistId])

  const toggleBookmark = () => {
    setIsBookmarked(prevState => !prevState)
  }

  return { isBookmarked, toggleBookmark }
}
