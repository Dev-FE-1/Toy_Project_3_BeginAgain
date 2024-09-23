import { useQuery } from '@tanstack/react-query'
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'
import { db } from '@/api/firebaseApp'

export interface UserId {
  id: string
  urls: string[]
  title: string
}
export const useFetchUser = (id: string) => {
  return useQuery<UserId | undefined, Error>({
    queryKey: ['user', id],
    queryFn: async () => {
      const db = getFirestore()
      const coll = collection(db, 'Users')
      const docRef = doc(coll, id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as UserId
      } else {
        console.error('User not found')
        return undefined
      }
    },
    enabled: !!id
  })
}
