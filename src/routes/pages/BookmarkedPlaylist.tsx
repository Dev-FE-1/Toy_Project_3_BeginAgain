import PlaylistDetail from '@/components/playlist/PlaylistDetail'

export default function BookmarkedPlaylist() {
  return (
    <div>
      <PlaylistDetail
        showLockIcon={false}
        showComments={false}
        isBookmarked={true}
      />
    </div>
  )
}
