import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { comment: string; palylistId: string }) => {
      const { comment, palylistId } = payload
      const db = getFirestore()
      const auth = getAuth()
      const user = auth.currentUser
      const coll = collection(db, 'Comments')
      console.log('Create Comment', user)
      if (!user) return
      await addDoc(coll, {
        user: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL
        },
        content: comment,
        createdAt: new Date().toISOString(),
        palylistId
      })
    },
    onSuccess: (_data, payload) => {
      const { palylistId } = payload
      queryClient.invalidateQueries({ queryKey: ['comments', palylistId] })
    }
  })
}
