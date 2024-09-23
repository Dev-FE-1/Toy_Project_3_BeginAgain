import { CgHeart, CgComment } from 'react-icons/cg'
import { VscHeartFilled } from 'react-icons/vsc'
import theme from '@/styles/theme'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useFetchComments } from '@/hooks/useFetchComments'
import { auth, db } from '@/api/firebaseApp'
import { doc, getDoc } from 'firebase/firestore'
import Toast from '@/components/common/Toast'
import { useToggleBookmark } from '@/hooks/useToggleBookmark'
import { useFetchBookmarks } from '@/hooks/useFetchBookmark'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6'
import { css } from '@emotion/react'
export interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  categories: string[]
  userId: string
  createdAt: Date | string
  onClick?: () => void
}
export default function Playlist({
  playlist
}: {
  playlist: Playlist | undefined
}) {
  console.log('Playlist prop:', playlist)
  const [user, setUser] = useState<any>(null)
  const { data: comments } = useFetchComments(playlist?.id || '')

  const [isHeartFilled, setIsHeartFilled] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      if (playlist?.userId) {
        const userDoc = await getDoc(doc(db, 'Users', playlist.userId))
        if (userDoc.exists()) {
          setUser(userDoc.data())
        }
      }
    }
    fetchUser()
  }, [playlist?.userId])

  // Comments
  useEffect(() => {
    if (comments) {
      setCommentCount(comments.length)
    }
  }, [comments])
  // const { mutate: createComment } = useCreateComment()
  // const { mutate: toggleBookmark, isBookmarked } = useToggleBookmark(playlist?.id || '')
  const { mutate: toggleBookmark } = useToggleBookmark(playlist?.id || '')
  const { data: BookmarkedData } = useFetchBookmarks(playlist?.id || '')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isToastVisible, setIsToastVisible] = useState(false)
  useEffect(() => {
    if (BookmarkedData) {
      setIsBookmarked(BookmarkedData.length > 0)
    } else {
      setIsBookmarked(false)
    }
  }, [BookmarkedData])
  const handleBookmark = () => {
    if (playlist && BookmarkedData !== undefined) {
      toggleBookmark(isBookmarked)
      if (!isBookmarked) {
        setToastMessage('북마크가 추가되었습니다.')
      } else {
        setToastMessage('북마크가 해제되었습니다.')
      }
      setIsToastVisible(true)
    }
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
        <span css={headerTextStyle}>{playlist?.id}</span>
      </div>
      <div
        css={videoIdStyle}
        onClick={() => navigate(`/playlist-details/${playlist?.id}`)}>
        <img
          width="100%"
          src={`https://img.youtube.com/vi/${extractVideoId(playlist?.urls[0])}/maxresdefault.jpg`}
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
            onClick={() => navigate(`/playlist-details/${playlist?.id}`)}>
            <CgComment css={commentIconStyle} />
            <span css={commentCountStyle}>{commentCount}</span>
          </div>
          {user && user.uid !== playlist?.userId ? (
            isBookmarked ? (
              <FaBookmark
                onClick={handleBookmark}
                css={fillbookmarkIconStyle}
              />
            ) : (
              <FaRegBookmark
                onClick={handleBookmark}
                css={bookmarkIconStyle}
              />
            )
          ) : null}
        </div>
        <div css={titleStyle}>
          <p>{playlist?.title}</p>
        </div>
        <span css={timeRecordStyle}>
          {dayjs(playlist?.createdAt).fromNow()}
        </span>
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
  color: ${theme.colors.black};
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
  background-color: ${theme.colors.lightGrey};
`
const emptyHeartIconStyle = css`
  font-size: 24px;
  margin-right: 30px;
  color: ${theme.colors.charcoalGrey};
  cursor: pointer;
  transition:
    color 0.9s ease,
    transform 0.9s ease;
`
const filledHeartIconStyle = css`
  font-size: 24px;
  margin-right: 30px;
  color: ${theme.colors.red};
  cursor: pointer;
  transition:
    color 0.9s ease,
    transform 0.9s ease;
`
const commentContainerStyle = css`
  display: flex;
  align-items: center;
  color: ${theme.colors.charcoalGrey};
  cursor: pointer;
  margin-right: 30px;
`
const commentIconStyle = css`
  font-size: 24px;
  margin-right: 7px;
`
const commentCountStyle = css`
  font-size: ${theme.fontSize.xl};
`
const bookmarkIconStyle = css`
  font-size: ${theme.fontSize.xl};
  margin-left: auto;
  margin-right: 20px;
  color: ${theme.colors.charcoalGrey};
  cursor: pointer;
`
const fillbookmarkIconStyle = css`
  font-size: ${theme.fontSize.xl};
  margin-left: auto;
  margin-right: 20px;
  color: ${theme.colors.charcoalGrey};
  cursor: pointer;
  transition:
    color 0.9s ease,
    transform 0.9s ease;
`
const titleStyle = css`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.black};
  margin: 0;
  margin-bottom: 10px;
`
const timeRecordStyle = css`
  color: ${theme.colors.darkGrey};
  font-size: ${theme.fontSize.sm};
`
