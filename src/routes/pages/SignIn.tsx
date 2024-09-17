import { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '@/assets/background.png'
import logo from '@/assets/logo.png'
import { css } from '@emotion/react'
import LongButton from '@/components/common/LongButton'
import Input from '@/components/common/Input'
import firebaseApp from '@/api/firebaseApp'
import { Colors } from '@/styles/Theme'
import { create } from 'zustand'

const containerStyle = css`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
`

const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  padding: 20px;
`

const logoStyle = css`
  height: 60px;
  width: 200px;
  margin-bottom: 120px;
`

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 130px;
`
const buttonContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const signInButtonStyle = css`
  background-color: ${Colors.black};
  color: ${Colors.black};
`

export default function SignIn() {
  const provider = new GoogleAuthProvider()
  const auth = getAuth(firebaseApp)
  const navigate = useNavigate()

  async function SignInWithGoogle() {
    await signInWithPopup(auth, provider)
    navigate('/')
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <img
          css={logoStyle}
          src={logo}
          alt="Logo"
        />
        <div css={formStyle}>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div css={buttonContainerStyle}>
          <LongButton onClick={SignInWithGoogle}>로그인</LongButton>
          <LongButton
            css={signInButtonStyle}
            onClick={SignInWithGoogle}>
            회원가입
          </LongButton>
        </div>
      </div>
    </div>
  )
}
