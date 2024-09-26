import { useEffect, useRef, useState } from 'react'
import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import BookmarkItem from '@/components/bookmarks/BookmarkItem'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useFetchUserBookmark } from '@/hooks/useFetchUserBookmark' // 북마크 훅 임포트
import { useHeaderStore } from '@/stores/header'
import { css } from '@emotion/react'
import Sortable from 'sortablejs'
import Toast from '@/components/common/Toast'

const Bookmark = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { data: Playlists } = useFetchPlaylists()
  const { data: bookmarkMap } = useFetchUserBookmark() // useFetchUserBookmark에서 가져온 데이터는 이제 Map입니다
  const ItemRef = useRef<HTMLDivElement | null>(null)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '전체'
  ])
  const [isToastVisible, setIsToastVisible] = useState(false)

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
      ? Playlists?.filter(
          pl =>
            Array.isArray(pl.categories) &&
            selectedCategories.some(cat => pl.categories.includes(cat))
        )
      : Playlists

  const filteredPlaylists = filteredData
    ?.filter(pl => bookmarkMap?.has(pl.id))
    ?.sort((a, b) => {
      const bookmarkATimestamp = bookmarkMap?.get(a.id)
      const bookmarkBTimestamp = bookmarkMap?.get(b.id)

      console.log(
        'bookmarkA Timestamp:',
        bookmarkATimestamp,
        'for playlist ID:',
        a.id
      )
      console.log(
        'bookmarkB Timestamp:',
        bookmarkBTimestamp,
        'for playlist ID:',
        b.id
      )

      return (
        new Date(bookmarkBTimestamp).getTime() -
        new Date(bookmarkATimestamp).getTime()
      )
    })

  useEffect(() => {
    if (!ItemRef.current) return
    new Sortable(ItemRef.current, {
      handle: '.handle',
      animation: 0,
      forceFallback: false,
      onEnd: event => {
        console.log(event.oldIndex, event.newIndex)
        if (event.oldIndex === undefined || event.newIndex === undefined) return
        console.log('>>> filteredPlaylists', filteredPlaylists)
        // reorderTodos({
        //   oldIndex: event.oldIndex,
        //   newIndex: event.newIndex
        // })
      }
    })
  }, [filteredPlaylists])

  const handleBookmarkToggle = () => {
    setIsToastVisible(true)
  }

  return (
    <>
      <div className="nav-margin-top"></div>
      <div css={categoryMarginStyle}>
        <Category
          selectedCategories={selectedCategories}
          onSelectCategory={setSelectedCategories}
        />
      </div>
      {filteredPlaylists && filteredPlaylists.length > 0 ? (
        <div ref={ItemRef}>
          {filteredPlaylists.map(pl => (
            <BookmarkItem
              key={pl.id}
              playlist={pl}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      ) : (
        <div css={EmptyInfoStyle}>
          <EmptyInfo
            status="북마크"
            title="플레이리스트"
          />
        </div>
      )}
      <Toast
        message="북마크가 해제되었습니다"
        isVisible={isToastVisible}
        onHide={() => setIsToastVisible(false)}
      />
      <div className="nav-margin-bottom"></div>
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

export default Bookmark
