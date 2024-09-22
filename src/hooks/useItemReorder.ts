// src/hooks/useItemRerder.ts

import { useEffect, useRef, useState } from 'react'
import Sortable from 'sortablejs'
import { db } from '@/api/firebaseApp' // Firestore 초기화 파일 경로에 맞게 수정
import { doc, updateDoc } from 'firebase/firestore'

interface UseItemRerderProps {
  playlistId: string
  urls: string[]
  setUrls: (urls: string[]) => void
}

export function useItemRerder({
  playlistId,
  urls,
  setUrls
}: UseItemRerderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [error, setError] = useState<string | null>(null) // 에러 상태 추가

  useEffect(() => {
    if (!containerRef.current) return

    const sortable = new Sortable(containerRef.current, {
      handle: '.drag-handle',
      animation: 150,
      onEnd: async event => {
        const { oldIndex, newIndex } = event
        if (oldIndex === undefined || newIndex === undefined) return

        // 순서 변경
        const updatedUrls = [...urls]
        const [movedItem] = updatedUrls.splice(oldIndex, 1)
        updatedUrls.splice(newIndex, 0, movedItem)

        // 상태 업데이트
        setUrls(updatedUrls)

        // Firestore 업데이트
        try {
          const playlistDocRef = doc(db, 'playlists', playlistId)
          await updateDoc(playlistDocRef, {
            urls: updatedUrls
          })
          console.log('플레이리스트 순서가 성공적으로 업데이트되었습니다.')
        } catch (error) {
          console.error('플레이리스트 순서 업데이트 중 오류 발생:', error)
          setError(
            '플레이리스트 순서를 업데이트하는 데 실패했습니다. 다시 시도해 주세요.'
          )

          // 롤백: 이전 상태로 되돌리기
          setUrls(urls)
        }
      }
    })

    return () => {
      sortable.destroy()
    }
  }, [playlistId, urls, setUrls])

  return { containerRef, error }
}
