// import Category from '@/components/common/Category'
// import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
// import Playlist from '@/components/playlist/Playlist'
// import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
// import { useHeaderStore } from '@/stores/header'
// import { useEffect } from 'react'
// import { getAuth } from 'firebase/auth'
// import { css } from '@emotion/react'
// import { useBookmarkStore } from '@/stores/useBookmark'

// const Bookmark = () => {
//   const setTitle = useHeaderStore(state => state.setTitle)
//   const { data: playlists } = useFetchPlaylists()
//   const auth = getAuth()
//   const user = auth.currentUser

//   const bookmarks = useBookmarkStore(state => state.bookmarks)

//   useEffect(() => {
//     setTitle('Bookmarks')
//   }, [setTitle])

//   const userBookmarks = user ? bookmarks[user.uid] || [] : []

//   const filteredPlaylists = playlists?.filter(pl =>
//     userBookmarks.includes(pl.id)
//   )

//   return (
//     <main>
//       <Category />
//       {filteredPlaylists && filteredPlaylists.length > 0 ? (
//         filteredPlaylists.map(pl => (
//           <div key={pl.id}>
//             <Playlist playlist={pl} />
//           </div>
//         ))
//       ) : (
//         <div css={EmptyInfoStyle}>
//           <EmptyInfo
//             status="북마크"
//             title="플레이리스트"
//           />
//         </div>
//       )}
//       <div className="nav-margin"></div>
//     </main>
//   )
// }

// const EmptyInfoStyle = css`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
// `

// export default Bookmark

import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useHeaderStore } from '@/stores/header'
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { css } from '@emotion/react'
import { useBookmarkStore } from '@/stores/useBookmark'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Modal from '@/components/common/TheModal'
import Toast from '@/components/common/Toast'
import { FontSize, Colors } from '@/styles/Theme'

// YouTube URL에서 videoId를 추출하는 함수
function extractVideoId(url?: string) {
  if (!url) {
    console.error('URL is undefined or empty')
    return ''
  }
  return url.replace('https://www.youtube.com/watch?v=', '')
}

const Bookmark = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { data: playlists } = useFetchPlaylists()
  const auth = getAuth()
  const user = auth.currentUser
  const navigate = useNavigate()

  const bookmarks = useBookmarkStore(state => state.bookmarks)
  const removeBookmark = useBookmarkStore(state => state.removeBookmark)
  const [filteredPlaylists, setFilteredPlaylists] = useState(playlists)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  )
  const [isToastVisible, setIsToastVisible] = useState(false)

  useEffect(() => {
    setTitle('Bookmarks')
  }, [setTitle])

  useEffect(() => {
    if (playlists) {
      const userBookmarks = user ? bookmarks[user.uid] || [] : []
      const filtered = playlists.filter(pl => userBookmarks.includes(pl.id))
      setFilteredPlaylists(filtered)
    }
  }, [playlists, bookmarks, user])

  const handleDelete = () => {
    if (selectedPlaylistId) {
      removeBookmark(user.uid, selectedPlaylistId)
      setFilteredPlaylists(prev =>
        prev ? prev.filter(pl => pl.id !== selectedPlaylistId) : []
      )
      setIsToastVisible(true)
      setIsModalOpen(false)
    }
  }

  const handleOpenModal = (playlistId: string) => {
    setSelectedPlaylistId(playlistId)
    setIsModalOpen(true)
  }

  return (
    <main css={mainStyle}>
      <Category /> {/* 카테고리 컴포넌트 */}
      {filteredPlaylists && filteredPlaylists.length > 0 ? (
        filteredPlaylists.map(pl => (
          <div
            key={pl.id}
            css={playlistItemStyle}>
            {/* 비디오 썸네일 클릭 시 디테일 페이지로 이동 */}
            <img
              src={`https://img.youtube.com/vi/${extractVideoId(pl.urls[0])}/hqdefault.jpg`}
              alt={pl.title}
              css={videoIdStyle}
              onClick={() => navigate(`/playlist-details/${pl.id}`)} // 클릭 시 이동
            />

            {/* 비디오 제목과 북마크 아이콘 */}
            <div css={playlistInfoStyle}>
              <p css={titleStyle}>{pl.title}</p> {/* 제목 스타일 */}
              {/* 북마크 상태에 따라 아이콘 변경 */}
              {user && bookmarks[user.uid]?.includes(pl.id) ? (
                <FaBookmark
                  css={bookmarkIconStyle}
                  onClick={() => handleOpenModal(pl.id)}
                />
              ) : (
                <FaRegBookmark
                  css={bookmarkIconStyle}
                  onClick={() => handleOpenModal(pl.id)}
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div css={EmptyInfoStyle}>
          <EmptyInfo
            status="북마크"
            title="플레이리스트"
          />
        </div>
      )}
      <div className="nav-margin"></div>
      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
      {/* 토스트 컴포넌트 */}
      {isToastVisible && (
        <Toast
          message="북마크가 해제되었습니다."
          isVisible={isToastVisible}
          onHide={() => setIsToastVisible(false)}
        />
      )}
    </main>
  )
}

// CSS 스타일 정의
const mainStyle = css`
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`

const playlistItemStyle = css`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`

const videoIdStyle = css`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`

const playlistInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 10px;
`

const titleStyle = css`
  font-size: 14px;
  color: #333;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const bookmarkIconStyle = css`
  font-size: ${FontSize.xl};
  cursor: pointer;
  color: ${Colors.charcoalGrey};
  transition: color 0.3s ease;
`

const EmptyInfoStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export default Bookmark
