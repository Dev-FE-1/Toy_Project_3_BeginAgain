import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylist } from '@/hooks/useFetchPlaylist'
import { useFetchComments } from '@/hooks/useFetchComments'
import { useCreateComment } from '@/hooks/useCreateComment'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { CgChevronUp, CgChevronDown } from 'react-icons/cg'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { getAuth } from 'firebase/auth'

const PlaylistDetail = () => {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('Playlist Detail')
  }, [setTitle])

  const { id } = useParams()
  const { data, isLoading } = useFetchPlaylist(id as string)
  const { data: comments } = useFetchComments(id as string)
  const [comment, setComment] = useState('')
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

  const auth = getAuth()
  const user = auth.currentUser

  const { mutate: createComment } = useCreateComment()
  const { mutate: deleteComment } = useDeleteComment()

  async function addComment() {
    createComment({
      comment,
      playlistId: id as string
    })
  }

  return (
    <div css={playlistDetailContainer}>
      {isLoading && <div>비디오를 불러오는 중...</div>}

      <div css={sectionOneContainer}>
        {data?.playlist ? (
          <video
            controls
            width="100%">
            <source
              src={data.playlist}
              type="video/mp4"
            />
          </video>
        ) : (
          <p>비디오가 없습니다.</p>
        )}
      </div>

      {data && (
        <>
          <div css={sectionTwoContainer}>
            <h2 css={titleStyle}>{data.title}</h2>
            <button
              onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
              {isDescriptionVisible ? <CgChevronUp /> : <CgChevronDown />}
            </button>
            {isDescriptionVisible && (
              <p css={descriptionStyle}>{data.description}</p>
            )}
          </div>

          <div css={sectionThreeContainer}>
            {user && (
              <>
                <img
                  src={user.photoURL || ''}
                  alt={user.displayName || 'User'}
                  width="50"
                  height="50"
                  css={profileImageStyle}
                />
                <span>{user.displayName}</span>
              </>
            )}
          </div>

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
                <div key={comment.id}>
                  <img
                    src={comment.user.photoURL as string}
                    alt={comment.user.displayName as string}
                    width="20"
                  />
                  <span>{comment.user.displayName}</span>
                  <span>{comment.content}</span>
                  <button
                    onClick={() =>
                      deleteComment({
                        commentId: comment.id,
                        playlistId: id as string
                      })
                    }>
                    삭제
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PlaylistDetail

const playlistDetailContainer = css`
  // margin: 20px;
  // padding: 20px;
  // border: 1px solid #e0e0e0;
  // border-radius: 8px;
  // background-color: ${theme.colors.darkGrey};
`

const sectionOneContainer = css`
  margin-bottom: 20px;
  video {
    border-radius: 10px;
  }
`

const sectionTwoContainer = css`
  border-bottom: 1px solid ${theme.colors.lightGrey};
`

const titleStyle = css`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.black};
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
`

const descriptionStyle = css`
  font-size: ${theme.fontSize.md};
`

const sectionThreeContainer = css`
  padding: 20px;
`

const profileImageStyle = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`

const sectionFourContainer = css`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.black};
  margin-bottom: 10px;
  background-color: ${theme.colors.lightGrey};
  border-radius: 8px;
  margin-top: 10px;
  padding: 20px 20px;
  margin-left: 20px;
  margin-right: 20px;
`
