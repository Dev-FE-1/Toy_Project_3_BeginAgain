import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import Playlist from '@/components/playlist/Playlist'

const PlaylistInfiniteScroll = () => {
  const { playlists, loading } = useInfiniteScroll()

  return (
    <div>
      {playlists.map(playlist => (
        <Playlist
          key={playlist.userId}
          playlist={playlist}
        />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default PlaylistInfiniteScroll
