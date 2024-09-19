// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { getFirestore, collection, addDoc } from 'firebase/firestore'
// import { auth } from '@/api/firebaseApp'

// export const useCreateComment = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: async (payload: { comment: string; playlistId: string }) => {
//       const { comment, playlistId } = payload
//       const db = getFirestore()
//       const user = auth.currentUser
//       const coll = collection(db, 'Comments')
//       console.log('Create Comment', user)
//       if (!user) return
//       await addDoc(coll, {
//         user: {
//           uid: user.uid,
//           displayName: user.displayName,
//           photoURL: user.photoURL
//         },
//         content: comment,
//         createdAt: new Date().toISOString(),
//         playlistId
//       })
//     },
//     onSuccess: (_data, payload) => {
//       const { playlistId } = payload
//       queryClient.invalidateQueries({ queryKey: ['comments', playlistId] })
//     }
//   })
// }

// useCreateComment.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { auth } from '@/api/firebaseApp'

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: { comment: string; playlistId: string }) => {
      try {
        const { comment, playlistId } = payload
        const db = getFirestore()
        const user = auth.currentUser
        const coll = collection(db, 'Comments')
        if (!user) return
        await addDoc(coll, {
          user: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          content: comment,
          createdAt: new Date().toISOString(),
          playlistId
        })
      } catch (error) {
        console.error('Failed to add comment:', error)
      }
    },
    onSuccess: (_data, payload) => {
      const { playlistId } = payload
      queryClient.invalidateQueries({ queryKey: ['comments', playlistId] })
    }
  })
}
