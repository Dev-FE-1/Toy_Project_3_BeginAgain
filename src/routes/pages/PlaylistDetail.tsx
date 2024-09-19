import PlaylistDetail from '@/components/common/PlaylistDetail'
import Comment from '@/components/playlist/Comment'

const PlaylistDetailPage = () => {
  const playlistId = 'playlist-id'

  return (
    <div>
      <PlaylistDetail showComments={true} />
      <Comment playlistId={playlistId} />
    </div>
  )
}

export default PlaylistDetailPage
