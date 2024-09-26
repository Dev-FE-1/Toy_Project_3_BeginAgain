import { useEffect, useRef, useState } from 'react'
import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import BookmarkItem from '@/components/bookmarks/BookmarkItem'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useFetchUserBookmark } from '@/hooks/useFetchUserBookmark'
import { useHeaderStore } from '@/stores/header'
import { css } from '@emotion/react'
import Sortable from 'sortablejs'
import Toast from '@/components/common/Toast'

const Bookmark = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { data: Playlists } = useFetchPlaylists()
  const { data: bookmarkMap } = useFetchUserBookmark()
  const ItemRef = useRef<HTMLDivElement | null>(null)

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '전체'
  ])
  const [isToastVisible, setIsToastVisible] = useState(false)

  useEffect(() => {
    setTitle('북마크')
  }, [setTitle])

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

  // playlistId와 bookmarkTimestamp를 이용하여 북마크 시점으로 최신 정렬
  const filteredPlaylists = filteredData
    ?.filter(pl => bookmarkMap?.has(pl.id))
    ?.sort((a, b) => {
      const bookmarkA = bookmarkMap?.get(a.id)?.createdAt
      const bookmarkB = bookmarkMap?.get(b.id)?.createdAt

      console.log('bookmarkA Timestamp:', bookmarkA, 'for playlist ID:', a.id)
      console.log('bookmarkB Timestamp:', bookmarkB, 'for playlist ID:', b.id)

      return new Date(bookmarkB).getTime() - new Date(bookmarkA).getTime()
    })

  // 드래그 앤 드롭 기능 (파베 연동 안돼!!!!!!!!)
  // useEffect(() => {
  //   if (!ItemRef.current) return
  //   const sortable = new Sortable(ItemRef.current, {
  //     handle: '.handle',
  //     animation: 150,
  //     forceFallback: false,
  //     onEnd: async event => {
  //       if (event.oldIndex === undefined || event.newIndex === undefined) return
  //     }
  //   })

  //   return () => {
  //     sortable.destroy()
  //   }
  // }, [filteredPlaylists])

  // 드래그 앤 드롭 기능 (파베 연동 안돼!!!!!!!!_ ORDER 값으로 해보기 ,,안돼)
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
