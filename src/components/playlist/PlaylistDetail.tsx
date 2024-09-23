// import { useState, useEffect, useRef } from 'react'
// import { useParams } from 'react-router-dom'
// import { useHeaderStore } from '@/stores/header'
// import { useFetchPlaylist } from '@/hooks/useFetchPlaylist'
// import {
//   CgChevronUp,
//   CgChevronDown,
//   CgPlayList,
//   CgFormatJustify
// } from 'react-icons/cg'

// import Playlist from '@/components/playlist/Playlist'
// import Category from '@/components/common/Category'
// import { css } from '@emotion/react'
// import theme from '@/styles/theme'
// import { auth } from '@/api/firebaseApp'
// import { CgLockUnlock } from 'react-icons/cg'
// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'
// import 'dayjs/locale/ko'
// import Sortable from 'sortablejs'

// dayjs.locale('ko')
// dayjs.extend(relativeTime)

// const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
// const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

// function extractVideoIdFromUrl(url: string): string {
//   const urlObj = new URL(url)
//   return urlObj.searchParams.get('v') || ''
// }

// async function fetchVideoTitle(videoId: string): Promise<string> {
//   const response = await fetch(
//     `${YOUTUBE_API_URL}?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`
//   )
//   const data = await response.json()

//   if (data.items && data.items.length > 0) {
//     return data.items[0].snippet.title
//   }

//   return 'Unknown Title'
// }

// function extractThumbnailUrl(url: string) {
//   const videoId = url.replace('https://www.youtube.com/watch?v=', '')
//   return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
// }

// export default function PlaylistDetail({
//   showComments,
//   showLockIcon
// }: {
//   showComments?: boolean
//   showLockIcon?: boolean
//   playlist?: typeof Playlist
// }) {
//   const setTitle = useHeaderStore(state => state.setTitle)
//   const { id } = useParams()
//   const { data: playlistData, isLoading } = useFetchPlaylist(id as string)
//   const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
//   const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
//   const [videoTitles, setVideoTitles] = useState<string[]>([])
//   const user = auth.currentUser
//   const ItemRef = useRef<HTMLDivElement | null>(null) // 드래그앤드롭을 위한 거
//   const [currentData, setCurrentData] = useState(playlistData) // 변경된 부분: playlistData를 관리하기 위한 state 추가

//   useEffect(() => {
//     setTitle('Playlist Detail')
//   }, [setTitle])

//   useEffect(() => {
//     if (playlistData) {
//       setCurrentData(playlistData) // 변경된 부분: fetched 데이터를 state로 설정
//     }
//   }, [playlistData])

//   // useEffect(() => {
//   //   if (playlistData && playlistData.urls.length > 0) {
//   //     setCurrentVideoUrl(playlistData.urls[0])

//   //     const fetchTitles = async () => {
//   //       const videoIds = playlistData.urls.map(url =>
//   //         extractVideoIdFromUrl(url)
//   //       )
//   //       const titles = await Promise.all(
//   //         videoIds.map(id => fetchVideoTitle(id))
//   //       )
//   //       setVideoTitles(titles) // 제목 배열 상태로 설정
//   //     }

//   //     fetchTitles()
//   //   }
//   // }, [playlistData])

//   useEffect(() => {
//     if (currentData && currentData.urls.length > 0) {
//       // 변경된 부분: currentData로 변경
//       setCurrentVideoUrl(currentData.urls[0])

//       const fetchTitles = async () => {
//         const videoIds = currentData.urls.map(
//           (
//             url // 변경된 부분: currentData로 변경
//           ) => extractVideoIdFromUrl(url)
//         )
//         const titles = await Promise.all(
//           videoIds.map(id => fetchVideoTitle(id))
//         )
//         setVideoTitles(titles)
//       }

//       fetchTitles()
//     }
//   }, [currentData]) // 변경된 부분: playlistData 대신 currentData로 의존성 변경

//   // useEffect(() => {
//   //   console.log('Item', ItemRef.current)
//   //   if (!ItemRef.current) return
//   //   new Sortable(ItemRef.current, {
//   //     handle: '.drag-handle',
//   //     animation: 0,
//   //     forceFallback: true,
//   //     onEnd: event => {
//   //       console.log(event.oldIndex, event.newIndex)
//   //       if (event.oldIndex === undefined || event.newIndex === undefined) return
//   //       console.log('>>>순서 잘 바뀌니 ', playlistData)
//   //     }
//   //   })
//   // }, [playlistData])

//   useEffect(() => {
//     if (!ItemRef.current) return
//     new Sortable(ItemRef.current, {
//       handle: '.drag-handle',
//       animation: 0,
//       forceFallback: true,
//       onEnd: event => {
//         console.log(event.oldIndex, event.newIndex)
//         if (event.oldIndex === undefined || event.newIndex === undefined) return

//         // 변경된 순서에 맞게 배열 업데이트
//         const updatedUrls = [...currentData.urls] // 변경된 부분: playlistData 대신 currentData 사용
//         const [movedItem] = updatedUrls.splice(event.oldIndex, 1)
//         updatedUrls.splice(event.newIndex, 0, movedItem)

//         // 업데이트된 배열을 상태에 반영
//         setCurrentData(prevData => ({
//           ...prevData,
//           urls: updatedUrls
//         }))
//       }
//     })
//   }, [currentData]) // 변경된 부분: playlistData 대신 currentData로 의존성 변경

//   if (isLoading) {
//     return <div>로딩 중...</div>
//   }

//   // if (!playlistData) {
//   //   return <div>플레이리스트 데이터를 가져오지 못했습니다.</div>
//   // }

//   if (!currentData) {
//     return <div>플레이리스트 데이터를 가져오지 못했습니다.</div>
//   }

//   return (
//     <div>
//       <div css={sectionOneContainer}>
//         {currentVideoUrl ? (
//           <iframe
//             width="100%"
//             height="240px"
//             src={currentVideoUrl.replace('watch?v=', 'embed/')}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             title="YouTube video"></iframe>
//         ) : (
//           <p>비디오가 없습니다.</p>
//         )}
//       </div>

//       <div css={sectionTwoContainer}>
//         {/* <h2 css={titleStyle}>{playlistData.title}</h2> */}
//         <h2 css={titleStyle}>{currentData.title}</h2>{' '}
//         {/* 변경된 부분: playlistData 대신 currentData 사용 */}
//         <div css={otherInfoStyle}>
//           {showLockIcon && (
//             <div css={lockStyle}>
//               <CgLockUnlock />
//               <span className="Lock">비공개/공개</span>
//             </div>
//           )}
//           <span css={timeRecordStyle}>
//             {/* {dayjs(playlistData.createdAt).fromNow()} */}
//             {dayjs(currentData.createdAt).fromNow()}{' '}
//             {/* 변경된 부분: playlistData 대신 currentData 사용 */}
//           </span>
//         </div>
//         <div css={buttonContainerStyle}>
//           <Category />
//           <button
//             css={buttonStyle}
//             onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
//             {isDescriptionVisible ? <CgChevronUp /> : <CgChevronDown />}
//           </button>
//         </div>
//         {/* {isDescriptionVisible && (
//           <p css={descriptionStyle}>{playlistData.description}</p>
//         )} */}
//         isDescriptionVisible && (
//         <p css={descriptionStyle}>{currentData.description}</p>{' '}
//         {/* 변경된 부분: playlistData 대신 currentData 사용 */})
//       </div>

//       <div css={sectionThreeContainer}>
//         {user && showComments ? (
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
//         ) : null}
//       </div>

//       <div css={plAmountInfoStyle}>
//         <CgPlayList className="cgPlaylist" />
//         {/* 재생목록 ({playlistData.urls.length}) */}
//         재생목록 ({currentData.urls.length}){' '}
//         {/* 변경된 부분: playlistData 대신 currentData 사용 */}
//       </div>
//       <div
//         css={videoContainerStyle}
//         ref={ItemRef}>
//         {/* {playlistData.urls.map((url, index) => ( */}
//         {currentData.urls.map(
//           (
//             url,
//             index // 변경된 부분: playlistData 대신 currentData 사용
//           ) => (
//             <div
//               key={index}
//               css={videoInfoLayoutStyle}>
//               <img
//                 src={extractThumbnailUrl(url)}
//                 alt={`Video thumbnail ${index + 1}`}
//                 width="80"
//                 height="60"
//                 onClick={() => setCurrentVideoUrl(url)}
//                 style={{ cursor: 'pointer', borderRadius: '8px' }}
//               />
//               <span css={videoTitleStyle}>
//                 {videoTitles[index] || '제목 로딩 중...'}
//               </span>
//               <CgFormatJustify
//                 css={dragIconStyle}
//                 className="drag-handle"
//               />
//             </div>
//           )
//         )}
//       </div>
//       <div className="nav-margin"></div>
//     </div>
//   )
// }

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
//   margin-top: 20px;
//   margin-bottom: 10px;
//   padding: 0 22px;
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

// const plAmountInfoStyle = css`
//   padding: 20px;
//   display: flex;
//   align-items: center;
//   .cgPlaylist {
//     font-size: 30px;
//   }
// `

// const sectionThreeContainer = css`
//   margin-top: 15px;
//   display: flex;
//   align-items: center;
// `

// const profileImageStyle = css`
//   width: 24px;
//   height: 24px;
//   margin-right: 6px;
//   border-radius: 50%;
//   object-fit: cover;
// `

// const timeRecordStyle = css`
//   color: ${theme.colors.darkGrey};
//   font-size: ${theme.fontSize.md};
//   text-align: right;
//   align-self: center;
// `

// const otherInfoStyle = css`
//   display: flex;
//   flex-direction: row;
//   margin-left: 20px;
//   margin-top: 15px;
//   margin-bottom: 15px;
//   color: ${theme.colors.darkGrey};
//   align-self: center;
//   gap: 10px;
// `
// const lockStyle = css`
//   font-size: ${theme.fontSize.md};
//   display: flex;
//   gap: 5px;
// `

// const videoContainerStyle = css`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 0 20px;
//   margin-top: 10px;
//   gap: 20px;
// `

// const videoInfoLayoutStyle = css`
//   display: flex;
//   align-items: center;
//   gap: 20px;
//   width: 100%;
// `
// const videoTitleStyle = css`
//   flex-grow: 1;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   max-width: 300px;
// `

// const dragIconStyle = css`
//   flex-shrink: 0;
// `

// ------------------------------------------------------------------------------------------------------
// 내꺼 다름사람꺼 다 드래그앤드롭 가능

// import { useState, useEffect, useRef } from 'react'
// import { useParams } from 'react-router-dom'
// import { useHeaderStore } from '@/stores/header'
// import { useFetchPlaylist } from '@/hooks/useFetchPlaylist'
// import {
//   CgChevronUp,
//   CgChevronDown,
//   CgPlayList,
//   CgFormatJustify
// } from 'react-icons/cg'

// import Playlist from '@/components/playlist/Playlist'
// import Category from '@/components/common/Category'
// import { css } from '@emotion/react'
// import theme from '@/styles/theme'
// import { auth } from '@/api/firebaseApp'
// import { CgLockUnlock } from 'react-icons/cg'
// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'
// import 'dayjs/locale/ko'
// import Sortable from 'sortablejs'
// import { doc, updateDoc } from 'firebase/firestore' // 드래그추가
// import { getFirestore } from 'firebase/firestore' // 드래그추가

// dayjs.locale('ko')
// dayjs.extend(relativeTime)

// const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
// const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

// function extractVideoIdFromUrl(url: string): string {
//   const urlObj = new URL(url)
//   return urlObj.searchParams.get('v') || ''
// }

// async function fetchVideoTitle(videoId: string): Promise<string> {
//   const response = await fetch(
//     `${YOUTUBE_API_URL}?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`
//   )
//   const data = await response.json()

//   if (data.items && data.items.length > 0) {
//     return data.items[0].snippet.title
//   }

//   return 'Unknown Title'
// }

// function extractThumbnailUrl(url: string) {
//   const videoId = url.replace('https://www.youtube.com/watch?v=', '')
//   return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
// }

// export default function PlaylistDetail({
//   showComments,
//   showLockIcon
// }: {
//   showComments?: boolean
//   showLockIcon?: boolean
//   playlist?: typeof Playlist
// }) {
//   const setTitle = useHeaderStore(state => state.setTitle)
//   const { id } = useParams()
//   const { data: playlistData, isLoading } = useFetchPlaylist(id as string)
//   const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
//   const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
//   const [videoTitles, setVideoTitles] = useState<string[]>([])
//   const user = auth.currentUser
//   const ItemRef = useRef<HTMLDivElement | null>(null) // 드래그앤드롭을 위한 거
//   const db = getFirestore() //드래그추가

//   useEffect(() => {
//     setTitle('Playlist Detail')
//   }, [setTitle])

//   useEffect(() => {
//     if (playlistData && playlistData.urls.length > 0) {
//       setCurrentVideoUrl(playlistData.urls[0])

//       const fetchTitles = async () => {
//         const videoIds = playlistData.urls.map(url =>
//           extractVideoIdFromUrl(url)
//         )
//         const titles = await Promise.all(
//           videoIds.map(id => fetchVideoTitle(id))
//         )
//         setVideoTitles(titles) // 제목 배열 상태로 설정
//       }

//       fetchTitles()
//     }
//   }, [playlistData])

//   // useEffect(() => {
//   //   console.log('Item', ItemRef.current)
//   //   if (!ItemRef.current) return
//   //   new Sortable(ItemRef.current, {
//   //     handle: '.drag-handle',
//   //     animation: 0,
//   //     forceFallback: true,
//   //     onEnd: event => {
//   //       console.log(event.oldIndex, event.newIndex)
//   //       if (event.oldIndex === undefined || event.newIndex === undefined) return
//   //       console.log('>>>순서 잘 바뀌니 ', playlistData)
//   //       // reorderTodos({
//   //       //   oldIndex: event.oldIndex,
//   //       //   newIndex: event.newIndex
//   //       // })
//   //     }
//   //   })
//   // }, [playlistData])

//   // useEffect는 항상 컴포넌트의 최상단에서 호출되어야 합니다.
//   useEffect(() => {
//     if (!ItemRef.current || !playlistData || !playlistData.urls) return // 내부에서 조건 검사
//     console.log('Sortable 초기화 완료:', playlistData.urls)

//     new Sortable(ItemRef.current, {
//       handle: '.drag-handle',
//       animation: 0,
//       forceFallback: true,
//       onEnd: async event => {
//         if (event.oldIndex === undefined || event.newIndex === undefined) return
//         console.log(
//           '드래그앤드롭 이벤트 발생:',
//           event.oldIndex,
//           '->',
//           event.newIndex
//         )

//         const newUrls = Array.from(playlistData.urls)
//         const [movedItem] = newUrls.splice(event.oldIndex, 1)
//         newUrls.splice(event.newIndex, 0, movedItem)
//         console.log('변경된 URL 배열:', newUrls)

//         // Firestore에 업데이트
//         if (id) {
//           const playlistRef = doc(db, 'Playlists', id)
//           await updateDoc(playlistRef, {
//             urls: newUrls
//           })
//           console.log('Firestore에 업데이트 완료')
//         }

//         // 상태를 업데이트하여 UI에 즉시 반영
//         setCurrentVideoUrl(newUrls[0])
//         console.log('현재 재생 중인 비디오 URL 업데이트:', newUrls[0])
//       }
//     })
//   }, [playlistData, id, db])

//   if (isLoading) {
//     return <div>로딩 중...</div>
//   }

//   // if (!playlistData) {
//   //   return <div>플레이리스트 데이터를 가져오지 못했습니다.</div>
//   // }

//   if (!playlistData || !playlistData.urls) {
//     return <div>플레이리스트 데이터를 가져오지 못했습니다.</div>
//   }

//   return (
//     <div>
//       <div css={sectionOneContainer}>
//         {currentVideoUrl ? (
//           <iframe
//             width="100%"
//             height="240px"
//             src={currentVideoUrl.replace('watch?v=', 'embed/')}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             title="YouTube video"></iframe>
//         ) : (
//           <p>비디오가 없습니다.</p>
//         )}
//       </div>

//       <div css={sectionTwoContainer}>
//         <h2 css={titleStyle}>{playlistData.title}</h2>
//         <div css={otherInfoStyle}>
//           {showLockIcon && (
//             <div css={lockStyle}>
//               <CgLockUnlock />
//               <span className="Lock">비공개/공개</span>
//             </div>
//           )}
//           <span css={timeRecordStyle}>
//             {dayjs(playlistData.createdAt).fromNow()}
//           </span>
//         </div>

//         <div css={buttonContainerStyle}>
//           <Category />
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
//         {user && showComments ? (
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
//         ) : null}
//       </div>

//       <div css={plAmountInfoStyle}>
//         <CgPlayList className="cgPlaylist" />
//         재생목록 ({playlistData.urls.length})
//       </div>
//       <div
//         css={videoContainerStyle}
//         ref={ItemRef}>
//         {playlistData?.urls.map((url, index) => (
//           <div
//             key={index}
//             css={videoInfoLayoutStyle}>
//             <img
//               src={extractThumbnailUrl(url)}
//               alt={`Video thumbnail ${index + 1}`}
//               width="80"
//               height="60"
//               onClick={() => setCurrentVideoUrl(url)}
//               style={{ cursor: 'pointer', borderRadius: '8px' }}
//             />
//             <span css={videoTitleStyle}>
//               {videoTitles[index] || '제목 로딩 중...'}
//             </span>
//             <CgFormatJustify
//               css={dragIconStyle}
//               className="drag-handle"
//               style={{ cursor: 'ns-resize', borderRadius: '8px' }}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="nav-margin"></div>
//     </div>
//   )
// }

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
//   margin-top: 20px;
//   margin-bottom: 10px;
//   padding: 0 22px;
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

// const plAmountInfoStyle = css`
//   padding: 20px;
//   display: flex;
//   align-items: center;
//   .cgPlaylist {
//     font-size: 30px;
//   }
// `

// const sectionThreeContainer = css`
//   margin-top: 15px;
//   display: flex;
//   align-items: center;
// `

// const profileImageStyle = css`
//   width: 24px;
//   height: 24px;
//   margin-right: 6px;
//   border-radius: 50%;
//   object-fit: cover;
// `

// const timeRecordStyle = css`
//   color: ${theme.colors.darkGrey};
//   font-size: ${theme.fontSize.md};
//   text-align: right;
//   align-self: center;
// `

// const otherInfoStyle = css`
//   display: flex;
//   flex-direction: row;
//   margin-left: 20px;
//   margin-top: 15px;
//   margin-bottom: 15px;
//   color: ${theme.colors.darkGrey};
//   align-self: center;
//   gap: 10px;
// `
// const lockStyle = css`
//   font-size: ${theme.fontSize.md};
//   display: flex;
//   gap: 5px;
// `

// const videoContainerStyle = css`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 0 20px;
//   margin-top: 10px;
//   gap: 20px;
// `

// const videoInfoLayoutStyle = css`
//   display: flex;
//   align-items: center;
//   gap: 20px;
//   width: 100%;
// `
// const videoTitleStyle = css`
//   flex-grow: 1;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   max-width: 300px;
// `

// const dragIconStyle = css`
//   flex-shrink: 0;
// `

// ------------------------------------------------------------------------------------------------------------------------
// 내것만 드래그앤드롭 가능

import { getFirestore, doc, getDoc } from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import {
  CgChevronUp,
  CgChevronDown,
  CgPlayList,
  CgFormatJustify,
  CgLockUnlock
} from 'react-icons/cg'
import Playlist from '@/components/playlist/Playlist'
import Category from '@/components/common/Category'
import EditPlaylist from '@/components/EditPlaylistModal'
import { AnimatePresence } from 'framer-motion'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { auth } from '@/api/firebaseApp'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'
import Sortable from 'sortablejs'

dayjs.locale('ko')
dayjs.extend(relativeTime)

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos'

function extractVideoIdFromUrl(url: string): string {
  const urlObj = new URL(url)
  return urlObj.searchParams.get('v') || ''
}

async function fetchVideoTitle(videoId: string): Promise<string> {
  const response = await fetch(
    `${YOUTUBE_API_URL}?id=${videoId}&part=snippet&key=${YOUTUBE_API_KEY}`
  )
  const data = await response.json()

  if (data.items && data.items.length > 0) {
    return data.items[0].snippet.title
  }

  return 'Unknown Title'
}

function extractThumbnailUrl(url: string) {
  const videoId = extractVideoIdFromUrl(url)
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export default function PlaylistDetail({
  showComments,
  showLockIcon,
  showEditButton
}: {
  showComments?: boolean
  showLockIcon?: boolean
  showEditButton?: boolean
  playlist?: typeof Playlist
}) {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { id } = useParams()
  const [playlistData, setPlaylistData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null)
  const [videoTitles, setVideoTitles] = useState<string[]>([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const openEdit = () => setIsEditOpen(true)
  const closeEdit = () => setIsEditOpen(false)
  const user = auth.currentUser
  const ItemRef = useRef<HTMLDivElement | null>(null)
  const db = getFirestore()
  const isOwner = user?.uid === playlistData?.userId

  useEffect(() => {
    setTitle('Playlist Detail')
  }, [setTitle])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playlistDocRef = doc(db, 'Playlists', id!)
        const publicPlaylistDocRef = doc(db, 'PublicPlaylists', id!)
        
        const [playlistSnap, publicPlaylistSnap] = await Promise.all([
          getDoc(playlistDocRef),
          getDoc(publicPlaylistDocRef)
        ])

        if (playlistSnap.exists()) {
          setPlaylistData({ id: playlistSnap.id, ...playlistSnap.data() })
        } else if (publicPlaylistSnap.exists()) {
          setPlaylistData({ id: publicPlaylistSnap.id, ...publicPlaylistSnap.data() })
        } else {
          console.log("No matching documents found in either collection.")
        }
      } catch (error) {
        console.error("Error fetching playlist data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, db])

  useEffect(() => {
    if (playlistData && playlistData.urls.length > 0) {
      setCurrentVideoUrl(playlistData.urls[0])

      const fetchTitles = async () => {
        const videoIds = playlistData.urls.map(url =>
          extractVideoIdFromUrl(url)
        )
        const titles = await Promise.all(
          videoIds.map(id => fetchVideoTitle(id))
        )
        setVideoTitles(titles)
      }

      fetchTitles()
    }
  }, [playlistData])

  useEffect(() => {
    if (!ItemRef.current || !playlistData || !playlistData.urls || !isOwner)
      return

    new Sortable(ItemRef.current, {
      handle: '.drag-handle',
      animation: 150,
      forceFallback: false,
      onEnd: async event => {
        if (event.oldIndex === undefined || event.newIndex === undefined) return

        const newUrls = Array.from(playlistData.urls)
        const [movedItem] = newUrls.splice(event.oldIndex, 1)
        newUrls.splice(event.newIndex, 0, movedItem)

        if (id) {
          const playlistRef = doc(db, 'Playlists', id)
          await updateDoc(playlistRef, {
            urls: newUrls
          })
        }

        setCurrentVideoUrl(newUrls[0])
      }
    })
  }, [playlistData, id, db, isOwner])

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  if (!playlistData || !playlistData.urls) {
    return <div>플레이리스트 데이터를 가져오지 못했습니다.</div>
  }

  return (
    <div>
      <div css={sectionOneContainer}>
        {currentVideoUrl ? (
          <iframe
            width="100%"
            height="240px"
            src={currentVideoUrl.replace('watch?v=', 'embed/')}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
            key={currentVideoUrl}></iframe>
        ) : (
          <p>비디오가 없습니다.</p>
        )}
      </div>

      <div css={sectionTwoContainer}>
        <div css={titleSectionStyle}>
          <h2 css={titleStyle}>{playlistData.title}</h2>
          {showEditButton && <button onClick={openEdit}>편집</button>}
        </div>
        <AnimatePresence>
          {isEditOpen && <EditPlaylist closeEdit={closeEdit} />}
        </AnimatePresence>
        <div css={otherInfoStyle}>
          {showLockIcon && (
            <div css={lockStyle}>
              <CgLockUnlock />
              <span className="Lock">비공개/공개</span>
            </div>
          )}
          <span css={timeRecordStyle}>
            {dayjs(playlistData.createdAt).fromNow()}
          </span>
        </div>

        <div css={buttonContainerStyle}>
          <Category
            selectedCategories={[]}
            onSelectCategory={() => {}}
          />
          <button
            css={buttonStyle}
            onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}>
            {isDescriptionVisible ? <CgChevronUp /> : <CgChevronDown />}
          </button>
        </div>
        {isDescriptionVisible && (
          <p css={descriptionStyle}>{playlistData.description}</p>
        )}
      </div>

      <div css={sectionThreeContainer}>
        {user && showComments ? (
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
        ) : null}
      </div>

      <div css={plAmountInfoStyle}>
        <CgPlayList className="cgPlaylist" />
        재생목록 ({playlistData.urls.length})
      </div>
      <div
        css={videoContainerStyle}
        ref={ItemRef}>
        {playlistData?.urls.map((url, index) => (
          <div
            key={index}
            css={videoInfoLayoutStyle}>
            <img
              src={extractThumbnailUrl(url)}
              alt={`Video thumbnail ${index + 1}`}
              width="80"
              height="60"
              onClick={() => setCurrentVideoUrl(url)}
              style={{ cursor: 'pointer', borderRadius: '8px' }}
            />
            <span css={videoTitleStyle}>
              {videoTitles[index] || '제목 로딩 중...'}
            </span>
            {isOwner && (
              <CgFormatJustify
                css={dragIconStyle}
                className="drag-handle"
                style={{ cursor: 'ns-resize', borderRadius: '8px' }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="nav-margin"></div>
    </div>
  )
}

const sectionOneContainer = css`
  iframe {
  }
`

const sectionTwoContainer = css`
  border-bottom: 1px solid ${theme.colors.lightGrey};
`

const titleSectionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 22px;
`

const titleStyle = css`
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.black};
  margin-top: 20px;
  margin-bottom: 10px;
`

const buttonStyle = css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${theme.colors.charcoalGrey};
  padding: 0;
  margin: 0;
  transition: color 0.3s ease;
  &:hover {
    color: ${theme.colors.grey};
  }
`

const buttonContainerStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
`

const descriptionStyle = css`
  font-size: ${theme.fontSize.md};
  padding: 20px;
`

const plAmountInfoStyle = css`
  padding: 20px;
  display: flex;
  align-items: center;
  .cgPlaylist {
    font-size: 30px;
  }
`

const sectionThreeContainer = css`
  margin-top: 15px;
  display: flex;
  align-items: center;
`

const profileImageStyle = css`
  width: 24px;
  height: 24px;
  margin-right: 6px;
  border-radius: 50%;
  object-fit: cover;
`

const timeRecordStyle = css`
  color: ${theme.colors.darkGrey};
  font-size: ${theme.fontSize.md};
  text-align: right;
  align-self: center;
`

const otherInfoStyle = css`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-top: 15px;
  margin-bottom: 15px;
  color: ${theme.colors.darkGrey};
  align-self: center;
  gap: 10px;
`

const lockStyle = css`
  font-size: ${theme.fontSize.md};
  display: flex;
  gap: 5px;
`

const videoContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  margin-top: 10px;
  gap: 20px;
`

const videoInfoLayoutStyle = css`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
`

const videoTitleStyle = css`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`

const dragIconStyle = css`
  flex-shrink: 0;
`

