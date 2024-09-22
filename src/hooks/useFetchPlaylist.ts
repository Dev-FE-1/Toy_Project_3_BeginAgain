// // GET - useQuery
// // POST, PUT, PATCH, DELETE - useMutation

// import { useQuery } from '@tanstack/react-query'
// import { getFirestore, collection, doc, getDoc } from 'firebase/firestore'

// export interface Playlist {
//   id: string
//   urls: string[]
//   title: string
//   description: string
//   isPublic: boolean
//   categories: string[]
//   userId: string
//   createdAt: Date | string | undefined
// }

// export const useFetchPlaylist = (id: string) => {
//   return useQuery<Playlist>({
//     queryKey: ['playlists', id],
//     queryFn: async () => {
//       const db = getFirestore()
//       const coll = collection(db, 'Playlists')
//       const docRef = doc(coll, id)
//       const docSnap = await getDoc(docRef)
//       return {
//         id: docSnap.id,
//         ...docSnap.data()
//       } as Playlist
//     }
//   })
// }

import { useQuery } from '@tanstack/react-query'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export interface Playlist {
  id: string
  urls: string[]
  title: string
  description: string
  isPublic: boolean
  categories: string[]
  userId: string
  createdAt: Date | string | undefined
}

export const useFetchPlaylist = (id: string) => {
  return useQuery<Playlist>({
    queryKey: ['playlists', id],
    queryFn: async () => {
      console.log('useFetchPlaylist 호출:', id)
      const db = getFirestore()
      const docRef = doc(db, 'Playlists', id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log('Firestore에서 가져온 데이터:', docSnap.data())
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Playlist
      } else {
        console.log('데이터가 존재하지 않습니다.')
        throw new Error('해당 플레이리스트를 찾을 수 없습니다.')
      }
    }
  })
}
