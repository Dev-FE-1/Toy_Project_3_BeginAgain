import React, { useState } from 'react'
import { CgBookmark } from 'react-icons/cg'
import { useBookmarkStore } from '@/stores/bookmark'

interface BookmarkButtonProps {
  item: {
    id: string
    imageUrl: string
    title: string
  }
}

const BookmarkButton = ({ item }: BookmarkButtonProps) => {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore()
  const [isBookmarked, setIsBookmarked] = useState(
    bookmarks.some(bookmark => bookmark.id === item.id)
  )

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(item.id)
    } else {
      addBookmark(item)
    }
    setIsBookmarked(!isBookmarked)
  }

  return (
    <button onClick={toggleBookmark}>
      <CgBookmark color={isBookmarked ? 'blue' : 'grey'} />
    </button>
  )
}

export default BookmarkButton
