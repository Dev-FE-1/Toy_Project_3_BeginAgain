import Header from '@/components/theLayout/theHeader/Header'
import Category from '@/components/theCommon/Category'
import EmptyInfo from '@/components/theEmptyInfo/EmptyInfo'

const MyPlaylist = () => {
  return (
    <>
      <Header title="My Playlist" />
      <main>
        <Category />
        <EmptyInfo
          status="생성"
          title="플레이리스트"
        />
      </main>
    </>
  )
}

export default MyPlaylist
