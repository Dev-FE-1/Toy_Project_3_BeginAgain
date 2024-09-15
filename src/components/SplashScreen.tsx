import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SplashScreen.module.css'
import { onAuthStateChanged, getAuth } from 'firebase/auth'

export default function App() {
  const [isSplash, setIsSplash] = useState(true)
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setIsSplash(false)
      console.log(user)
      if (!user) {
        navigate('/signin')
      }
    })
  }, [])

  return (
    <>
      {isSplash && (
        <div className={styles.splash}>
          <h2>MAZI</h2>
        </div>
      )}
    </>
  )
}
