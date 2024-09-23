import { useEffect, useState } from 'react'
import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import BookmarkItem from '@/components/bookmarks/BookmarkItem'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useFetchUserBookmark } from '@/hooks/useFetchUserBookmark'
import { useHeaderStore } from '@/stores/header'
import { css } from '@emotion/react'

const Bookmark = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { data: playlists } = useFetchPlaylists()
  const { data: userBookmarks } = useFetchUserBookmark()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '전체'
  ])

  useEffect(() => {
    setTitle('북마크')
  }, [setTitle])

  // 선택된 카테고리가 없을 경우 '전체'로 설정
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setSelectedCategories(['전체'])
    }
  }, [selectedCategories])

  const filteredData =
    selectedCategories.length > 0
      ? playlists?.filter(
          pl =>
            Array.isArray(pl.categories) &&
            selectedCategories.some(cat => pl.categories.includes(cat))
        )
      : playlists

  // 북마크된 플레이리스트만 필터링
  const filteredPlaylists = filteredData?.filter(pl =>
    userBookmarks?.includes(pl.id)
  )

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
          <BookmarkItem
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
