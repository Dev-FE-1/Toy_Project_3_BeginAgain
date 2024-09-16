import { css } from '@emotion/react'
import { FontSize } from '@/styles/Theme'
import { Colors } from '@/styles/Theme'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { useState } from 'react'
import { useDeletePlaylist } from '@/hooks/useDeletePlaylist'
import { useUpdatePlaylist } from '@/hooks/useUpdatePlaylist'
import { CgTrash, CgLock, CgLockUnlock } from 'react-icons/cg'
import Toast from '@/components/common/Toast'
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

export default function SavedPlaylists({ feed }: { feed: PlayList }) {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isToastVisible, setIsToastVisible] = useState(false)
  const auth = getAuth()
  const user = auth.currentUser
  const { mutate: updatePlayList } = useUpdatePlaylist()
  const { mutate: deletePlayList } = useDeletePlaylist()

  const handleDelete = () => {
    deletePlayList(feed)
    setIsModalOpen(false)
    setIsToastVisible(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIsToastVisible(false)
  }

  function extractVideoId(url: string) {
    return url.replace('https://www.youtube.com/watch?v=', '')
  }

  return (
    <>
      <div css={feedStyle}>
        <div css={thumbnailBackgroundStyle}></div>
        <div
          onClick={() => navigate(`/playlist-details/${feed.id}`)}
          css={thumbnailImageStyle}>
          <img
            css={thumbnailStyle}
            width="100%"
            src={`https://img.youtube.com/vi/${extractVideoId(feed.urls[0])}/maxresdefault.jpg`}
            alt=""
          />
        </div>

        <div css={playlistInfoLayoutStyle}>
          <div css={infoLeftStyle}>
            <p css={titleStyle}>{feed.title}</p>
            <p>{feed.description}</p>
          </div>
          <div css={infoRightStyle}>
            <div css={buttonStyle}>
              <CgLock onClick={() => updatePlayList(feed)} />
              {/* <CgLockUnlock /> */}
              {/* 공개/비공개 여부에 따라 lock/unlock 아이콘 변경되는 로직 추가 필요 */}
              <CgTrash
                onClick={() => setIsModalOpen(true)}
                className="trashIcon"
              />
            </div>
            <span css={timeRecordStyle}>{dayjs(feed.createdAt).fromNow()}</span>
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

      {isToastVisible && (
        <Toast
          message="플레이리스트가 삭제되었습니다."
          isVisible={isToastVisible}
          onHide={() => setIsToastVisible(false)}
        />
      )}
    </>
  )
}

const infoLeftStyle = css`
  font-size: ${FontSize.md};
  margin-bottom: 10px;
  font-weight: 500;
`

const infoRightStyle = css`
  gap: 7px;
  display: flex;
  flex-direction: column;
`

const feedStyle = css`
  padding: 20px;
`

const thumbnailStyle = css`
  margin-bottom: 15px;
  border-radius: 5px;
`

const thumbnailBackgroundStyle = css`
  border-radius: 12px 12px 0px 0px;
  background: ${Colors.lightGrey};
  height: 9px;
  width: 95%;
  margin: 0 10px;
`

const thumbnailImageStyle = css`
  cursor: pointer;
`

const titleStyle = css`
  font-size: ${FontSize.lg};
  margin: 0;
  margin-bottom: 10px;
  font-weight: 500;
`
const timeRecordStyle = css`
  color: ${Colors.darkGrey};
  font-size: ${FontSize.sm};
  text-align: right;
`

const playlistInfoLayoutStyle = css`
  display: flex;
  justify-content: space-between;
`

const buttonStyle = css`
  font-size: ${FontSize.xxl};
  color: ${Colors.charcoalGrey};
  display: flex;
  gap: 10px;
  align-items: center;

  .trashIcon {
    cursor: pointer;
  }
`