import { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export function usePlaylistData(id: string | undefined) {
  const [playlistData, setPlaylistData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const db = getFirestore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistDocRef = doc(db, 'Playlists', id!)
        const publicPlaylistDocRef = doc(db, 'PublicPlaylists', id!)

        const [playlistSnap, publicPlaylistSnap] = await Promise.all([
          getDoc(playlistDocRef),
          getDoc(publicPlaylistDocRef)
        ])

        if (playlistSnap.exists()) {
          setPlaylistData({ id: playlistSnap.id, ...playlistSnap.data() })
        } else if (publicPlaylistSnap.exists()) {
          setPlaylistData({
            id: publicPlaylistSnap.id,
            ...publicPlaylistSnap.data()
          })
        } else {
          console.log('No matching documents found in either collection.')
        }
      } catch (error) {
        console.error('Error fetching playlist data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, db])

  return { playlistData, isLoading }
}
