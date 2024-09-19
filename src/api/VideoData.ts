import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/api/firebaseApp'

export async function updateVideoUrl(playlistId: string, newVideoUrl: string) {
  const playlistRef = doc(db, 'playlists', playlistId)
  await updateDoc(playlistRef, {
    playlist: newVideoUrl
  })
}
