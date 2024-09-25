import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { Playlist } from '@/hooks/useFetchPlaylist'
import { CgClose } from 'react-icons/cg'
import theme from '@/styles/theme'
import LongButton from '@/components/common/LongButton'
import { useDeleteVideo } from '@/hooks/useDeleteVideo'

interface PlayListProps {
  closeEdit: () => void
  playlist: Playlist // 부모 컴포넌트로부터 playlist 전달 받음
}

const EditPlaylist = ({ closeEdit, playlist }: PlayListProps) => {
  const pageEffect = {
    hidden: {
      opacity: 0,
      y: '100vh'
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      y: '100vh',
      transition: {
        duration: 1
      }
    }
  }

  const deleteVideo = useDeleteVideo()

  const handleDelete = async (playlist: Playlist) => {
    if (!playlist || !playlist.urls || playlist.urls.length === 0) {
      return
    }

    try {
      // 첫 번째 비디오 URL을 삭제
      deleteVideo.mutate({
        playlist,
        videoUrl: playlist.urls[0] // 삭제할 비디오 URL (첫 번째 요소)
      })

      closeEdit() // 모달 닫기
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  return (
    <motion.div
      className="editPage"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageEffect}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '200px',
        zIndex: 3
      }}>
      <>
        <div css={bgStyle}></div>
        <div css={EditModalContainerStyle}>
          <button
            css={cancelButtonStyle}
            onClick={closeEdit}>
            <CgClose fontSize={theme.fontSize.lg} />
          </button>
          <div css={longButtonStyle}>
            <LongButton onClick={() => handleDelete(playlist)}>
              동영상 삭제
            </LongButton>
          </div>
        </div>
      </>
    </motion.div>
  )
}

export default EditPlaylist

const bgStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
`

const EditModalContainerStyle = css`
  height: 100%;
  width: 430px;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 35px 35px 0 0;
  padding: 20px;
  align-items: center;
  justify-content: center;
`

const cancelButtonStyle = css`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  left: 20px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${theme.colors.charcoalGrey};
  &:hover {
    color: ${theme.colors.lightBlue};
  }
`

const longButtonStyle = css`
  display: flex;
  gap: 15px;
  flex-direction: column;
  margin-top: 20px;
  &:hover {
    background-color: ${theme.colors.skyBlue};
  }
`
