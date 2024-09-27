import { useEffect, useState } from 'react'
import { fetchPlaylists } from '../api/playlistApi'

interface Playlist {
  id: string
  title: string
  isPublic: boolean
}

export const useInfiniteScroll = (isPublic: boolean) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [lastVisible, setLastVisible] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [totalFetched, setTotalFetched] = useState(0)

  const MAX_PLAYLISTS = 100

  const loadPlaylists = async () => {
    if (totalFetched >= MAX_PLAYLISTS) return

    setLoading(true)
    const { newPlaylists, lastVisible: newLastVisible } = await fetchPlaylists(
      lastVisible,
      isPublic
    )

    const filteredPlaylists = newPlaylists.filter(playlist => playlist.isPublic)

    setPlaylists(prevPlaylists => [...prevPlaylists, ...filteredPlaylists])
    setLastVisible(newLastVisible)
    setTotalFetched(prevCount => prevCount + newPlaylists.length)
    setLoading(false)
  }

  useEffect(() => {
    loadPlaylists()

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !loading &&
        totalFetched < MAX_PLAYLISTS
      ) {
        loadPlaylists()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastVisible, loading, totalFetched])

  return { playlists, loading }
}
