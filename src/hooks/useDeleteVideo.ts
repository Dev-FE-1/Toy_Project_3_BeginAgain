import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getFirestore, doc, updateDoc, arrayRemove } from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'
import { useExtractVideoId } from '@/hooks/useExtractVideoId'
import Playlist from '@/components/playlist/Playlist'

export interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
}

export const useDeleteVideo = () => {
  const queryClient = useQueryClient()
  const { extractVideoId } = useExtractVideoId() // 추출 훅을 사용

  return useMutation({
    mutationFn: async ({
      playlist,
      videoUrl
    }: {
      playlist: Playlist
      videoUrl: string
    }) => {
      const db = getFirestore()
      const user = auth.currentUser
      const docRef = doc(db, 'Playlists', playlist.id)

      if (user && playlist.userId === user.uid) {
        const videoId = extractVideoId(videoUrl)
        if (!videoId) {
          throw new Error('비디오 ID를 추출할 수 없습니다.')
        }

        // 해당 비디오 URL이 있는지 확인 후 삭제
        const matchingUrl = playlist.urls.find(
          url => extractVideoId(url) === videoId
        )
        if (matchingUrl) {
          await updateDoc(docRef, {
            urls: arrayRemove(matchingUrl) // 배열에서 해당 URL 삭제
          })
        } else {
          throw new Error('해당 비디오를 찾을 수 없습니다.')
        }
      }
    },
    onSuccess: () => {
      // 전체 Playlists 컬렉션을 무효화하여 모든 플레이리스트 데이터를 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ['Playlists'] })
    },
    onError(error) {
      console.error('비디오 삭제 중 오류 발생:', error)
    }
  })
}
