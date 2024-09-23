import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, getDoc, collection } from 'firebase/firestore'

import { auth, db } from '@/api/firebaseApp'

export const signInWithGoogleAndCreateUser = async () => {
  const provider = new GoogleAuthProvider()

  try {
    const { user } = await signInWithPopup(auth, provider)

    const userDoc = doc(db, 'Users', user.uid)
    const docSnapshot = await getDoc(userDoc)

    if (!docSnapshot.exists()) {
      console.log('새로운 사용자 정보 데이터베이스에 저장')
      await setDoc(userDoc, {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        userId: user.uid
      })
      console.log('유저 정보 저장 완료')

      const playlistsCollection = collection(db, 'playlists')
      const newPlaylistDocRef = doc(playlistsCollection)
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
