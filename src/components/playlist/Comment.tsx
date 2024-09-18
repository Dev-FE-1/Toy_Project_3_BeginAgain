import { useState } from 'react'
import { useCreateComment } from '@/hooks/useCreateComment'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { useFetchComments } from '@/hooks/useFetchComments'
import { css } from '@emotion/react'
import theme from '@/styles/theme'

interface CommentProps {
  playlistId: string
}

const Comment: React.FC<CommentProps> = ({ playlistId }) => {
  const [comment, setComment] = useState('')
  const { mutate: createComment } = useCreateComment()
  const { mutate: deleteComment } = useDeleteComment()
  const { data: comments, isLoading } = useFetchComments(playlistId)

  const addComment = () => {
    createComment({ comment, playlistId })
    setComment('')
  }

  if (isLoading) {
    return <div>댓글 로딩 중...</div>
  }

  return (
    <div css={sectionFourContainer}>
      <div className="comment">
        <p>댓글</p>
        <input
          type="text"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button onClick={addComment}>댓글 추가</button>
      </div>

      {comments &&
        comments.map(comment => (
          <div
            key={comment.id}
            css={commentContainerStyle}>
            <img
              src={comment.user.photoURL || '/default-profile.png'}
              alt={comment.user.displayName || 'User'}
              width="20"
            />
            <span>{comment.user.displayName}</span>
            <span>{comment.content}</span>
            <button
              onClick={() =>
                deleteComment({ commentId: comment.id, playlistId })
              }>
              삭제
            </button>
          </div>
        ))}
    </div>
  )
}

export default Comment

const sectionFourContainer = css`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.black};
  margin: 10px 0;
  background-color: ${theme.colors.lightGrey};
  border-radius: 8px;
  padding: 20px;
`

const commentContainerStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
