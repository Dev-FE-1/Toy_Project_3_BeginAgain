import { useEffect, useState } from 'react'
import { fetchPlaylists } from '../api/playlistApi'

export const useInfiniteScroll = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [lastVisible, setLastVisible] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const loadPlaylists = async () => {
    setLoading(true)
    const { newPlaylists, lastVisible: newLastVisible } =
      await fetchPlaylists(lastVisible)

    setPlaylists(prevPlaylists => [...prevPlaylists, ...newPlaylists])
    setLastVisible(newLastVisible)
    setLoading(false)
  }

  useEffect(() => {
    loadPlaylists()

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight &&
        !loading
      ) {
        loadPlaylists()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastVisible, loading])

  return { playlists, loading }
}
