import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  userId: string
}

const CommentsModal: React.FC<CommentsModalProps> = ({
  comments,
  onClose,
  playlistId,
  userId
}) => {
  const [comment, setComment] = useState('')
  const [isVisible, setIsVisible] = useState(true)
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

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 500)
  }

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
        duration: 0.5
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

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="modalOverlay"
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
            className="commentsModal"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageEffect}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 3
            }}>
            <div css={modalContainerStyle}>
              <div css={headerContainerStyle}>
                <CgClose
                  onClick={handleClose}
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
                      <span css={usernameStyle}>
                        {comment.user.displayName}
                      </span>

                      <div css={commentContentStyle}>
                        <p>{comment.content}</p>
                      </div>

                      {comment.user.uid === userId && (
                        <CgTrash
                          onClick={() => handleCommentDelete(comment.id)}
                          css={deleteButtonStyle}
                        />
                      )}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CommentsModal

const modalContainerStyle = css`
  background: white;
  padding: 20px;
  border-radius: 35px 35px 0 0;
  width: 430px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-height: calc(100vh - 391px);
  overflow-y: auto;
  position: fixed;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 3;
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
  text-align: left;
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
  background: transparent;
  box-shadow: none;
  padding: 0;
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
`
