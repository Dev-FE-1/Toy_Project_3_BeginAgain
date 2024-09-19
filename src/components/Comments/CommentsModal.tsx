import { useState } from 'react'
import { useCreateComment } from '@/hooks/useCreateComment'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { css } from '@emotion/react'
import theme from '@/styles/theme'

interface CommentsModalProps {
  comments: Array<{
    id: string
    user: {
      photoURL: string
      displayName: string
    }
    content: string
  }>
  onClose: () => void
  myProfile: {
    photoURL: string
  }
  playlistId: string
}

const CommentModal: React.FC<CommentsModalProps> = ({
  comments,
  onClose,
  myProfile,
  playlistId
}) => {
  const [comment, setComment] = useState('')
  const { mutate: createComment } = useCreateComment()
  const { mutate: deleteComment } = useDeleteComment()

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleCommentSubmit = () => {
    if (!playlistId) {
      console.error('playlistId is undefined')
      return
    }
    createComment({ comment, playlistId })
    setComment('')
  }

  const handleCommentDelete = (commentId: string) => {
    if (!playlistId) {
      console.error('playlistId is undefined')
      return
    }
    deleteComment({ commentId, playlistId })
  }

  return (
    <div css={modalOverlayStyle}>
      <div css={modalContainerStyle}>
        <h1>댓글</h1>
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
                <div css={commentContentStyle}>
                  <span css={usernameStyle}>{comment.user.displayName}</span>
                  <p>{comment.content}</p>
                </div>
                <button
                  onClick={() => handleCommentDelete(comment.id)}
                  css={deleteButtonStyle}>
                  삭제
                </button>
              </div>
            ))
          )}
        </div>
        <div css={inputContainerStyle}>
          <img
            src={myProfile.photoURL || '/default-profile.png'}
            alt="My Profile"
            css={profileImageStyle}
          />
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
            제출
          </button>
        </div>
        <button
          onClick={onClose}
          css={closeButtonStyle}>
          닫기
        </button>
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
`

const usernameStyle = css`
  font-weight: ${theme.fontWeight.bold};
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
  padding: 10px 20px;
  border: none;
  background-color: ${theme.colors.lightBlue};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.lightBlue};
  }
`

const closeButtonStyle = css`
  display: block;
  margin: 10px auto 0;
  padding: 10px;
  border: none;
  background-color: ${theme.colors.lightBlue};
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.lightBlue};
  }
`

const deleteButtonStyle = css`
  position: absolute;
  right: 0;
  border: none;
  background-color: transparent;
  color: ${theme.colors.red};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.lightBlue};
  }
`
