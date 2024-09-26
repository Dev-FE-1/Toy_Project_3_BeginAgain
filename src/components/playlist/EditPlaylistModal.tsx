import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { CgClose } from 'react-icons/cg'
import theme from '@/styles/theme'
import LongButton from '@/components/common/LongButton'
import { useDeleteVideo } from '@/hooks/useDeleteVideo'
import { Playlist } from '@/hooks/useFetchPlaylists'

interface PlayListProps {
  closeEdit: () => void
  playlist: Playlist
  videoUrl?: string
}

const EditPlaylist = ({ closeEdit, playlist, videoUrl }: PlayListProps) => {
  const pageEffect = {
    hidden: {
      opacity: 0,
      transform: 'translateY(100%)'
    },
    visible: {
      opacity: 1,
      transform: 'translateY(0%)',
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transform: 'translateY(100%)',
      transition: {
        duration: 0.3
      }
    }
  }

  const overlayEffect = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  const deleteVideo = useDeleteVideo()

  const handleDelete = async () => {
    try {
      console.log('삭제할 비디오 URL:', videoUrl)
      deleteVideo.mutate({
        playlist,
        videoUrl: videoUrl ?? ''
      })

      closeEdit()
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayEffect}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2
        }}
      />
      <motion.div
        className="editPage"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={pageEffect}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 3
        }}>
        <div css={EditModalContainerStyle}>
          <button
            css={cancelButtonStyle}
            onClick={closeEdit}>
            <CgClose fontSize={theme.fontSize.lg} />
          </button>
          <div css={longButtonStyle}>
            <LongButton onClick={handleDelete}>동영상 삭제</LongButton>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default EditPlaylist

const EditModalContainerStyle = css`
  background: white;
  padding: 20px;
  border-radius: 35px 35px 0 0;
  width: 430px;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-height: calc(100vh - 426px);
  overflow-y: auto;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  height: 200px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const cancelButtonStyle = css`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 24px;
  height: 24px;
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
