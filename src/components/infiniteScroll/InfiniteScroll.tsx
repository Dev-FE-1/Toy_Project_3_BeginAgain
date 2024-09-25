import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import Playlist from '@/components/playlist/Playlist'

const PlaylistInfiniteScroll = () => {
  const { playlists, loading } = useInfiniteScroll(true)

  return (
    <div>
      {playlists.map(playlist => (
        <Playlist
          key={playlist.id}
          playlist={playlist}
        />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default PlaylistInfiniteScroll
