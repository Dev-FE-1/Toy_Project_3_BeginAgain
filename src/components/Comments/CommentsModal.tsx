import { useState } from 'react'
import { useCreateComment } from '@/hooks/useCreateComment'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import type { Comment } from '@/hooks/useFetchComments'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { CgClose, CgTrash } from 'react-icons/cg'

interface CommentsModalProps {
  comments: Comment[]
  onClose: () => void
  userData: {
    photoURL: string
    displayName?: string
  }
  playlistId: string
}

const CommentsModal: React.FC<CommentsModalProps> = ({
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
          <CgClose
            onClick={onClose}
            css={closeButtonStyle}
          />
          <h1 css={modalTitleStyle}>댓글</h1>
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

export default CommentsModal

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
  z-index: 3;
`

const modalContainerStyle = css`
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
  height: 100%;
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

const commentContentStyle = css`
  flex: 1;
  display: block;
  padding-right: 40px;
  text-align: left;pl


`
const commentItemStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
`

const profileImageStyle = css`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
`

const usernameStyle = css`
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.charcoalGrey};
  margin: 0 10px 0 0;
`

const noCommentsStyle = css`
  text-align: center;
  color: ${theme.colors.grey};
`

const inputContainerStyle = css`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 20px;
  margin-bottom: 22px;
`

const inputStyle = css`
  flex: 1;
  padding: 10px;
  margin-left: 10px;
  border: 0px solid ${theme.colors.grey};
  border-radius: 4px;
  background-color: ${theme.colors.lightGrey};
  font-size: ${theme.fontSize.sm};
`

const submitButtonStyle = css`
  margin-left: 10px;
  padding: 10px 15px;
  border: none;
  background-color: ${theme.colors.lightBlue};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${theme.fontSize.sm};

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
