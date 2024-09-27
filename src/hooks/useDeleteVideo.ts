import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getFirestore, doc, updateDoc, arrayRemove } from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'
import { useExtractVideoId } from '@/hooks/useExtractVideoId'

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
          console.log(`비디오 ${matchingUrl}가 성공적으로 삭제되었습니다.`)
        } else {
          throw new Error('해당 비디오를 찾을 수 없습니다.')
        }
      }
    },
    onSuccess: (_, { playlist }) => {
      // 해당 플레이리스트 데이터 무효화
      queryClient.invalidateQueries({ queryKey: ['Playlist', playlist.id] })
      console.log('삭제 후 최신 데이터를 가져옵니다.')
    },
    onError(error) {
      console.error('비디오 삭제 중 오류 발생:', error)
    }
  })
}
