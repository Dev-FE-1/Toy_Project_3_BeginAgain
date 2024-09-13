import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const navigate = useNavigate()

  async function loginWithGoogle() {
    await signInWithPopup(auth, provider)
    navigate('/')
  }
  return (
    <>
      <h1>로그인</h1>
      <button onClick={loginWithGoogle}>로그인</button>
    </>
  )
}
