import { useState, useEffect } from 'react'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

interface User {
  displayName: string
  photoURL: string
}

export function usePlaylistData(playlist: Playlist | undefined) {
  const [userData, setUserData] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const db = getFirestore()

  useEffect(() => {
    const fetchUserData = async () => {
      if (playlist && playlist.userId) {
        try {
          const userDocRef = doc(db, 'users', playlist.userId)
          const userSnap = await getDoc(userDocRef)

          if (userSnap.exists()) {
            const userData = userSnap.data() as User
            setUserData(userData)
            console.log('Fetched user data:', userData)
          } else {
            console.error('User does not exist')
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUserData()
  }, [playlist, db])

  return { userData, isLoading }
}
