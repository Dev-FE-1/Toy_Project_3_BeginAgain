import { db } from '@/api/firebaseApp'
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore'

export const fetchLikes = async (playlistId: string) => {
  const docRef = doc(db, 'Likes', playlistId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const data = docSnap.data()
    return {
      likeCount: Number(data.likeCount) || 0,
      userLikes: data.userLikes || {}
    }
  } else {
    return { likeCount: 0, userLikes: {} }
  }
}

export const updateLikes = async (
  playlistId: string,
  userId: string,
  isLiked: boolean
) => {
  const docRef = doc(db, 'Likes', playlistId)

  const docSnap = await getDoc(docRef)
  let newLikeCount

  if (docSnap.exists()) {
    const currentData = docSnap.data()

    if (isLiked) {
      newLikeCount = (currentData.likeCount || 0) + 1
      await updateDoc(docRef, {
        [`userLikes.${userId}`]: true,
        likeCount: newLikeCount
      })
    } else {
      newLikeCount = Math.max(0, (currentData.likeCount || 0) - 1)
      await updateDoc(docRef, {
        [`userLikes.${userId}`]: null
      })

      if (newLikeCount > 0) {
        await updateDoc(docRef, {
          likeCount: newLikeCount
        })
      } else {
        await deleteDoc(docRef)
      }
    }
  } else {
    newLikeCount = isLiked ? 1 : 0
    await setDoc(docRef, {
      likeCount: newLikeCount,
      userLikes: { [userId]: isLiked }
    })
  }
}
