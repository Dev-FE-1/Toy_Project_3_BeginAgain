import { FaBookmark } from 'react-icons/fa'
import { CgFormatJustify } from 'react-icons/cg'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import theme from '@/styles/theme'
import { useToggleBookmark } from '@/hooks/useToggleBookmark'
import { useState, useEffect } from 'react'
import BookmarkModal from '@/components/bookmarks/BookmarkModal'
import Toast from '@/components/common/Toast'

interface PlayList {
  id: string
  urls: string[]
  title: string
  description: string
  userId: string
  createdAt: string
  // isVisible: boolean
}

function extractVideoId(url: string) {
  return url.replace('https://www.youtube.com/watch?v=', '')
}

const BookmarkList = ({ playlist }: { playlist: PlayList }) => {
  const { mutate: toggleBookmark } = useToggleBookmark(playlist.id)
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isToastVisible, setIsToastVisible] = useState(false)

  useEffect(() => {
    console.log('isToastVisible:', isToastVisible)
  }, [isToastVisible])

  const handleDelete = () => {
    toggleBookmark(true)
    setIsModalOpen(false)
    setIsToastVisible(true) // 토스트를 바로 표시
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main>
      <div css={playlistItemStyle}>
        <div css={leftSectionStyle}>
          <FaBookmark
            css={bookmarkIconStyle}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <img
          src={`https://img.youtube.com/vi/${extractVideoId(playlist.urls[0])}/hqdefault.jpg`}
          alt={playlist.title}
          css={videoIdStyle}
          onClick={() => navigate(`/playlist-details/${playlist.id}`)}
        />
        <div css={playlistInfoStyle}>
          <p css={titleStyle}>{playlist.title}</p>
          <CgFormatJustify css={hamburgerIconStyle} />
        </div>
      </div>

      {isModalOpen && (
        <BookmarkModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
      <Toast
        message="북마크가 해제되었습니다"
        isVisible={isToastVisible}
        onHide={() => setIsToastVisible(false)}
      />
    </main>
  )
}

const playlistItemStyle = css`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  margin-top: 10px;
`
const leftSectionStyle = css`
  display: flex;
  align-items: center;
  margin-right: 10px;
`

const bookmarkIconStyle = css`
  font-size: 20px;
  margin-right: 8px;
  cursor: pointer;
  color: ${theme.colors.charcoalGrey};
  transition: color 0.3s ease;
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
  color: ${theme.colors.black};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const hamburgerIconStyle = css`
  font-size: ${theme.fontSize.xxl};
  cursor: pointer;
  color: ${theme.colors.charcoalGrey};
  transition: color 0.3s ease;
`

export default BookmarkList
