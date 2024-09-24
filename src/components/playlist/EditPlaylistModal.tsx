import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Playlist } from '@/hooks/useFetchPlaylist'
import { CgClose } from 'react-icons/cg'
import theme from '@/styles/theme'
import LongButton from '@/components/common/LongButton'

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

  const navigate = useNavigate()

  // EditPlaylist 컴포넌트
  // const handleEditInfo = (playlist: Playlist) => {
  //   if (!playlist) {
  //     console.error('Playlist data is missing')
  //     return
  //   }
  //   navigate(`/edit-playlist/${playlist.id}`, { state: { playlist } })
  // }

  const handleDelete = (playlist: Playlist) => {
    if (!playlist) {
      console.error('Playlist data is missing')
      return
    }
    // navigate(`/delete-videos/${playlist.id}`, { state: { playlist } })
    //     1. 파베에 해당 클릭한 동영상만 찾아서 삭제 후 나머지 것들을 리턴하는 api를 호출 (이제 만들어야함) await 파베삭제api(클릭한 영상의 아이디)
    // 2. 호출의 결과로 리턴한 결과값을 받아와야지
    console.log(`해당 플레이리스트가 삭제되었습니다.`)
    closeEdit() // 모달 닫기
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
            {/* <LongButton onClick={() => handleEditInfo(playlist)}>
              정보 수정
            </LongButton> */}
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
`

const longButtonStyle = css`
  display: flex;
  gap: 15px;
  flex-direction: column;
  margin-top: 20px;
`
