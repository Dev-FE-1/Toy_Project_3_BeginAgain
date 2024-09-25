import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useHeaderStore } from '@/stores/header'
import { useState, useEffect } from 'react'
import { auth } from '@/api/firebaseApp'
import SavedPlaylists from '@/routes/pages/SavedPlaylists'
import { css } from '@emotion/react'
import Toast from '@/components/common/Toast'

const MyPlaylist = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const [isToastVisible, setIsToastVisible] = useState(false)

  useEffect(() => {
    setTitle('플레이리스트')
  }, [setTitle])

  const { data } = useFetchPlaylists(true)
  const user = auth.currentUser

  const filteredPlaylists = data
    ?.filter(pl => pl.userId === user?.uid)
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
          <Category />
        </div>
        {filteredPlaylists && filteredPlaylists.length > 0 ? (
          filteredPlaylists.map(pl => (
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
