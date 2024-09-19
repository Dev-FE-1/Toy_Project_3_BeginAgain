import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylist } from '@/hooks/useFetchPlaylist'
import { CgChevronUp, CgChevronDown, CgPlayList } from 'react-icons/cg'
import Playlist from '@/components/playlist/Playlist'
import Category from '@/components/common/Category'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { auth } from '@/api/firebaseApp'
import { CgLockUnlock } from 'react-icons/cg'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)

export default function PlaylistDetail({
  showComments,
  showLockIcon,
  playlist
}: {
  showComments?: boolean
  showLockIcon?: boolean
  playlist?: typeof Playlist
}) {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { id } = useParams()
  const { data: playlistData, isLoading } = useFetchPlaylist(id as string)
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const user = auth.currentUser

  useEffect(() => {
    setTitle('Playlist Detail')
  }, [setTitle])

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (!playlistData) {
    return <div>플레이리스트 데이터를 가져오지 못했습니다.</div>
  }

  const videoUrl = playlistData.urls[0]

  return (
    <div>
      <div css={sectionOneContainer}>
        {videoUrl ? (
          <iframe
            width="100%"
            height="240px"
            src={videoUrl.replace('watch?v=', 'embed/')}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"></iframe>
        ) : (
          <p>비디오가 없습니다.</p>
        )}
      </div>

      <div css={sectionTwoContainer}>
        <h2 css={titleStyle}>{playlistData.title}</h2>
        {showLockIcon && (
          <div>
            <CgLockUnlock />
          </div>
        )}
        <span css={timeRecordStyle}>
          {dayjs(playlistData.createdAt).fromNow()}
        </span>

        <div css={buttonContainerStyle}>
          <Category />
          <button
            css={buttonStyle}
            onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
            {isDescriptionVisible ? <CgChevronUp /> : <CgChevronDown />}
          </button>
        </div>
        {isDescriptionVisible && (
          <p css={descriptionStyle}>{playlistData.description}</p>
        )}
      </div>

      <div css={sectionThreeContainer}>
        {user && showComments ? (
          <>
            <img
              src={user.photoURL || ''}
              alt={user.displayName || 'User'}
              width="50"
              height="50"
              css={profileImageStyle}
            />
            <span>{user.displayName}</span>
          </>
        ) : null}
      </div>

      <div css={plAmountInfoStyle}>
        <CgPlayList />
        재생목록( )
      </div>

      <div>
        // Playlist 컴포넌트를 사용하여 플레이리스트 데이터를 보여줍니다.
      </div>
    </div>
  )
}

const sectionOneContainer = css`
  iframe {
  }
`

const sectionTwoContainer = css`
  border-bottom: 1px solid ${theme.colors.lightGrey};
`

const titleStyle = css`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.black};
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
`

const buttonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${theme.colors.charcoalGrey};
  padding: 0;
  margin: 0;
  transition: color 0.3s ease;
  &:hover {
    color: ${theme.colors.grey};
  }
`

const buttonContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
`

const descriptionStyle = css`
  font-size: ${theme.fontSize.md};
  padding: 20px;
`

const plAmountInfoStyle = css`
  padding: 20px;
  display: flex;
  align-items: center;
`

const sectionThreeContainer = css`
  margin-top: 15px;
  display: flex;
  align-items: center;
`

const profileImageStyle = css`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  border-radius: 50%;
  object-fit: cover;
`

const timeRecordStyle = css`
  color: ${theme.colors.darkGrey};
  font-size: ${theme.fontSize.sm};
  text-align: right;
`
