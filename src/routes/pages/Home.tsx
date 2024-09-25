import { Category } from '@/components/common/Category'
import Playlist, {
  Playlist as PlaylistType
} from '@/components/playlist/Playlist'
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Toast from '@/components/common/Toast'
import InfiniteScroll from '@/components/infiniteScroll/InfiniteScroll'

export default function Home() {
  const setTitle = useHeaderStore(state => state.setTitle)
  const location = useLocation()
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '전체'
  ])

  useEffect(() => {
    setTitle('Home')
  }, [setTitle])

  const { data } = useFetchPlaylists(false)

  const handlePlaylistClick = (playlist: PlaylistType) => {
    navigate(`/playlist/${playlist.id}`, { state: { playlist } })
  }

  useEffect(() => {
    if (location.state?.showToast) {
      setShowToast(true)

      setTimeout(() => {
        setShowToast(false)
        const newState = { ...location.state, showToast: false }
        window.history.replaceState(newState, document.title)
      }, 3000)
    }
  }, [location.state])

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setSelectedCategories(['전체'])
    }
  }, [selectedCategories])

  const filteredAndSortedData: PlaylistType[] | undefined = data
    ?.filter(
      (pl): pl is PlaylistType =>
        Array.isArray(pl.categories) &&
        selectedCategories.some(cat => pl.categories.includes(cat))
    )
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  return (
    <>
      <div className="nav-margin-top"></div>
      <Category
        selectedCategories={selectedCategories}
        onSelectCategory={setSelectedCategories}
      />
      {/* 
      {isLoading && <div>데이터 불러오기</div>} */}
      {filteredAndSortedData &&
        filteredAndSortedData.map(pl => (
          <Playlist
            key={pl.id}
            playlist={pl}
            onClick={() => handlePlaylistClick(pl)}
          />
        ))}
      {showToast && (
        <Toast
          message="플레이리스트에 추가 되었습니다!"
          isVisible={showToast}
          onHide={() => setShowToast(false)}
        />
      )}

      <div className="nav-margin-bottom"></div>
      <InfiniteScroll />
    </>
  )
}
