import { useQuery } from '@tanstack/react-query'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
  categories: string[]
}

export const useFetchPlaylistById = (playlistId: string) => {
  return useQuery<Playlist>({
    queryKey: ['Playlist', playlistId], // 특정 플레이리스트를 위한 쿼리 키
    queryFn: async () => {
      const db = getFirestore()
      const docRef = doc(db, 'Playlists', playlistId)
      const docSnap = await getDoc(docRef)

      if (!docSnap.exists()) {
        throw new Error('플레이리스트를 찾을 수 없습니다.')
      }

      // 데이터를 적절한 형식으로 반환
      const data = docSnap.data()
      return {
        id: docSnap.id,
        urls: data.urls,
        title: data.title,
        description: data.description,
        isPublic: data.isPublic,
        categories: data.categories,
        userId: data.userId,
        createdAt: data.createdAt
      } as Playlist
    },
    enabled: !!playlistId // playlistId가 있을 때만 쿼리 실행
  })
}
