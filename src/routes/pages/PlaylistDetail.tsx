import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import { useFetchPlaylist } from '@/hooks/useFetchPlaylist'
import { useFetchComments } from '@/hooks/useFetchComments'
import { useCreateComment } from '@/hooks/useCreateComment'
import { useDeleteComment } from '@/hooks/useDeleteComment'

const PlaylistDetail = () => {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('Playlist Detail')
  }, [setTitle])

  const { id } = useParams()
  const { data } = useFetchPlaylist(id as string)
  const { data: comments } = useFetchComments(id as string)
  const [comment, setComment] = useState('')

  const { mutate: createComment } = useCreateComment()
  const { mutate: deleteComment } = useDeleteComment()

  async function addComment() {
    createComment({
      comment,
      palylistId: id as string
    })
  }

  return (
    <>
      {data && (
        <>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          {JSON.stringify(data)}

          <div className="comment">
            <input
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button onClick={addComment}>댓글 추가</button>
          </div>
          {comments &&
            comments.map(comment => {
              return (
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
                        palylistId: id as string
                      })
                    }>
                    삭제
                  </button>
                </div>
              )
            })}
        </>
      )}
    </>
  )
}

export default PlaylistDetail
