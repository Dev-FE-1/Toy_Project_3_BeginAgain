import create from 'zustand'

interface BookmarkItem {
  id: string
  imageUrl: string
  title: string
}

interface BookmarkState {
  bookmarks: BookmarkItem[]
  addBookmark: (item: BookmarkItem) => void
  removeBookmark: (id: string) => void
}

export const useBookmarkStore = create<BookmarkState>(set => ({
  bookmarks: [],
  addBookmark: item =>
    set(state => ({
      bookmarks: [...state.bookmarks, item]
    })),
  removeBookmark: id =>
    set(state => ({
      bookmarks: state.bookmarks.filter(item => item.id !== id)
    }))
}))
