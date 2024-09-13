import { CgProfile, CgHeart, CgComment, CgBookmark } from 'react-icons/cg'
import { css } from '@emotion/react'
import { FontSize } from '@/styles/Theme'
import { Colors } from '@/styles/Theme'
import { useNavigate } from 'react-router-dom'

interface FeedProps {
  userId: string
  thumbnail: string
  title: string
  timeRecord: string
}

const Feed: React.FC<FeedProps> = ({
  userId,
  thumbnail,
  title,
  timeRecord
}) => {
  const navigate = useNavigate()

  const goToPlaylistDetailPage = () => {
    navigate('/PlaylistDetailPage')
  }
  return (
    <div
      css={feedStyle}
      onClick={goToPlaylistDetailPage}>
      <div css={headerStyle}>
        <CgProfile css={profileIconStyle} />
        <span css={headerTextStyle}>{userId}</span>
      </div>

      <div css={thumbnailStyle}>
        <video
          css={thumbnailElementStyle}
          controls>
          <source
            src={thumbnail}
            type="video/mp4"
          />
        </video>
      </div>

      <div css={footerStyle}>
        <div css={iconsStyle}>
          <CgHeart css={heartIconStyle} />
          <CgComment css={commentIconStyle} />
          <CgBookmark css={bookmarkIconStyle} />
        </div>

        <div css={titleStyle}>
          <p>{title}</p>
        </div>

        <span css={timeRecordStyle}>{timeRecord}</span>
      </div>
    </div>
  )
}

const feedStyle = css`
  margin-top: 30px;
  cursor: pointer;
`

const headerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const headerTextStyle = css`
  margin-left: 10px;
`

const thumbnailStyle = css`
  margin-bottom: 10px;
`

const thumbnailElementStyle = css`
  width: 100%;
  height: auto;
`

const footerStyle = css`
  display: flex;
  flex-direction: column;
`

const iconsStyle = css`
  display: flex;
  margin-bottom: 10px;
`

const profileIconStyle = css`
  font-size: 30px;
`

const heartIconStyle = css`
  font-size: 24px;
  margin-right: 30px;
`

const commentIconStyle = css`
  font-size: 24px;
`

const bookmarkIconStyle = css`
  font-size: 30px;
  margin-left: auto;
`

const titleStyle = css`
  font-size: ${FontSize.lg};
  margin: 0;
  margin-bottom: 10px;
`
const timeRecordStyle = css`
  color: ${Colors.darkGrey};
  font-size: ${FontSize.sm};
`

export default Feed
