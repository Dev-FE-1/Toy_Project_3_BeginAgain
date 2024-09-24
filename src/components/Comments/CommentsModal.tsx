import { useState } from 'react'
import { useCreateComment } from '@/hooks/useCreateComment'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import type { Comment } from '@/hooks/useFetchComments'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { CgCloseO, CgTrash } from 'react-icons/cg'

interface CommentsModalProps {
  comments: Comment[]
  onClose: () => void
  userData: {
    photoURL: string
    displayName?: string
  }
  playlistId: string
}

const CommentModal: React.FC<CommentsModalProps> = ({
  comments,
  onClose,
  playlistId
}) => {
  const [comment, setComment] = useState('')
  const { mutate: createComment } = useCreateComment()
  const { mutate: deleteComment } = useDeleteComment()

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }
  const handleCommentSubmit = () => {
    console.log('comment!!', comment)
    if (comment.trim() === '') return
    if (!playlistId) {
      console.error('playlistId is undefined')
      return
    }
    createComment({ comment, playlistId })
    setComment('')
  }

  const handleCommentDelete = (commentId: string) => {
    deleteComment({ commentId, playlistId })
  }

  return (
    <div css={modalOverlayStyle}>
      <div css={modalContainerStyle}>
        <div css={headerContainerStyle}>
          <h1 css={modalTitleStyle}>댓글</h1>
          <CgCloseO
            onClick={onClose}
            css={closeButtonStyle}
          />
        </div>
        <hr css={dividerStyle} />
        <div css={commentsContainerStyle}>
          {comments.length === 0 ? (
            <p css={noCommentsStyle}>
              아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
            </p>
          ) : (
            comments.map(comment => (
              <div
                key={comment.id}
                css={commentItemStyle}>
                <img
                  src={comment.user.photoURL || '/default-profile.png'}
                  alt={comment.user.displayName || 'User'}
                  css={profileImageStyle}
                />
                <span css={usernameStyle}>{comment.user.displayName}</span>
                <div css={commentContentStyle}>
                  <p>{comment.content}</p>
                </div>
                <CgTrash
                  onClick={() => handleCommentDelete(comment.id)}
                  css={deleteButtonStyle}
                />
              </div>
            ))
          )}
        </div>
        <div css={inputContainerStyle}>
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력해 주세요."
            css={inputStyle}
          />
          <button
            onClick={handleCommentSubmit}
            css={submitButtonStyle}>
            전송
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentModal

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const modalContainerStyle = css`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 430px;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-height: calc(100vh - 220px);
  overflow-y: auto;
  position: relative;
`
const headerContainerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
`
const modalTitleStyle = css`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semiBold};
  text-align: center;
  flex: 1;
`

const closeButtonStyle = css`
  color: ${theme.colors.charcoalGrey};
  cursor: pointer;
  font-size: ${theme.fontSize.lg};

  &:hover {
    color: ${theme.colors.lightBlue};
  }
`

const dividerStyle = css`
  border: none;
  border-top: 1px solid ${theme.colors.lightGrey};
  margin: 20px 0;
`

const commentsContainerStyle = css`
  margin-bottom: 20px;
`

const commentItemStyle = css`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  position: relative;
`

const profileImageStyle = css`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
`

const commentContentStyle = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  color: ${theme.colors.black};
`

const usernameStyle = css`
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.charcoalGrey};
  margin-bottom: 5px;
`

const noCommentsStyle = css`
  text-align: center;
  color: ${theme.colors.grey};
`

const inputContainerStyle = css`
  display: flex;
  align-items: center;
`

const inputStyle = css`
  flex: 1;
  padding: 10px;
  margin-left: 10px;
  border: 0px solid ${theme.colors.grey};
  border-radius: 4px;
  background-color: ${theme.colors.lightGrey};
`

const submitButtonStyle = css`
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  background-color: ${theme.colors.lightBlue};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${theme.fontSize.xs};

  &:hover {
    background-color: ${theme.colors.skyBlue};
  }
`

const deleteButtonStyle = css`
  position: absolute;
  right: 0;
  width: 18px;
  height: 18px;
  border: none;
  background-color: transparent;
  color: ${theme.colors.charcoalGrey};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.lightBlue};
  }
`
