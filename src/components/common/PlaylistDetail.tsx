// import { useState, useEffect } from 'react'
// import { useParams, useLocation } from 'react-router-dom'
// import { useHeaderStore } from '@/stores/header'
// import { useFetchPlaylist } from '@/hooks/useFetchPlaylist'
// import { useFetchComments } from '@/hooks/useFetchComments'
// import { useCreateComment } from '@/hooks/useCreateComment'
// import { useDeleteComment } from '@/hooks/useDeleteComment'
// import { CgChevronUp, CgChevronDown } from 'react-icons/cg'
// import { css } from '@emotion/react'
// import theme from '@/styles/theme'
// import { auth } from '@/api/firebaseApp'

// const PlaylistDetail = () => {
//   const setTitle = useHeaderStore(state => state.setTitle)
//   const { id } = useParams()
//   const location = useLocation()
//   const { playlist } = location.state || {}
//   const { data: playlistData, isLoading } = useFetchPlaylist(id as string)
//   const { data: comments } = useFetchComments(id as string)
//   const [comment, setComment] = useState('')
//   const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

//   const user = auth.currentUser
//   const { mutate: createComment } = useCreateComment()
//   const { mutate: deleteComment } = useDeleteComment()

//   useEffect(() => {
//     setTitle('Playlist Detail')
//   }, [setTitle])

//   if (isLoading) {
//     return <div>로딩 중...</div>
//   }

//   if (!playlistData) {
//     return <div>플레이리스트 데이터를 가져오지 못했습니다.</div>
//   }

//   const addComment = () => {
//     createComment({ comment, playlistId: id as string })
//     setComment('')
//   }

//   const videoUrl = playlistData.urls[0]

//   return (
//     <div css={playlistDetailContainer}>
//       <div css={sectionOneContainer}>
//         {videoUrl ? (
//           <iframe
//             width="100%"
//             height="240px"
//             src={videoUrl.replace('watch?v=', 'embed/')}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             title="YouTube video"></iframe>
//         ) : (
//           <p>비디오가 없습니다.</p>
//         )}
//       </div>

//       <div css={sectionTwoContainer}>
//         <h2 css={titleStyle}>{playlistData.title}</h2>
//         <div css={buttonContainerStyle}>
//           <button
//             css={buttonStyle}
//             onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
//             {isDescriptionVisible ? <CgChevronUp /> : <CgChevronDown />}
//           </button>
//         </div>
//         {isDescriptionVisible && (
//           <p css={descriptionStyle}>{playlistData.description}</p>
//         )}
//       </div>

//       <div css={sectionThreeContainer}>
//         {user && (
//           <>
//             <img
//               src={user.photoURL || ''}
//               alt={user.displayName || 'User'}
//               width="50"
//               height="50"
//               css={profileImageStyle}
//             />
//             <span>{user.displayName}</span>
//           </>
//         )}
//       </div>

//       <div css={sectionFourContainer}>
//         <div className="comment">
//           <p>댓글</p>
//           <input
//             type="text"
//             value={comment}
//             onChange={e => setComment(e.target.value)}
//           />
//           <button onClick={addComment}>댓글 추가</button>
//         </div>

//         {comments &&
//           comments.map(comment => (
//             <div key={comment.id}>
//               <img
//                 src={comment.user.photoURL as string}
//                 alt={comment.user.displayName as string}
//                 width="20"
//               />
//               <span>{comment.user.displayName}</span>
//               <span>{comment.content}</span>
//               <button
//                 onClick={() =>
//                   deleteComment({
//                     commentId: comment.id,
//                     playlistId: id as string
//                   })
//                 }>
//                 삭제
//               </button>
//             </div>
//           ))}
//       </div>
//     </div>
//   )
// }

// export default PlaylistDetail

// const playlistDetailContainer = css`
//   // margin: 20px;
//   // padding: 20px;
//   // border: 1px solid #e0e0e0;
//   // border-radius: 8px;
//   // background-color: ${theme.colors.darkGrey};
// `

// const sectionOneContainer = css`
//   iframe {
//   }
// `

// const sectionTwoContainer = css`
//   border-bottom: 1px solid ${theme.colors.lightGrey};
// `

// const titleStyle = css`
//   font-size: ${theme.fontSize.lg};
//   color: ${theme.colors.black};
//   margin-top: 10px;
//   margin-bottom: 10px;
//   padding: 20px;
// `
// const buttonStyle = css`
//   background: none;
//   border: none;
//   cursor: pointer;
//   font-size: 24px;
//   color: ${theme.colors.charcoalGrey};
//   padding: 0;
//   margin: 0;
//   transition: color 0.3s ease;
//   &:hover {
//     color: ${theme.colors.grey};
//   }
// `

// const buttonContainerStyle = css`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   margin-right: 10px;
// `

// const descriptionStyle = css`
//   font-size: ${theme.fontSize.md};
//   padding: 20px;
// `

// const sectionThreeContainer = css`
//   padding: 20px;
// `

// const profileImageStyle = css`
//   width: 24px;
//   height: 24px;
//   margin-right: 6px;
//   border-radius: 50%;
//   object-fit: cover;
// `

// const sectionFourContainer = css`
//   font-size: ${theme.fontSize.md};
//   color: ${theme.colors.black};
//   margin: 10px 0;
//   background-color: ${theme.colors.lightGrey};
//   border-radius: 8px;
//   padding: 20px;
// `
