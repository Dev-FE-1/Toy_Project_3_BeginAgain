import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import Playlist from '@/components/playlist/Playlist'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useHeaderStore } from '@/stores/header'
import { useEffect } from 'react'
import { auth } from '@/api/firebaseApp'
import { css } from '@emotion/react'
import { useBookmarkStore } from '@/stores/useBookmark'

const Bookmark = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { data: playlists } = useFetchPlaylists()
  const user = auth.currentUser

  const bookmarks = useBookmarkStore(state => state.bookmarks)

  useEffect(() => {
    setTitle('Bookmarks')
  }, [setTitle])

  const userBookmarks = user ? bookmarks[user.uid] || [] : []

  const filteredPlaylists = playlists?.filter(pl =>
    userBookmarks.includes(pl.id)
  )

  return (
    <main>
      <Category />
      {filteredPlaylists && filteredPlaylists.length > 0 ? (
        filteredPlaylists.map(pl => (
          <div key={pl.id}>
            <Playlist playlist={pl} />
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
