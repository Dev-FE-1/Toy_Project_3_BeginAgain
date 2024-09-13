import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import { useHeaderStore } from '@/stores/header'

const MyPlaylist = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  setTitle('My Playlist')

  return (
    <>
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
