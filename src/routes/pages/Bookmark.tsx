import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useFetchUserBookmark } from '@/hooks/useFetchUserBookmark'
import { useHeaderStore } from '@/stores/header'
import { useEffect } from 'react'
import { css } from '@emotion/react'
import BookmarkList from '@/components/bookmarks/BookmarkList'

const Bookmark = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { data: playlists } = useFetchPlaylists()
  const { data: userBookmarks } = useFetchUserBookmark()

  useEffect(() => {
    setTitle('Bookmarks')
  }, [setTitle])

  const filteredPlaylists = playlists?.filter(pl =>
    userBookmarks?.includes(pl.id)
  )

  return (
    <main>
      <div css={categoryMarginStyle}>
        <Category />
      </div>
      {filteredPlaylists && filteredPlaylists.length > 0 ? (
        filteredPlaylists.map(pl => (
          <BookmarkList
            key={pl.id}
            playlist={pl}
          />
          // <>qqq</>
        ))
      ) : (
        <div css={EmptyInfoStyle}>
          <EmptyInfo
            status="북마크"
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
const categoryMarginStyle = css`
  margin-bottom: 20px;
`

export default Bookmark
