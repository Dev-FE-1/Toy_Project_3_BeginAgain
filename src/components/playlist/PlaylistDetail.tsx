import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylist } from '@/hooks/useFetchPlaylist'
import {
  CgChevronUp,
  CgChevronDown,
  CgPlayList,
  CgFormatJustify,
  CgLockUnlock
} from 'react-icons/cg'
import Playlist from '@/components/playlist/Playlist'
import Category from '@/components/common/Category'
import EditPlaylist from '@/components/EditPlaylistModal'
import { AnimatePresence } from 'framer-motion'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { auth } from '@/api/firebaseApp'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import Sortable from 'sortablejs'

dayjs.locale('ko')
dayjs.extend(relativeTime)

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

function extractVideoIdFromUrl(url: string): string {
  const urlObj = new URL(url)
  return urlObj.searchParams.get('v') || ''
}

async function fetchVideoTitle(videoId: string): Promise<string> {
  const response = await fetch(
    `${YOUTUBE_API_URL}?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`
  )
  const data = await response.json()

  if (data.items && data.items.length > 0) {
    return data.items[0].snippet.title
  }

  return 'Unknown Title'
}

function extractThumbnailUrl(url: string) {
  const videoId = extractVideoIdFromUrl(url)
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export default function PlaylistDetail({
  showComments,
  showLockIcon,
  showEditButton
}: {
  showComments?: boolean
  showLockIcon?: boolean
  showEditButton?: boolean
  playlist?: typeof Playlist
}) {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { id } = useParams()
  const { data: playlistData, isLoading } = useFetchPlaylist(id as string)
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [videoTitles, setVideoTitles] = useState<string[]>([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const openEdit = () => setIsEditOpen(true)
  const closeEdit = () => setIsEditOpen(false)
  const user = auth.currentUser
  const ItemRef = useRef<HTMLDivElement | null>(null) // 드래그앤드롭을 위한 거
  const db = getFirestore() // 드래그 추가
  const isOwner = user?.uid === playlistData?.userId

  useEffect(() => {
    setTitle('Playlist Detail')
  }, [setTitle])

  useEffect(() => {
    if (playlistData && playlistData.urls.length > 0) {
      setCurrentVideoUrl(playlistData.urls[0])

      const fetchTitles = async () => {
        const videoIds = playlistData.urls.map(url =>
          extractVideoIdFromUrl(url)
        )
        const titles = await Promise.all(
          videoIds.map(id => fetchVideoTitle(id))
        )
        setVideoTitles(titles) // 제목 배열 상태로 설정
      }

      fetchTitles()
    }
  }, [playlistData])

  useEffect(() => {
    if (!ItemRef.current || !playlistData || !playlistData.urls || !isOwner)
      return // 소유자가 아닐 경우 초기화하지 않음
    console.log('Sortable 초기화 완료:', playlistData.urls)

    new Sortable(ItemRef.current, {
      handle: '.drag-handle',
      animation: 150,
      forceFallback: false,
      onEnd: async event => {
        if (event.oldIndex === undefined || event.newIndex === undefined) return
        console.log(
          '드래그앤드롭 이벤트 발생:',
          event.oldIndex,
          '->',
          event.newIndex
        )

        const newUrls = Array.from(playlistData.urls)
        const [movedItem] = newUrls.splice(event.oldIndex, 1)
        newUrls.splice(event.newIndex, 0, movedItem)
        console.log('변경된 URL 배열:', newUrls)

        // Firestore에 업데이트
        if (id) {
          const playlistRef = doc(db, 'Playlists', id)
          await updateDoc(playlistRef, {
            urls: newUrls
          })
          console.log('Firestore에 업데이트 완료')
        }

        // 상태를 업데이트하여 UI에 즉시 반영
        setCurrentVideoUrl(newUrls[0])
        console.log('현재 재생 중인 비디오 URL 업데이트:', newUrls[0])
      }
    })
  }, [playlistData, id, db, isOwner])

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (!playlistData || !playlistData.urls) {
    return <div>플레이리스트 데이터를 가져오지 못했습니다.</div>
  }

  return (
    <div>
      <div css={sectionOneContainer}>
        {currentVideoUrl ? (
          <iframe
            width="100%"
            height="240px"
            src={currentVideoUrl.replace('watch?v=', 'embed/')}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
            key={currentVideoUrl}></iframe>
        ) : (
          <p>비디오가 없습니다.</p>
        )}
      </div>

      <div css={sectionTwoContainer}>
        <div css={titleSectionStyle}>
          <h2 css={titleStyle}>{playlistData.title}</h2>
          {showEditButton && <button onClick={openEdit}>편집</button>}
        </div>
        <AnimatePresence>
          {isEditOpen && <EditPlaylist closeEdit={closeEdit} />}
        </AnimatePresence>
        <div css={otherInfoStyle}>
          {showLockIcon && (
            <div css={lockStyle}>
              <CgLockUnlock />
              <span className="Lock">비공개/공개</span>
            </div>
          )}
          <span css={timeRecordStyle}>
            {dayjs(playlistData.createdAt).fromNow()}
          </span>
        </div>

        <div css={buttonContainerStyle}>
          <Category
            selectedCategories={[]}
            onSelectCategory={() => {}}
          />
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
        <CgPlayList className="cgPlaylist" />
        재생목록 ({playlistData.urls.length})
      </div>
      <div
        css={videoContainerStyle}
        ref={ItemRef}>
        {playlistData?.urls.map((url, index) => (
          <div
            key={index}
            css={videoInfoLayoutStyle}>
            <img
              src={extractThumbnailUrl(url)}
              alt={`Video thumbnail ${index + 1}`}
              width="80"
              height="60"
              onClick={() => setCurrentVideoUrl(url)}
              style={{ cursor: 'pointer', borderRadius: '8px' }}
            />
            <span css={videoTitleStyle}>
              {videoTitles[index] || '제목 로딩 중...'}
            </span>
            {isOwner && (
              <CgFormatJustify
                css={dragIconStyle}
                className="drag-handle"
                style={{ cursor: 'ns-resize', borderRadius: '8px' }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="nav-margin"></div>
    </div>
  )
}

// CSS 스타일은 기존과 동일하게 유지
const sectionOneContainer = css`
  iframe {
  }
`

const sectionTwoContainer = css`
  border-bottom: 1px solid ${theme.colors.lightGrey};
`

const titleSectionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
`

const titleStyle = css`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.black};
  margin-top: 20px;
  margin-bottom: 10px;
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
  .cgPlaylist {
    font-size: 30px;
  }
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
  font-size: ${theme.fontSize.md};
  text-align: right;
  align-self: center;
`

const otherInfoStyle = css`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: ${theme.colors.darkGrey};
  align-self: center;
  gap: 10px;
`

const lockStyle = css`
  font-size: ${theme.fontSize.md};
  display: flex;
  gap: 5px;
`

const videoContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  margin-top: 10px;
  gap: 20px;
`

const videoInfoLayoutStyle = css`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`

const videoTitleStyle = css`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`

const dragIconStyle = css`
  flex-shrink: 0;
`
