import { useEffect } from 'react'
import { useHeaderStore } from '@/stores/header'

export default function DeleteVideos() {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('플레이리스트 편집')
  }, [setTitle])

  return (
    <>
      <div className="nav-margin-top"></div>
      <div>DeleteVideos</div>
      <div className="nav-margin-bottom"></div>
    </>
  )
}
