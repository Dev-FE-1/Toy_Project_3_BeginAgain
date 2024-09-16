import { CgProfile, CgHeart, CgComment, CgBookmark } from 'react-icons/cg'
import { css } from '@emotion/react'
import { FontSize, Colors } from '@/styles/Theme'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useDeletePlaylist } from '@/hooks/useDeletePlaylist'
import { useUpdatePlaylist } from '@/hooks/useUpdatePlaylist'
import { useToggleBookmark } from '@/hooks/useToggleBookmark'
import { useState } from 'react'
import 'dayjs/locale/ko'
import Toast from '@/components/common/Toast'

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

  const { toggleBookmark, isBookmarked } = useToggleBookmark(palylist.id)

  // 토스트 메시지와 상태를 관리하는 useState
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
          alt="thumbnail"
        />
      </div>

      <div css={footerStyle}>
        <div css={iconsStyle}>
          <CgHeart css={heartIconStyle} />
          <CgComment css={commentIconStyle} />

          {/* 현재 로그인한 사용자와 플레이리스트 소유자가 같으면 클릭할 수 없게 설정 */}
          {user && user.uid === palylist.userId ? (
            <CgBookmark
              css={[bookmarkIconStyle, disabledBookmarkStyle]} // 클릭 비활성화 스타일 추가
              color={' '}
            />
          ) : (
            <CgBookmark
              onClick={handleBookmark} // 북마크 핸들러 연결
              css={bookmarkIconStyle}
              color={isBookmarked ? 'gold' : ''} // 북마크 여부에 따른 색상 변경
            />
          )}
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

      {/* 토스트 메시지 표시 */}
      <Toast
        message={toastMessage || ''}
        isVisible={isToastVisible}
        onHide={hideToast}
      />
    </div>
  )
}

// 스타일 정의
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
  cursor: pointer;
`

const disabledBookmarkStyle = css`
  pointer-events: none;
  opacity: 0.5;
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
