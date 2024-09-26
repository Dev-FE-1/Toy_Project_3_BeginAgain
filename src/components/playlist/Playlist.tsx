import { CgHeart, CgComment } from 'react-icons/cg'
import { VscHeartFilled } from 'react-icons/vsc'
import theme from '@/styles/theme'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import Toast from '@/components/common/Toast'
import { usePlaylistData } from '@/hooks/useFetchPlaylistData'
import { useLikeData } from '@/hooks/useLikeData'
import { useExtractVideoId } from '@/hooks/useExtractVideoId'
import { useFetchComments } from '@/hooks/useFetchComments'
import { css } from '@emotion/react'
import { FaRegBookmark, FaBookmark } from 'react-icons/fa6'

export type PlaylistType = {
  id: string
  title: string
  urls: string[]
  createdAt: string
  userId: string
  categories: string[]
  isPublic: boolean
  description: string
}

export default function Playlist({
  playlist
}: {
  playlist: PlaylistType
  userId?: string
  onClick: () => void
}) {
  const navigate = useNavigate()
  const {
    userData,
    isBookmarked,
    handleBookmark,
    toastMessage,
    isToastVisible,
    hideToast
  } = usePlaylistData(playlist)

  const { isLikeFilled, handleLikeClick, likeCount } = useLikeData(playlist.id)
  const { extractVideoId } = useExtractVideoId()
  const { data: comments } = useFetchComments(playlist?.id)

  return (
    <div css={playlistStyle}>
      <div css={headerStyle}>
        <img
          css={profileImageStyle}
          src={userData?.photoURL || 'https://example.com/default-profile.png'}
          alt={userData?.displayName || 'User'}
        />
        <span css={headerTextStyle}>
          {userData?.displayName || 'Anonymous User'}
        </span>
      </div>

      <div
        css={videoIdStyle}
        onClick={() => navigate(`/playlist-details/${playlist?.id}`)}>
        {playlist?.urls[0] ? (
          <img
            width="100%"
            src={`https://img.youtube.com/vi/${extractVideoId(playlist.urls[0])}/maxresdefault.jpg`}
            alt="Video Thumbnail"
          />
        ) : (
          <p>썸네일을 불러올 수 없습니다.</p>
        )}
      </div>

      <div css={footerStyle}>
        <div css={iconsStyle}>
          <div css={likeContainerStyle}>
            {isLikeFilled ? (
              <VscHeartFilled
                css={filledHeartIconStyle}
                onClick={handleLikeClick}
              />
            ) : (
              <CgHeart
                css={emptyHeartIconStyle}
                onClick={handleLikeClick}
              />
            )}
            <span css={likeCountStyle}>{likeCount}</span>
          </div>

          <div
            css={commentContainerStyle}
            onClick={() => navigate(`/playlist-details/${playlist?.id}`)}>
            <CgComment css={commentIconStyle} />
            <span css={commentCountStyle}>{comments?.length || 0}</span>
          </div>
          {handleBookmark &&
            (isBookmarked ? (
              <FaBookmark
                onClick={handleBookmark}
                css={filledbookmarkIconStyle}
              />
            ) : (
              <FaRegBookmark
                onClick={handleBookmark}
                css={bookmarkIconStyle}
              />
            ))}
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
  margin-top: 10px;
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
  margin-right: 10px;
  color: ${theme.colors.charcoalGrey};
  cursor: pointer;
  transition:
    color 0.9s ease,
    transform 0.9s ease;
`
const filledHeartIconStyle = css`
  font-size: 24px;
  margin-right: 10px;
  color: ${theme.colors.red};
  cursor: pointer;
  transition:
    color 0.9s ease,
    transform 0.9s ease;
`
const likeContainerStyle = css`
  display: flex;
  align-items: center;
`
const likeCountStyle = css`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.charcoalGrey};
  margin-right: 10px;
`

const commentContainerStyle = css`
  display: flex;
  align-items: center;
  color: ${theme.colors.charcoalGrey};
  cursor: pointer;
  margin-right: 10px;
`
const commentIconStyle = css`
  font-size: 24px;
  margin-right: 7px;
`
const commentCountStyle = css`
  font-size: ${theme.fontSize.md};
`
const bookmarkIconStyle = css`
  font-size: ${theme.fontSize.xl};
  margin-left: auto;
  margin-right: 20px;
  color: ${theme.colors.charcoalGrey};
  cursor: pointer;
`
const filledbookmarkIconStyle = css`
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
  margin-top: 5px;
  margin-bottom: 10px;
`
const timeRecordStyle = css`
  color: ${theme.colors.darkGrey};
  font-size: ${theme.fontSize.sm};
`
