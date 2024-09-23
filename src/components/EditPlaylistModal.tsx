import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CgClose } from 'react-icons/cg'
import theme from '@/styles/theme'
import LongButton from '@/components/common/LongButton'

const EditPlaylist = ({ closeEdit }: { closeEdit: () => void }) => {
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

  const navigate = useNavigate()

  const handleEditInfo = () => {
    navigate('/edit-playlist')
  }
  const handleDelete = () => {
    navigate('/delete-videos')
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
        height: '160px',
        zIndex: 3
      }}>
      <>
        <div css={EditPageContainerStyle}>
          <button
            css={cancelButtonStyle}
            onClick={closeEdit}>
            <CgClose />
          </button>
          <div css={longButtonStyle}>
            <LongButton onClick={handleEditInfo}>정보 수정</LongButton>
            <LongButton onClick={handleDelete}>동영상 삭제</LongButton>
          </div>
        </div>
      </>
    </motion.div>
  )
}

export default EditPlaylist

const EditPageContainerStyle = css`
  height: 100%;
  width: auto;
  background-color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 45px 45px 0 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  align-items: center;
`

const cancelButtonStyle = css`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 20px;
  left: 20px;
  border: none;
  background-color: transparent;
`

const longButtonStyle = css`
  display: flex;
  gap: 13px;
  flex-direction: column;
  margin-top: 20px;
`
