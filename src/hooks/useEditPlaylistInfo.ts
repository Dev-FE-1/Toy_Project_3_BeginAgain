import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'

export interface Playlist {
  id: string
  title: string
  description: string
  isPublic: boolean
  categories: string[]
  userId: string
  createdAt: string
}

export const useEditPlaylistInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (playlist: Playlist) => {
      const db = getFirestore() // Firestore 인스턴스 가져오기
      const user = auth.currentUser // 현재 로그인한 사용자 정보 가져오기

      // Firestore 컬렉션 참조
      const coll = collection(db, 'Playlists')
      const docRef = doc(coll, playlist.id) // 수정할 문서 참조
      console.log(playlist)
      // 현재 로그인한 사용자가 플레이리스트의 소유자일 때만 업데이트 수행
      if (user && playlist.userId === user.uid) {
        await updateDoc(docRef, {
          title: playlist.title,
          description: playlist.description,
          isPublic: playlist.isPublic,
          categories: playlist.categories
        })
      } else {
        throw new Error("You don't have permission to edit this playlist.")
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] })
    }
  })
}
