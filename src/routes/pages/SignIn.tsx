import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const navigate = useNavigate()

  async function SignInWithGoogle() {
    await signInWithPopup(auth, provider)
    navigate('/')
  }
  return (
    <>
      <h1>로그인</h1>
      <button onClick={SignInWithGoogle}>로그인</button>
    </>
  )
}
