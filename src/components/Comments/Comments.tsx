import { useState } from 'react'
import { useFetchComments } from '@/hooks/useFetchComments'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import CommentsModal from './CommentsModal'

interface CommentsProps {
  playlistId: string
}

const Comment: React.FC<CommentsProps> = ({ playlistId }) => {
  const { data: comments, isLoading, isError } = useFetchComments(playlistId)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  if (isLoading) {
    return <div>댓글 로딩 중...</div>
  }

  if (isError) {
    return <div>댓글 로딩 오류: {isError.message}</div>
  }

  const commentCount = comments ? comments.length : 0
  const recentComment = comments && comments.length > 0 ? comments[0] : null

  return (
    <div css={sectionFourContainer}>
      <div
        css={headerStyle}
        onClick={openModal}>
        <h1>댓글</h1>
        <span>{commentCount}개</span>
      </div>
      {recentComment && (
        <div css={commentContainerStyle}>
          <img
            src={recentComment.user.photoURL || '/default-profile.png'}
            alt={recentComment.user.displayName || 'User'}
            width="20"
          />
          <span>{recentComment.user.displayName}</span>
          <span>{recentComment.content}</span>
        </div>
      )}
      {isModalOpen && (
        <CommentsModal
          comments={comments}
          onClose={closeModal}
          myProfile={{ photoURL: '/my-profile.png' }}
        />
      )}
    </div>
  )
}

export default Comment

const sectionFourContainer = css`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.black};
  margin: 20px 20px;
  background-color: ${theme.colors.lightGrey};
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
`

const headerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.black};
  h1 {
    margin-right: 10px;
    font-weight: ${theme.fontWeight.semiBold};
  }
`

const commentContainerStyle = css`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  border-radius: 4px;
  padding: 10px;
  border: 1px solid ${theme.colors.grey};
`
