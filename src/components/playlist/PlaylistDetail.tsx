import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
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
import Playlist from '@/components/playlist/Playlist'
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
  const navigate = useNavigate()
  const { id } = useParams()
  const [playlistData, setPlaylistData] = useState<any>(null)
  const [userData, setUserData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [videoTitles, setVideoTitles] = useState<string[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModal = () => setIsDeleteModalOpen(true)
  const closeDeleteModal = () => setIsDeleteModalOpen(false)
  const user = auth.currentUser
  const ItemRef = useRef<HTMLDivElement | null>(null)
  const db = getFirestore()
  const isOwner = user?.uid === playlistData?.userId

  useEffect(() => {
    setTitle('플레이리스트 상세보기')
  }, [setTitle])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistDocRef = doc(db, 'Playlists', id!)
        const playlistSnap = await getDoc(playlistDocRef)

        if (playlistSnap.exists()) {
          setPlaylistData({ id: playlistSnap.id, ...playlistSnap.data() })
        } else {
          console.log('No matching document found in the Playlists collection.')
        }
      } catch (error) {
        console.error('Error fetching playlist data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, db])

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
    console.log('playlistData:', playlistData)
  }, [playlistData])

  useEffect(() => {
    if (!ItemRef.current || !playlistData || !playlistData.urls || !isOwner)
      return

    const sortable = new Sortable(ItemRef.current, {
      handle: '.handle',
      animation: 150,
      // forceFallback: false,
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
          setPlaylistData({ ...playlistData, urls: newUrls }) // Update local state
        }

        setCurrentVideoUrl(newUrls[0] as string)
      }
    })

    return () => {
      sortable.destroy()
    }
  }, [playlistData, id, db, isOwner])

  const handleEditClick = () => {
    navigate(`/edit-playlist/${playlistData.id}`, {
      state: { playlist: playlistData }
    })
  }

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (!playlistData || !playlistData.urls) {
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
              onClick={handleEditClick}
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
                onClick={openDeleteModal} // 삭제함수 추가 => 바텀시트로 동영상 삭제
              />
            )}
            <AnimatePresence>
              {isDeleteModalOpen && (
                <EditPlaylistModal
                  closeEdit={closeDeleteModal}
                  playlist={playlistData}
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
  max-height: 300px;
  overflow-y: auto;
  padding-right: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${showComments ? '0' : '0 20px'};
  margin-top: 10px;
  gap: 5px;
  margin: ${showComments ? '0 20px 0 20px' : '10px 0'};
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
`
