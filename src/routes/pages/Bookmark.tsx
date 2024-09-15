import { useEffect } from 'react'
import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import { useHeaderStore } from '@/stores/header'
import Playlist from '@/components/playlist/Playlist'
import { useFetchBookmark } from '@/hooks/useFetchBookmark'
import { useLocation } from 'react-router-dom'

interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
}

export default function Bookmark() {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { data: bookmarks, isLoading } = useFetchBookmark()

  // URL과 제목을 받아오기 위한 useLocation 추가
  const location = useLocation()
  const { videoId, title } = location.state || {}

  useEffect(() => {
    setTitle('Bookmark')
  }, [setTitle])

  if (isLoading) {
    return <div>데이터를 불러오는 중...</div>
  }

  return (
    <main>
      <Category />

      {/* 전달된 videoId와 title이 있을 경우 화면에 표시 */}
      {videoId && title && (
        <div>
          <h3>{title}</h3>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer">
            {`https://www.youtube.com/watch?v=${videoId}`}
          </a>
        </div>
      )}

      {/* 북마크된 플레이리스트가 없을 경우 */}
      {bookmarks && bookmarks.length === 0 ? (
        <EmptyInfo
          status="북마크된"
          title="플레이리스트"
        />
      ) : (
        bookmarks &&
        bookmarks.map(playlist => (
          <Playlist
            key={playlist.id}
            palylist={{
              ...playlist,
              createdAt: playlist.createdAt.toLocaleDateString() // 날짜를 문자열로 변환해 표시
            }}
          />
        ))
      )}
    </main>
  )
}
