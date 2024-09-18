import Category from '@/components/common/Category'
import Playlist from '@/components/playlist/Playlist'
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Toast from '@/components/common/Toast'

export default function Home() {
  const setTitle = useHeaderStore(state => state.setTitle)
  const location = useLocation()
  const [showToast, setShowToast] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setTitle('Home')
  }, [setTitle])

  const { data, isLoading } = useFetchPlaylists()

  const handlePlaylistClick = playlist => {
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

  return (
    <>
      <Category />
      {isLoading && <div>데이터를 가져오고 있는 중...</div>}
      {data &&
        data.map(pl => {
          return (
            <Playlist
              key={pl.id}
              playlist={pl}
              onClick={() => handlePlaylistClick(pl)} // 클릭 핸들러 추가
            />
          )
        })}
      {showToast && (
        <Toast
          message="플레이리스트에 추가 되었습니다!"
          isVisible={showToast}
          onHide={() => setShowToast(false)}
        />
      )}

      <div className="nav-margin"></div>
    </>
  )
}

// // 좋아요!
// await addDoc(coll, {
//   playlistId: '', // 참조(ref)
//   userId: user?.uid, // 참조
//   createdAt: new Date().toISOString()
// })

// //댓글
// await addDoc(coll, {
//   playlistId: '', // 참조(ref)
//   userId: user?.uid, // 참조
//   comment: '너무 좋은 플레이리스트에요. 감사합니다!'
//   createdAt: new Date().toISOString()
// })
