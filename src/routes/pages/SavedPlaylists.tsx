import { CgProfile } from 'react-icons/cg'
import { css } from '@emotion/react'
import { FontSize } from '@/styles/Theme'
import { Colors } from '@/styles/Theme'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useDeletePlaylist } from '@/hooks/useDeletePlaylist'
import { useUpdatePlaylist } from '@/hooks/useUpdatePlaylist'
import { CgTrash, CgLock, CgLockUnlock } from 'react-icons/cg'
import Modal from '@/components/common/TheModal'
import { useState } from 'react'

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

export default function SavedPlaylists({ feed }: { feed: PlayList }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  const auth = getAuth()
  const user = auth.currentUser
  const { mutate: updatePlayList } = useUpdatePlaylist()
  const { mutate: deletePlayList } = useDeletePlaylist()

  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)

  const handleDelete = () => {
    deletePlayList(feed.id)
    closeModal() // 모달을 닫습니다.
  }

  function extractVideoId(url: string) {
    return url.replace('https://www.youtube.com/watch?v=', '')
  }

  return (
    <div css={feedStyle}>
      <div css={headerStyle}>
        <CgProfile css={profileIconStyle} />
        <span css={headerTextStyle}>{feed.id}</span>
      </div>

      <div css={thumbnailBackgroundStyle}></div>
      <div onClick={() => navigate(`/playlist-details/${feed.id}`)}>
        <img
          css={thumbnailStyle}
          width="100%"
          src={`https://img.youtube.com/vi/${extractVideoId(feed.urls[0])}/maxresdefault.jpg`}
          alt=""
        />
      </div>

      <div>
        <p css={titleStyle}>{feed.title}</p>
        <p css={descriptionStyle}>{feed.description}</p>
      </div>
      <CgTrash onClick={openModal} />

      <span css={timeRecordStyle}>
        {dayjs(feed.createdAt).format('YYYY년 M월 DD와우 HH시 mm분 ss초')}
      </span>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  )
}

const descriptionStyle = css`
  font-size: ${FontSize.md};
  margin-bottom: 10px;
`

const feedStyle = css`
  padding: 20px;
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
  border-radius: 5px;
`

const thumbnailBackgroundStyle = css`
  border-radius: 12px 12px 0px 0px;
  background: ${Colors.lightGrey};
  height: 9px;
  width: 95%;
  margin: 0 10px;
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

const titleStyle = css`
  font-size: ${FontSize.lg};
  margin: 0;
  margin-bottom: 10px;
`
const timeRecordStyle = css`
  color: ${Colors.darkGrey};
  font-size: ${FontSize.sm};
`

const playlistInfoLayoutStyle = css`
  display: flex;
  justify-content: space-between;
`

const buttonStyle = css`
  font-size: ${FontSize.xl};
  color: ${Colors.charcoalGrey};
  display: flex;
  gap: 10px;
`
