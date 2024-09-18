import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useHeaderStore } from '@/stores/header'
import { useEffect, useState } from 'react'
import { auth } from '@/api/firebaseApp'
import { css } from '@emotion/react'
import { useBookmarkStore } from '@/stores/useBookmark'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { CgFormatJustify } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import Modal from '@/components/common/TheModal'
import Toast from '@/components/common/Toast'
import { FontSize, Colors } from '@/styles/Theme'

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
    <>
      <Category />
      {filteredPlaylists && filteredPlaylists.length > 0 ? (
        filteredPlaylists.map(pl => (
          <div
            key={pl.id}
            css={playlistItemStyle}>
            <div css={leftSectionStyle}>
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

            <img
              src={`https://img.youtube.com/vi/${extractVideoId(pl.urls[0])}/hqdefault.jpg`}
              alt={pl.title}
              css={videoIdStyle}
              onClick={() => navigate(`/playlist-details/${pl.id}`)}
            />
            <div css={playlistInfoStyle}>
              <p css={titleStyle}>{pl.title}</p>

              {/* 오른쪽에 햄버거 */}
              <CgFormatJustify css={hamburgerIconStyle} />
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

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
      {isToastVisible && (
        <Toast
          message="북마크가 해제되었습니다."
          isVisible={isToastVisible}
          onHide={() => setIsToastVisible(false)}
        />
      )}
    </>
  )
}

const playlistItemStyle = css`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  margin-top: 10px;
`

const leftSectionStyle = css`
  display: flex;
  align-items: center;
  margin-right: 10px;
`

const videoIdStyle = css`
  width: 80px;
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
  margin-left: 10px;
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
  margin-right: 10px;
  cursor: pointer;
  color: ${Colors.charcoalGrey};
  transition: color 0.3s ease;
`

const hamburgerIconStyle = css`
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
