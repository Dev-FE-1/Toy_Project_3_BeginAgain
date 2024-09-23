import PlaylistDetail from '@/components/playlist/PlaylistDetail'

export default function SavedPlaylistsDetail() {
  return (
    <div>
      <PlaylistDetail
        showLockIcon={true}
        showComments={false}
        showEditButton={true}
      />
    </div>
  )
}
