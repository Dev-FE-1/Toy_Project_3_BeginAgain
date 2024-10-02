import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getDoc, collection } from 'firebase/firestore'
// 파베에서 제공하는 함수를 편하게 쓰는거

import { auth, db } from '@/api/firebaseApp'

export const signInWithGoogleAndCreateUser = async () => {
  const provider = new GoogleAuthProvider()

  try {
    const { user } = await signInWithPopup(auth, provider)

    const userDoc = doc(db, 'Users', user.uid)
    const docSnapshot = await getDoc(userDoc)

    if (!docSnapshot.exists()) {
      await setDoc(userDoc, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userId: user.uid
      })

      const PlaylistsCollection = collection(db, 'Playlists')
      const newPlaylistDocRef = doc(PlaylistsCollection)
      const playlistId = newPlaylistDocRef.id

      await setDoc(newPlaylistDocRef, {
        playlistId: playlistId,
        userId: user.uid,
        videos: []
      })
    }

    return user
  } catch (error) {
    console.error('구글 연동 로그인 실패', error)
    throw error
  }
}
