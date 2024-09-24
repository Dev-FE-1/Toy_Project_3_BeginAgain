import { useQuery } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where
} from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'

export interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  categories: string[]
  userId: string
  createdAt: string
}

export const useFetchPlaylists = (myPlaylists: boolean = false) => {
  return useQuery<Playlist[]>({
    queryKey: ['playlists', myPlaylists ? auth.currentUser?.uid : 'public'],
    queryFn: async () => {
      const db = getFirestore()
      let querySnapshot

      if (myPlaylists) {
        const user = auth.currentUser
        if (!user) throw new Error('사용자가 인증되지 않았습니다.')

        const userPlaylistsQuery = query(
          collection(db, 'Playlists'),
          where('userId', '==', user.uid)
        )
        querySnapshot = (await getDocs(userPlaylistsQuery)).docs
      } else {
        const playlistsQuery = query(
          collection(db, 'Playlists'),
          where('isPublic', '==', true)
        )
        querySnapshot = (await getDocs(playlistsQuery)).docs
      }

      return querySnapshot.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Playlist[]
    }
  })
}
