import { create } from 'zustand'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

interface PlaylistState {
  videoUrls: string[]
  videoTitle: string
  videoDescription: string
  isPublic: boolean
  isDone: boolean
  setIsDone: (value: boolean) => void
  setPlaylistData: (urls: string[], title: string, description: string, isPublic: boolean) => void
  savePlaylist: () => Promise<void>
}

export const useAddPlaylistStore = create<PlaylistState>((set, get) => ({
  videoUrls: [],
  videoTitle: '',
  videoDescription: '',
  isPublic: true,
  isDone: false,

  setIsDone: (value) => set({ isDone: value }),

  setPlaylistData: (urls, title, description, isPublic) => {
    set({
      videoUrls: urls,
      videoTitle: title,
      videoDescription: description,
      isPublic,
    })
  },

  savePlaylist: async () => {
    const { videoUrls, videoTitle, videoDescription, isPublic } = get();
    const auth = getAuth()
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
      userId: user.uid,
      createdAt: new Date().toISOString(),
    })
  },
}))
