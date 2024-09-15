import { CgProfile, CgHeart, CgComment, CgBookmark } from 'react-icons/cg'
import { css } from '@emotion/react'
import { FontSize } from '@/styles/Theme'
import { Colors } from '@/styles/Theme'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useDeletePlaylist } from '@/hooks/useDeletePlaylist'
import { useUpdatePlaylist } from '@/hooks/useUpdatePlaylist'
import 'dayjs/locale/ko'

interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
}

export default function Playlist({ palylist }: { palylist: Playlist }) {
  const navigate = useNavigate()

  const auth = getAuth()
  const user = auth.currentUser
  const { mutate: updatePlaylist } = useUpdatePlaylist()
  const { mutate: deletePlaylist } = useDeletePlaylist()
  //연지 추가
  const handleBookmarkClick = () => {
    const videoId = extractVideoId(palylist.urls[0])
    navigate('/bookmark', { state: { videoId, title: palylist.title } })
  }

  function extractVideoId(url?: string) {
    if (!url) {
      console.error('URL is undefined or empty')
      return '' // 기본값 반환
    }
    return url.replace('https://www.youtube.com/watch?v=', '')
  }

  return (
    <div css={palylistStyle}>
      <div css={headerStyle}>
        <CgProfile css={profileIconStyle} />
        <span css={headerTextStyle}>{palylist.id}</span>
      </div>

      <div
        css={videoIdStyle}
        onClick={() => navigate(`/playlist-details/${palylist.id}`)}>
        <img
          width="100%"
          src={`https://img.youtube.com/vi/${extractVideoId(palylist.urls[0])}/maxresdefault.jpg`}
          alt=""
        />
      </div>

      <div css={footerStyle}>
        <div css={iconsStyle}>
          <CgHeart css={heartIconStyle} />
          <CgComment css={commentIconStyle} />
          <CgBookmark
            css={bookmarkIconStyle}
            onClick={handleBookmarkClick} // 북마크 아이콘 클릭 시 북마크 페이지로 이동
          />
        </div>

        <div css={titleStyle}>
          <p>{palylist.title}</p>
        </div>

        <span css={timeRecordStyle}>
          {dayjs(palylist.createdAt).format('YYYY년 M월 DD일 HH시 mm분 ss초')}
        </span>
      </div>
      {user && palylist.userId === user.uid && (
        <>
          <button onClick={() => updatePlaylist(palylist)}>수정</button>
          <button onClick={() => deletePlaylist(palylist)}>삭제</button>
        </>
      )}
    </div>
  )
}

const palylistStyle = css`
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
  margin-right: 20px;
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
