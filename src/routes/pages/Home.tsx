import { Category } from '@/components/common/Category'
import Playlist, { PlaylistType } from '@/components/playlist/Playlist';
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InfiniteScroll from '@/components/infiniteScroll/InfiniteScroll'

export default function Home() {
  const setTitle = useHeaderStore(state => state.setTitle)
  const navigate = useNavigate()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '전체'
  ])

  useEffect(() => {
    setTitle('Home')
  }, [setTitle])

  const { data } = useFetchPlaylists(false)

  const handlePlaylistClick = (playlist: PlaylistType | undefined | null) => {
    if (!playlist) {
      return;
    }
    navigate(`/playlist/${playlist.id}`, { state: { playlist } });
  };
  

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setSelectedCategories(['전체'])
    }
  }, [selectedCategories])

  const filteredAndSortedData: PlaylistType[] | undefined = data
  ?.filter((pl): pl is PlaylistType => {
    return (
      typeof pl.id === 'string' &&
      typeof pl.title === 'string' &&
      Array.isArray(pl.urls) &&
      typeof pl.createdAt === 'string' &&
      typeof pl.userId === 'string' &&
      Array.isArray(pl.categories) &&
      selectedCategories.some(cat => pl.categories.includes(cat))
    );
  })
  ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <>
      <div className="nav-margin-top"></div>
      <Category
        selectedCategories={selectedCategories}
        onSelectCategory={setSelectedCategories}
      />

      {filteredAndSortedData &&
        filteredAndSortedData.map(pl => (
          <Playlist
            key={pl.id}
            playlist={pl}
            onClick={() => handlePlaylistClick(pl)}
          />
          ))}
            <div className="nav-margin-bottom"></div>
      <InfiniteScroll />
    </>
  )
}
