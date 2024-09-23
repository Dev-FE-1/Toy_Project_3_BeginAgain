import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/api/firebaseApp'
import { useState, useEffect } from 'react'

export const useFetchUserData = (userId: string | undefined) => {
  const [userData, setUserData] = useState<{
    displayName?: string
    photoURL?: string
  } | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userDoc = doc(db, 'Users', userId)
        const userSnapshot = await getDoc(userDoc)
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data())
        } else {
          console.error('User not found')
        }
      }
    }

    fetchUserData()
  }, [userId])

  return userData
}
