import { useEffect, useState } from 'react'
import { useNavigate, Outlet, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/api/firebaseApp'
import type { User } from 'firebase/auth'

export default function RequiresAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    onAuthStateChanged(auth, user => {
      setUser(user)
      setIsLoading(false)
    })
  }, [navigate])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return user ? <Outlet /> : <Navigate to="/sign-in" />
}
