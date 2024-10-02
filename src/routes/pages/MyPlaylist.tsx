import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useHeaderStore } from '@/stores/header'
import { useState, useEffect } from 'react'
import { auth } from '@/api/firebaseApp'
import SavedPlaylists from '@/routes/pages/SavedPlaylists'
import { css } from '@emotion/react'
import Toast from '@/components/common/Toast'
import { useLocation } from 'react-router-dom'
import { PlaylistType } from '@/components/playlist/Playlist';

const MyPlaylist = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['전체']) // 초기 상태 설정
  const location = useLocation()

  useEffect(() => {
    setTitle('플레이리스트')
  }, [setTitle])

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

  const { data } = useFetchPlaylists(true)
  const user = auth.currentUser

  const filteredPlaylists = data
    ?.filter(pl => pl.userId === user?.uid)
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setSelectedCategories(['전체'])
    }
  }, [selectedCategories])

  const filteredAndSortedData: PlaylistType[] | undefined = filteredPlaylists
    ?.filter(
      (pl): pl is PlaylistType =>
        selectedCategories.includes('전체') || 
        (Array.isArray(pl.categories) && selectedCategories.some(cat => pl.categories.includes(cat)))
    )
    ?.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  const handleDeleteToast = () => {
    setIsToastVisible(true)
  }

  return (
    <>
      <main>
        <div className="nav-margin-top"></div>
        <div css={categoryMarginStyle}>
          <Category
            selectedCategories={selectedCategories}
            onSelectCategory={setSelectedCategories}
          />
        </div>
        {filteredAndSortedData && filteredAndSortedData.length > 0 ? (
          filteredAndSortedData.map(pl => (
            <SavedPlaylists
              key={pl.id}
              playlist={pl}
              onDelete={handleDeleteToast}
            />
          ))
        ) : (
          <div css={EmptyInfoStyle}>
            <EmptyInfo
              status="생성"
              title="플레이리스트"
            />
          </div>
        )}
        <Toast
          message="플레이리스트가 삭제되었습니다."
          isVisible={isToastVisible}
          onHide={() => setIsToastVisible(false)}
        />

        {showToast && (
        <Toast
          message="플레이리스트에 추가 되었습니다!"
          isVisible={showToast}
          onHide={() => setShowToast(false)}
        />
        )}
        
        <div className="nav-margin-bottom"></div>
      </main>
    </>
  )
}

const EmptyInfoStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const categoryMarginStyle = css`
  margin-bottom: 20px;
`

export default MyPlaylist
