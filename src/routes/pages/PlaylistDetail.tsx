import PlaylistDetail from '@/components/common/PlaylistDetail'
import Comment from '@/components/playlist/Comment'

const SomePage = () => {
  const playlistId = 'some-playlist-id'

  return (
    <div>
      <PlaylistDetail />
      <Comment playlistId={playlistId} />
    </div>
  )
}

export default SomePage
