// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   deleteDoc,
//   query,
//   where,
//   getDocs
// } from 'firebase/firestore'
// import { auth } from '@/api/firebaseApp'

// export const useToggleBookmark = (playlistId: string) => {
//   const queryClient = useQueryClient()
//   const user = auth.currentUser

//   return useMutation({
//     mutationFn: async (_isBookmarked: boolean) => {
//       const isBookmarked = _isBookmarked
//       const db = getFirestore()
//       const coll = collection(db, 'Bookmarks')

//       if (!user) return

//       if (isBookmarked) {
//         // 북마크 제거
//         const bookmarksQuery = query(
//           coll,
//           where('playlistId', '==', playlistId),
//           where('user', '==', user.uid)
//         )
//         const querySnapshot = await getDocs(bookmarksQuery)
//         querySnapshot.forEach(async doc => {
//           await deleteDoc(doc.ref)
//         })
//       } else {
//         // 북마크 추가
//         await addDoc(coll, {
//           user: user.uid,
//           playlistId,
//           createdAt: new Date().toISOString()
//         })
//       }
//     },
//     onSuccess: () => {
//       // queryClient.invalidateQueries(['bookmarks', playlistId])
//       queryClient.invalidateQueries({ queryKey: ['bookmarks', playlistId] })
//       // queryClient.invalidateQueries({ queryKey: ['userBookmarks', playlistId] })
//       queryClient.invalidateQueries({ queryKey: ['userBookmarks'] })
//     }
//   })

//   // return { mutate: toggleBookmark, isBookmarked }
// }

// order 필드 추가한 코드
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'

export const useToggleBookmark = (playlistId: string) => {
  const queryClient = useQueryClient()
  const user = auth.currentUser

  return useMutation({
    mutationFn: async (_isBookmarked: boolean) => {
      const isBookmarked = _isBookmarked
      const db = getFirestore()
      const coll = collection(db, 'Bookmarks')

      if (!user) return

      if (isBookmarked) {
        // 북마크 제거
        const bookmarksQuery = query(
          coll,
          where('playlistId', '==', playlistId),
          where('user', '==', user.uid)
        )
        const querySnapshot = await getDocs(bookmarksQuery)
        await Promise.all(querySnapshot.docs.map(doc => deleteDoc(doc.ref)))

        // 북마크 제거 후 남은 항목들의 order 값을 업데이트
        const remainingBookmarks = await getDocs(
          query(coll, where('user', '==', user.uid))
        )
        await Promise.all(
          remainingBookmarks.docs.map((doc, index) =>
            updateDoc(doc.ref, { order: index })
          )
        )
      } else {
        // 북마크 추가
        const existingBookmarks = await getDocs(
          query(coll, where('user', '==', user.uid))
        )
        const newOrder = existingBookmarks.size // 기존 북마크 수를 기반으로 order 설정

        await addDoc(coll, {
          user: user.uid,
          playlistId,
          createdAt: new Date().toISOString(),
          order: newOrder // 새로운 order 값을 설정
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks', playlistId] })
      queryClient.invalidateQueries({ queryKey: ['userBookmarks'] })
    }
  })
}
