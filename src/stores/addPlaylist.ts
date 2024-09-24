import { create } from 'zustand'
import { auth } from '@/api/firebaseApp'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

interface PlaylistState {
  videoUrls: string[]
  videoTitle: string
  videoDescription: string
  isPublic: boolean
  isDone: boolean
  selectedCategories: string[]
  setIsDone: (value: boolean) => void
  setPlaylistData: (
    urls: string[],
    title: string,
    description: string,
    isPublic: boolean,
    categories: string[]
  ) => void
  savePlaylist: () => Promise<void>
}

export const useAddPlaylistStore = create<PlaylistState>((set, get) => ({
  videoUrls: [],
  videoTitle: '',
  videoDescription: '',
  isPublic: true,
  isDone: false,
  selectedCategories: [],

  setIsDone: value => set({ isDone: value }),

  setPlaylistData: (urls, title, description, isPublic, categories) => {
    set({
      videoUrls: urls,
      videoTitle: title,
      videoDescription: description,
      isPublic,
      selectedCategories: categories,
    })
  },

  savePlaylist: async () => {
    const { videoUrls, videoTitle, videoDescription, isPublic, selectedCategories } = get()
    const db = getFirestore()
    const user = auth.currentUser

    if (!user) {
      throw new Error('사용자가 인증되지 않았습니다.')
    }

    const coll = collection(db, 'Playlists')

    await addDoc(coll, {
      urls: videoUrls,
      title: videoTitle,
      description: videoDescription,
      isPublic,
      categories: selectedCategories,
      userId: user.uid,
      createdAt: new Date().toISOString()
    })
  }
}))
