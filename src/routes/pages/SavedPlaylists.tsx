import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDeletePlaylist } from '@/hooks/useDeletePlaylist'
import { CgTrash, CgLock, CgLockUnlock } from 'react-icons/cg'
import Modal from '@/components/common/TheModal'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)

interface PlayList {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  userId: string
  createdAt: string
}

export default function SavedPlaylists({
  playlist,
  onDelete
}: {
  playlist: PlayList
  onDelete: () => void
}) {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutate: deletePlayList } = useDeletePlaylist()

  const handleDelete = () => {
    deletePlayList(playlist)
    setIsModalOpen(false)
    onDelete()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  function extractVideoId(url: string) {
    return url.replace('https://www.youtube.com/watch?v=', '')
  }

  const handlePlaylistClick = (playlist: PlayList) => {
    navigate(`/saved-playlists/${playlist.id}`, { state: { playlist } })
  }

  return (
    <>
      <div css={playlistStyle}>
        <div css={videoIdBackgroundStyle}></div>
        <div
          onClick={() => handlePlaylistClick(playlist)}
          css={videoIdImageStyle}>
          <img
            css={videoIdStyle}
            width="100%"
            src={`https://img.youtube.com/vi/${extractVideoId(playlist.urls[0])}/maxresdefault.jpg`}
            alt=""
          />
        </div>

        <div css={playlistInfoLayoutStyle}>
          <div css={infoLeftStyle}>
            <p css={titleStyle}>{playlist.title}</p>
            <p>{playlist.description}</p>
          </div>
          <div css={infoRightStyle}>
            <div css={buttonStyle}>
              {playlist.isPublic ? <CgLockUnlock /> : <CgLock />}
              <CgTrash
                onClick={() => setIsModalOpen(true)}
                className="trashIcon"
              />
            </div>
            <span css={timeRecordStyle}>
              {dayjs(playlist.createdAt).fromNow()}
            </span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
    </>
  )
}

const infoLeftStyle = css`
  font-size: ${theme.fontSize.md};
  margin-bottom: 10px;
  font-weight: 500;
`

const infoRightStyle = css`
  gap: 7px;
  display: flex;
  flex-direction: column;
`

const playlistStyle = css`
  padding: 20px;
`

const videoIdStyle = css`
  margin-bottom: 15px;
  border-radius: 5px;
`

const videoIdBackgroundStyle = css`
  border-radius: 12px 12px 0px 0px;
  background: ${theme.colors.lightGrey};
  height: 9px;
  width: 95%;
  margin: 0 10px;
`

const videoIdImageStyle = css`
  cursor: pointer;
`

const titleStyle = css`
  font-size: ${theme.fontSize.lg};
  margin: 0;
  margin-bottom: 10px;
  font-weight: 500;
`
const timeRecordStyle = css`
  color: ${theme.colors.darkGrey};
  font-size: ${theme.fontSize.sm};
  text-align: right;
`

const playlistInfoLayoutStyle = css`
  display: flex;
  justify-content: space-between;
`

const buttonStyle = css`
  font-size: ${theme.fontSize.xxl};
  color: ${theme.colors.charcoalGrey};
  display: flex;
  gap: 5px;
  align-items: center;

  .trashIcon {
    cursor: pointer;
  }
`
