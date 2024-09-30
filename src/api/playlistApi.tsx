import { db } from '@/api/firebaseApp'
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs
} from 'firebase/firestore'

const ITEMS_PER_PAGE = 10

export const fetchPlaylists = async (lastVisible: boolean) => {
  const playlistsRef = collection(db, 'Playlists')

  let q = query(playlistsRef, orderBy('createdAt'), limit(ITEMS_PER_PAGE))

  if (lastVisible) {
    q = query(
      playlistsRef,
      orderBy('createdAt'),
      startAfter(lastVisible),
      limit(ITEMS_PER_PAGE)
    )
  }

  const snapshot = await getDocs(q)
  const newPlaylists = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

  return { newPlaylists, lastVisible: snapshot.docs[snapshot.docs.length - 1] }
}
