import { useEffect, useState } from 'react'
import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import BookmarkList from '@/components/bookmarks/BookmarkList'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useFetchUserBookmark } from '@/hooks/useFetchUserBookmark'
import { useHeaderStore } from '@/stores/header'
import { css } from '@emotion/react'

const Bookmark = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { data: playlists, isLoading: playlistsLoading } = useFetchPlaylists()
  const { data: userBookmarks, isLoading: bookmarksLoading } =
    useFetchUserBookmark()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '전체'
  ])

  useEffect(() => {
    setTitle('Bookmarks')
  }, [setTitle])

  // 카테고리와 북마크를 기준으로 플레이리스트 필터링
  const filteredPlaylists = playlists?.filter(pl => {
    const isBookmarked = userBookmarks?.includes(pl.id)
    const matchesCategory =
      selectedCategories.includes('전체') ||
      (pl.categories &&
        selectedCategories.some(cat => pl.categories.includes(cat)))
    return isBookmarked && matchesCategory
  })

  // 로딩 상태 처리
  if (playlistsLoading || bookmarksLoading) {
    return <div>데이터를 가져오고 있는 중...</div>
  }

  return (
    <main>
      <div css={categoryMarginStyle}>
        <Category
          selectedCategories={selectedCategories}
          onSelectCategory={setSelectedCategories}
        />
      </div>
      {filteredPlaylists && filteredPlaylists.length > 0 ? (
        filteredPlaylists.map(pl => (
          <BookmarkList
            key={pl.id}
            playlist={pl}
          />
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
