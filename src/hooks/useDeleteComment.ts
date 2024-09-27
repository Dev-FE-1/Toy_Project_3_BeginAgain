import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getFirestore, collection, doc, deleteDoc } from 'firebase/firestore'

export const useDeleteComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: { commentId: string; playlistId: string }) => {
      const { commentId } = payload
      const db = getFirestore()
      const coll = collection(db, 'Comments')
      await deleteDoc(doc(coll, commentId))
    },
    onSuccess: (_data, payload) => {
      const { playlistId } = payload
      queryClient.invalidateQueries({ queryKey: ['comments', playlistId] })
    }
  })
}
