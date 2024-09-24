import { useState, useEffect } from 'react'
import { db } from '@/api/firebaseApp'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export const useLikeData = (playlistId: string) => {
  const [isLikeFilled, setIsLikeFilled] = useState(false)

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const docRef = doc(db, 'Likes', playlistId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setIsLikeFilled(docSnap.data().isLikeFilled)
      }
    }

    fetchLikeStatus()
  }, [playlistId])

  const handleLikeClick = async () => {
    const docRef = doc(db, 'Likes', playlistId)

    if (isLikeFilled) {
      await updateDoc(docRef, { isLikeFilled: false })
      setIsLikeFilled(false)
    } else {
      await setDoc(docRef, { isLikeFilled: true }, { merge: true })
      setIsLikeFilled(true)
    }
  }

  return {
    isLikeFilled,
    handleLikeClick
  }
}
