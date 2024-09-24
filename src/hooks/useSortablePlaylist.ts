import { useEffect, useRef } from 'react'
import Sortable from 'sortablejs'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'

export function useSortablePlaylist(
  playlistData: any,
  setPlaylistData: React.Dispatch<React.SetStateAction<any>>,
  setCurrentVideoUrl: React.Dispatch<React.SetStateAction<string>>,
  id: string | undefined,
  isOwner: boolean
) {
  const db = getFirestore()
  const itemRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!itemRef.current || !playlistData || !playlistData.urls || !isOwner)
      return

    const sortable = new Sortable(itemRef.current, {
      handle: '.drag-handle',
      animation: 150,
      onEnd: async event => {
        if (event.oldIndex === undefined || event.newIndex === undefined) return

        const newUrls: string[] = Array.from(playlistData.urls)
        const [movedItem] = newUrls.splice(event.oldIndex, 1)
        newUrls.splice(event.newIndex, 0, movedItem)

        if (id) {
          const playlistRef = doc(db, 'Playlists', id)
          await updateDoc(playlistRef, { urls: newUrls })
          setPlaylistData({ ...playlistData, urls: newUrls })
        }

        setCurrentVideoUrl(newUrls[0] as string)
      }
    })

    return () => {
      sortable.destroy()
    }
  }, [playlistData, id, isOwner, setCurrentVideoUrl, setPlaylistData])

  return itemRef
}
