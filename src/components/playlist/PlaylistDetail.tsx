import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import {
  CgChevronUp,
  CgChevronDown,
  CgPlayList,
  CgFormatJustify,
  CgLockUnlock,
  CgLock
} from 'react-icons/cg'
import { GoKebabHorizontal } from 'react-icons/go'
import { FaPencilAlt } from 'react-icons/fa'
import EditPlaylistModal from '@/components/playlist/EditPlaylistModal'
import Comment from '@/components/Comments/Comments'
import { AnimatePresence } from 'framer-motion'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { auth } from '@/api/firebaseApp'
import Sortable from 'sortablejs'
import 'dayjs/locale/ko'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useFetchPlaylistById } from '@/hooks/useFetchPlaylistById'
import { useDeleteVideo } from '@/hooks/useDeleteVideo'

dayjs.locale('ko')
dayjs.extend(relativeTime)

// 비디오 ID를 URL에서 추출하는 함수
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

// 비디오 제목을 가져오는 함수
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

  return 'Unknown Title' // 제목을 알 수 없으면 기본값 반환
}

// 썸네일 URL을 추출하는 함수
function extractThumbnailUrl(url: string) {
  const videoId = extractVideoIdFromUrl(url)
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// PlaylistDetail 컴포넌트 정의
export default function PlaylistDetail({
  showComments,
  showLockIcon,
  showEditButton
}: {
  showComments?: boolean
  showLockIcon?: boolean
  showEditButton?: boolean
}) {
  const setTitle = useHeaderStore(state => state.setTitle)
  const navigate = useNavigate()
  const { id } = useParams() // URL 파라미터에서 id 추출
  const { data: playlistData, isLoading, error } = useFetchPlaylistById(id) // 플레이리스트 데이터 가져오기
  const deleteVideo = useDeleteVideo()

  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null)
  const [videoTitles, setVideoTitles] = useState<string[]>([])

  const user = auth.currentUser
  const ItemRef = useRef<HTMLDivElement | null>(null)
  const db = getFirestore()
  const isOwner = user?.uid === playlistData?.userId

  // 컴포넌트가 처음 렌더링될 때 제목 설정
  useEffect(() => {
    setTitle('플레이리스트 상세보기')
  }, [setTitle])

  // 비디오 제목 가져오기
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
        setVideoTitles(titles)
      }

      fetchTitles()
    }
  }, [playlistData])

  // 드래그 앤 드롭 기능 설정
  useEffect(() => {
    if (!ItemRef.current || !playlistData || !playlistData.urls || !isOwner)
      return

    const sortable = new Sortable(ItemRef.current, {
      handle: '.handle',
      animation: 150,
      onEnd: async event => {
        if (event.oldIndex === undefined || event.newIndex === undefined) return

        const newUrls: string[] = Array.from(playlistData.urls)
        const [movedItem] = newUrls.splice(event.oldIndex, 1)
        newUrls.splice(event.newIndex, 0, movedItem)

        if (id) {
          const playlistRef = doc(db, 'Playlists', id)
          await updateDoc(playlistRef, {
            urls: newUrls
          })
        }

        setCurrentVideoUrl(newUrls[0] as string)
      }
    })

    return () => {
      sortable.destroy()
    }
  }, [playlistData, id, db, isOwner])

  // 삭제 모달 열기, 닫기
  const openDeleteModal = (url: string) => {
    setIsDeleteModalOpen(true)
    setSelectedVideoUrl(url)
  }
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setSelectedVideoUrl(null)
  }

  // 비디오 삭제 핸들러
  const handleDelete = async (videoUrl: string) => {
    try {
      await deleteVideo.mutateAsync({
        playlist: playlistData,
        videoUrl
      })
      closeDeleteModal()
      // 필요한 경우 여기에 추가적인 UI 업데이트 로직을 넣을 수 있습니다
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (error || !playlistData || !playlistData.urls) {
    return <div>플레이리스트 데이터를 가져오지 못했습니다.</div>
  }

  return (
    <div>
      <div className="nav-margin-top"></div>
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
          {showEditButton && (
            <FaPencilAlt
              onClick={() =>
                navigate(`/edit-playlist/${playlistData.id}`, {
                  state: { playlist: playlistData }
                })
              }
              css={editButtonStyle}
            />
          )}
        </div>

        <div css={topContainerStyle}>
          <div css={buttonContainerStyle(showLockIcon || false)}>
            {showLockIcon && (
              <div css={lockStyle}>
                {playlistData.isPublic ? (
                  <>
                    <CgLockUnlock />
                    <span>공개 / </span>
                  </>
                ) : (
                  <>
                    <CgLock />
                    <span>비공개 / </span>
                  </>
                )}
              </div>
            )}
            <span css={timeRecordStyle}>
              {dayjs(playlistData.createdAt).fromNow()}
            </span>
          </div>
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
        {user && showComments && (
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

      {showComments && <Comment playlistId={playlistData.id} />}

      <div css={plAmountInfoStyle}>
        <CgPlayList className="cgPlaylist" />
        재생목록 ({playlistData.urls.length})
      </div>

      <div
        css={videoContainerStyle(isOwner)}
        ref={ItemRef}>
        {playlistData?.urls.map((url, index) => (
          <div
            key={url}
            css={videoInfoLayoutStyle(isOwner)}>
            {!showComments && (
              <CgFormatJustify
                css={dragIconStyle}
                className="handle"
                style={{ cursor: 'grab', borderRadius: '8px' }}
              />
            )}
            <img
              src={extractThumbnailUrl(url)}
              alt={`Video thumbnail ${index + 1}`}
              width="80"
              height="60"
              onClick={() => setCurrentVideoUrl(url)}
              style={{ cursor: 'pointer', borderRadius: '8px' }}
            />
            <span css={videoTitleStyle(isOwner)}>
              {videoTitles[index] || '제목 로딩 중...'}
            </span>
            {!showComments && (
              <GoKebabHorizontal
                css={iconStyle}
                onClick={() => {
                  openDeleteModal(url) // 삭제 모달 열기
                }}
              />
            )}
            <AnimatePresence>
              {isDeleteModalOpen && selectedVideoUrl === url && (
                <EditPlaylistModal
                  closeEdit={closeDeleteModal}
                  playlist={playlistData}
                  videoUrl={selectedVideoUrl}
                  onDelete={() => handleDelete(selectedVideoUrl)}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="nav-margin-bottom"></div>
    </div>
  )
}

const iconStyle = css`
  cursor: pointer;
  transform: rotate(90deg);
  align-self: flex-start;
  justify-self: flex-end;
`
const sectionOneContainer = css`
  object-fix: cover;
`

const sectionTwoContainer = css`
  border-bottom: 1px solid ${theme.colors.lightGrey};
`

const titleSectionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`

const titleStyle = css`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.black};
  margin-top: 20px;
  margin-bottom: 10px;
`

const buttonStyle = css`
  display: flex;
  justify-content: flex-end;
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

const buttonContainerStyle = (showLockIcon: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: ${showLockIcon ? 'space-between' : 'flex-end'};
  margin-right: 20px;
  margin-left: 20px;
  color: ${theme.colors.charcoalGrey};
  padding: ${showLockIcon ? '10px 0 10px 0' : '0'};
  gap: ${showLockIcon ? '5px' : '0'};
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
  margin-left: 20px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  margin-left: 20px;
`

const profileImageStyle = css`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  border-radius: 50%;
  object-fit: cover;
`

const timeRecordStyle = css`
  color: ${theme.colors.charcoalGrey};
  font-size: ${theme.fontSize.md};
  text-align: right;
  align-self: center;
`

const topContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-right: 20px;
`

const lockStyle = css`
  font-size: ${theme.fontSize.md};
  display: flex;
  gap: 5px;
  color: ${theme.colors.charcoalGrey};
`

const videoContainerStyle = (showComments: boolean) => css`
  max-height: 290px;
  overflow-y: auto;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${showComments ? '0' : '0 20px'};
  margin-top: 10px;
  gap: 5px;
  margin: ${showComments ? '0 20px 0 20px' : '10px 0'};
  object-fix: cover;
  overflow: scroll;
`

const videoInfoLayoutStyle = (showComments: boolean) => css`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  gap: ${showComments ? '8px' : '16px'};
`

const videoTitleStyle = (showComments: boolean) => css`
  flex-grow: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${showComments ? '250px' : '300px'};
  padding-right: 8px;
`

const dragIconStyle = css`
  flex-shrink: 0;
`

const editButtonStyle = css`
  font-size: ${theme.fontSize.lg};
  cursor: pointer;
  color: ${theme.colors.charcoalGrey};
`
