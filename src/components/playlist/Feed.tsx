import { CgProfile, CgHeart, CgComment, CgBookmark } from 'react-icons/cg'
import { css } from '@emotion/react'
import { FontSize } from '@/styles/Theme'
import { Colors } from '@/styles/Theme'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useUpdatePlayList, useDeletePlayList } from '@/hooks/playlists'

// interface FeedProps {
//   userId: string
//   thumbnail: string
//   title: string
//   timeRecord: string
// }
interface PlayList {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
}

export default function Feed({ feed }: { feed: PlayList }) {
  const navigate = useNavigate()

  const auth = getAuth()
  const user = auth.currentUser
  const { mutate: updatePlayList } = useUpdatePlayList()
  const { mutate: deletePlayList } = useDeletePlayList()

  function extractVideoId(url: string) {
    return url.replace('https://www.youtube.com/watch?v=', '')
  }

  return (
    <div css={feedStyle}>
      <div css={headerStyle}>
        <CgProfile css={profileIconStyle} />
        <span css={headerTextStyle}>{feed.id}</span>
      </div>

      <div
        css={thumbnailStyle}
        onClick={() => navigate(`/playlist-details/${feed.id}`)}>
        <img
          width="100%"
          src={`https://img.youtube.com/vi/${extractVideoId(feed.urls[0])}/maxresdefault.jpg`}
          alt=""
        />
      </div>

      <div css={footerStyle}>
        <div css={iconsStyle}>
          <CgHeart css={heartIconStyle} />
          <CgComment css={commentIconStyle} />
          <CgBookmark css={bookmarkIconStyle} />
        </div>

        <div css={titleStyle}>
          <p>{feed.title}</p>
        </div>

        <span css={timeRecordStyle}>
          {dayjs(feed.createdAt).format('YYYY년 M월 DD와우 HH시 mm분 ss초')}
        </span>
      </div>
      {user && feed.userId === user.uid && (
        <>
          <button onClick={() => updatePlayList(feed)}>수정</button>
          <button onClick={() => deletePlayList(feed)}>삭제</button>
        </>
      )}
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

// const thumbnailElementStyle = css`
//   width: 100%;
//   height: auto;
// `

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
