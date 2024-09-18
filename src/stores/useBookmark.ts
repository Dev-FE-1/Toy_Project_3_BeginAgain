import { create } from 'zustand'

interface BookmarkStore {
  bookmarks: { [key: string]: string[] } // 사용자 별로 북마크 목록을 관리
  addBookmark: (userId: string, playlistId: string) => void
  removeBookmark: (userId: string, playlistId: string) => void
}

export const useBookmarkStore = create<BookmarkStore>(set => ({
  bookmarks: {},
  addBookmark: (userId, playlistId) =>
    set(state => ({
      bookmarks: {
        ...state.bookmarks,
        [userId]: [...(state.bookmarks[userId] || []), playlistId]
      }
    })),
  removeBookmark: (userId, playlistId) =>
    set(state => ({
      bookmarks: {
        ...state.bookmarks,
        [userId]: state.bookmarks[userId]?.filter(id => id !== playlistId)
      }
    }))
}))
