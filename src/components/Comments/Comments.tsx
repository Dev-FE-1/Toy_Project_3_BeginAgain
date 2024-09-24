import { useState } from 'react'
import { useFetchComments } from '@/hooks/useFetchComments'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import CommentsModal from '@/components/comments/CommentsModal'

const sectionContainer = css`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.black};
  margin: 20px 20px;
  background-color: ${theme.colors.lightGrey};
  border-radius: 8px;
  padding: 20px;
`

const headerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.black};
  cursor: pointer;
  h1 {
    margin-right: 10px;
    font-weight: ${theme.fontWeight.semiBold};
  }
`

const commentContainerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const recentUserImageStyle = css`
  border-radius: 50%;
  width: 24px;
  height: 24px;
`

const recentCommentStyle = css`
  margin-left: 10px;
`

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
    return <div>댓글 로딩 오류: {isError}</div>
  }

  const commentCount = comments ? comments.length : 0
  const recentComment = comments && comments.length > 0 ? comments[0] : null

  return (
    <div css={sectionContainer}>
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
            css={recentUserImageStyle}
          />
          <span css={recentCommentStyle}>{recentComment.content}</span>
        </div>
      )}
      {isModalOpen && (
        <CommentsModal
          comments={comments || []}
          onClose={closeModal}
          myProfile={{ photoURL: '/my-profile.png' }}
          playlistId={playlistId}
        />
      )}
    </div>
  )
}

export default Comment
