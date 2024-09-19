import PlaylistDetail from '@/components/common/PlaylistDetail'
import Comments from '@/components/Comments/Comments'

const PlaylistDetailPage = () => {
  const playlistId = 'playlist-id'

  return (
    <div>
      <PlaylistDetail />
      <Comments playlistId={playlistId} />
    </div>
  )
}

export default PlaylistDetailPage
