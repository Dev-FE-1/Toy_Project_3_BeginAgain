import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import Playlist from '@/components/playlist/Playlist' // Playlist 컴포넌트를 가져옵니다.
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists' // 플레이리스트 데이터를 불러오는 훅
import { useHeaderStore } from '@/stores/header'
import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { css } from '@emotion/react'

const Bookmark = () => {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('북마크')
  }, [setTitle])

  const { data } = useFetchPlaylists()
  const auth = getAuth()
  const user = auth.currentUser

  // 현재 사용자와 일치하지 않는 플레이리스트 필터링
  const filteredPlaylists = data?.filter(pl => pl.userId !== user?.uid) // 올바른 연산자 사용

  return (
    <>
      <main>
        <Category />
        {filteredPlaylists && filteredPlaylists.length > 0 ? (
          filteredPlaylists.map(pl => (
            <div key={pl.id}>
              {' '}
              {/* key 속성은 최상위 div 요소에 위치해야 합니다 */}
              <Playlist palylist={pl} /> {/* Playlist 컴포넌트에 데이터 전달 */}
            </div>
          ))
        ) : (
          <div css={EmptyInfoStyle}>
            <EmptyInfo
              status="북마크된"
              title="플레이리스트"
            />
          </div>
        )}
        <div className="nav-margin"></div>
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

export default Bookmark
