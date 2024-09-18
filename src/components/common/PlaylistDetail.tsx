import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylist } from '@/hooks/useFetchPlaylist'
import { useFetchComments } from '@/hooks/useFetchComments'
import { useCreateComment } from '@/hooks/useCreateComment'
import { useDeleteComment } from '@/hooks/useDeleteComment'
import { CgChevronUp, CgChevronDown } from 'react-icons/cg'
import theme from '@/styles/theme'
import { css } from '@emotion/react'
import { auth } from '@/api/firebaseApp'

const PlaylistDetail = () => {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('Playlist Detail')
  }, [setTitle])

  const { id } = useParams()
  const { data } = useFetchPlaylist(id as string)
  const { data: comments } = useFetchComments(id as string)
  const [comment, setComment] = useState('')
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

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
      <div css={sectionOneContainer}>
        {/* 여기엔 비디오 데이터 들어갈 예정 */}
      </div>

      {data && (
        <>
          {JSON.stringify(data)}

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
              {/* 댓글 갯수 가져오기 */}
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
  /* 비디오 스타일 추가 예정 */
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
  // color: ${theme.colors.darkGrey};
  // margin-bottom: 20px;
  // background-color: ${theme.colors.red};
`

const sectionThreeContainer = css`
  padding: 20px;
  /* 프로필, 유저 이름, 좋아요, 북마크, 카테고리 관련 스타일 */
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
