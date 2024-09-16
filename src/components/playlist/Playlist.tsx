import { CgHeart, CgComment, CgBookmark } from 'react-icons/cg'
import { VscHeartFilled } from 'react-icons/vsc'
import { css } from '@emotion/react'
import { FontSize, Colors } from '@/styles/Theme'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFetchComments } from '@/hooks/useFetchComments'
import { getAuth } from 'firebase/auth'
import { useDeletePlaylist } from '@/hooks/useDeletePlaylist'
import { useUpdatePlaylist } from '@/hooks/useUpdatePlaylist'
import { useState } from 'react'
import Toast from '@/components/common/Toast'
import { useToggleBookmark } from '@/hooks/useToggleBookmark'

interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
}

export default function Playlist({
  playlist
}: {
  playlist: Playlist | undefined
}) {
  console.log('Playlist prop:', playlist)

  const [isHeartFilled, setIsHeartFilled] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const navigate = useNavigate()
  const auth = getAuth()
  const user = auth.currentUser

  const { data: comments } = useFetchComments(playlist?.id || '')

  useEffect(() => {
    if (comments) {
      setCommentCount(comments.length)
    }
  }, [comments])

  const { mutate: updatePlaylist } = useUpdatePlaylist()
  const { mutate: deletePlaylist } = useDeletePlaylist()
  const { toggleBookmark, isBookmarked } = useToggleBookmark(palylist.id)


  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isToastVisible, setIsToastVisible] = useState(false)

  const handleBookmark = () => {
    toggleBookmark()

    if (!isBookmarked) {
      setToastMessage('북마크가 추가되었습니다.')
    } else {
      setToastMessage('북마크가 제거되었습니다.')
    }

    setIsToastVisible(true)
  }

  const hideToast = () => {
    setIsToastVisible(false)
  }

  function handleHeartClick() {
    setIsHeartFilled(!isHeartFilled)
  }

  const profileImageUrl =
    user?.photoURL || 'https://example.com/default-profile.png'

  function extractVideoId(url?: string) {
  if (!url) {
    console.error('URL is undefined or empty')
    return '' // 기본 값 반환
  }
  return url.replace('https://www.youtube.com/watch?v=', '')
}

  return (
    <div css={playlistStyle}>
      <div css={headerStyle}>
        <img
          css={profileImageStyle}
          src={profileImageUrl}
          alt="Profile"
        />
        <span css={headerTextStyle}>{playlist.id}</span>
      </div>

      <div
        css={videoIdStyle}
        onClick={() => navigate(`/playlist-details/${playlist.id}`)}>
        <img
          width="100%"
          src={`https://img.youtube.com/vi/${extractVideoId(playlist.urls[0])}/maxresdefault.jpg`}
          alt=""
        />
      </div>

      <div css={footerStyle}>
        <div css={iconsStyle}>
          {isHeartFilled ? (
            <VscHeartFilled
              css={filledHeartIconStyle}
              onClick={handleHeartClick}
            />
          ) : (
            <CgHeart
              css={emptyHeartIconStyle}
              onClick={handleHeartClick}
            />
          )}
          <div
            css={commentContainerStyle}
            onClick={() => navigate(`/playlist-details/${playlist.id}`)}>
            <CgComment css={commentIconStyle} />
            <span css={commentCountStyle}>{commentCount}</span>
          </div>

          {user && user.uid === palylist.userId ? (
            <CgBookmark
              css={[bookmarkIconStyle, disabledBookmarkStyle]}
              color={' '}
            />
          ) : (
            <CgBookmark
              onClick={handleBookmark}
              css={bookmarkIconStyle}
              color={isBookmarked ? 'gold' : ''}
            />
          )}

        </div>

        <div css={titleStyle}>
          <p>{playlist.title}</p>
        </div>
        <span css={timeRecordStyle}>{dayjs(playlist.createdAt).fromNow()}</span>
      </div>
      <Toast
        message={toastMessage || ''}
        isVisible={isToastVisible}
        onHide={hideToast}
      />
    </div>
  )
}

const playlistStyle = css`
  margin-top: 30px;
  cursor: pointer;
`

const headerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 20px;
`

const headerTextStyle = css`
  margin-left: 10px;
  color: ${Colors.black};
`

const videoIdStyle = css`
  margin-bottom: 10px;
`

const footerStyle = css`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`

const iconsStyle = css`
  display: flex;
  margin-bottom: 10px;
`

const profileImageStyle = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${Colors.lightGrey};
`

const emptyHeartIconStyle = css`
  font-size: 24px;
  margin-right: 30px;
  color: ${Colors.charcoalGrey};
  cursor: pointer;
  transition:
    color 0.9s ease,
    transform 0.9s ease;
`

const filledHeartIconStyle = css`
  font-size: 24px;
  margin-right: 30px;
  color: ${Colors.red};
  cursor: pointer;
  transition:
    color 0.9s ease,
    transform 0.9s ease;
`

const commentContainerStyle = css`
  display: flex;
  align-items: center;
  color: ${Colors.charcoalGrey};
  cursor: pointer;
  margin-right: 30px;
`

const commentIconStyle = css`
  font-size: 24px;
  margin-right: 7px;
`

const commentCountStyle = css`
  font-size: ${FontSize.xl};
`

const bookmarkIconStyle = css`
  font-size: 30px;
  margin-left: auto;
  margin-right: 20px;
  color: ${Colors.charcoalGrey};
  cursor: pointer;
`

const disabledBookmarkStyle = css`
  pointer-events: none;
  opacity: 0.5;
`

const titleStyle = css`
  font-size: ${FontSize.lg};
  color: ${Colors.black};
  margin: 0;
  margin-bottom: 10px;
`

const timeRecordStyle = css`
  color: ${Colors.darkGrey};
  font-size: ${FontSize.sm};
`
