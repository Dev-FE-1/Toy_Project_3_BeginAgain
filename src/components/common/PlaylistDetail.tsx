import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylist } from '@/hooks/useFetchPlaylist'
import { CgChevronUp, CgChevronDown } from 'react-icons/cg'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { auth } from '@/api/firebaseApp'

const PlaylistDetail = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { id } = useParams()
  const location = useLocation()
  const { playlist } = location.state || {}
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
        <div css={buttonContainerStyle}>
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
        {user && (
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
        )}
      </div>
    </div>
  )
}

export default PlaylistDetail

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

const sectionThreeContainer = css`
  padding: 20px;
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
