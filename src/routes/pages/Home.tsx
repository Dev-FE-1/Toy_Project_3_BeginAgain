import Category from '@/components/common/Category'
import Feed from '@/components/playlist/Feed'
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useEffect } from 'react'

export default function Home() {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('Home')
  }, [setTitle])

  const { data, isLoading } = useFetchPlaylists()

  return (
    <>
      <Category />
      {isLoading && <div>데이터를 가져오고 있는 중...</div>}
      {data &&
        data.map(pl => {
          return (
            <Feed
              key={pl.id}
              feed={pl}></Feed>
          )
        })}
      <div className="nav-margin"></div>
    </>
  )
}
