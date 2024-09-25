import { FaBookmark } from 'react-icons/fa'
import { CgFormatJustify } from 'react-icons/cg'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import theme from '@/styles/theme'
import { useToggleBookmark } from '@/hooks/useToggleBookmark'
import { useState } from 'react'
import BookmarkModal from '@/components/bookmarks/BookmarkModal'

interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  userId: string
  createdAt: string
}

function extractVideoId(url: string) {
  // console.log('extractVideoId', url)
  url = url.split('&')[0]
  return url.replace('https://www.youtube.com/watch?v=', '')
}

const BookmarkItem = ({
  playlist,
  onBookmarkToggle
}: {
  playlist: Playlist
  onBookmarkToggle: () => void
}) => {
  const { mutate: toggleBookmark } = useToggleBookmark(playlist.id)

  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDelete = () => {
    toggleBookmark(true)
    setIsModalOpen(false)
    onBookmarkToggle() // 토스트 표시
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main>
      <div css={playlistItemStyle}>
        <div css={leftSectionStyle}>
          <CgFormatJustify
            css={hamburgerIconStyle}
            className="drag-handle"
          />
        </div>
        <img
          src={`https://img.youtube.com/vi/${extractVideoId(playlist.urls[0])}/hqdefault.jpg`}
          alt={playlist.title}
          css={videoIdStyle}
          onClick={() => navigate(`/bookmarked-playlist/${playlist.id}`)}
        />
        <div css={playlistInfoStyle}>
          <p css={titleStyle}>{playlist.title}</p>
          <FaBookmark
            css={bookmarkIconStyle}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {isModalOpen && (
        <BookmarkModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
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
  margin-right: 12px;
`

const bookmarkIconStyle = css`
  font-size: 20px;
  margin-right: 8px;
  cursor: pointer;
  color: ${theme.colors.charcoalGrey};
  transition: color 0.9s ease;
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
  transition: color 0.9s ease;
`

export default BookmarkItem
