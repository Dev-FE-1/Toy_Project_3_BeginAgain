import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useHeaderStore } from '@/stores/header'
import { useEffect } from 'react'
import { auth } from '@/api/firebaseApp'
import SavedPlaylists from '@/routes/pages/SavedPlaylists'
import { css } from '@emotion/react'

const MyPlaylist = () => {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('My Playlist')
  }, [setTitle])

  const { data } = useFetchPlaylists()
  const user = auth.currentUser

  // 현재 사용자와 일치하는 플레이리스트 필터링
  const filteredPlaylists = data?.filter(pl => pl.userId === user?.uid)

  return (
    <>
      <main>
        <div css={categoryMarginStyle}>
          <Category />
        </div>
        {filteredPlaylists && filteredPlaylists.length > 0 ? (
          filteredPlaylists.map(pl => (
            <SavedPlaylists
              key={pl.id}
              playlist={pl}
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

const categoryMarginStyle = css`
  margin-bottom: 20px;
`

export default MyPlaylist
