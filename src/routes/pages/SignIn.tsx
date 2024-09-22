import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/api/firebaseApp'
import { useNavigate } from 'react-router-dom'
import splashImage from '@/assets/splash.jpg'
import googleLogo from '@/assets/googleLogo.png'
import logo from '@/assets/logo.png'
import { css } from '@emotion/react'
import LongButton from '@/components/common/LongButton'
import theme from '@/styles/theme'

const containerStyle = css`
  height: 100vh;
  width: 100%;
  display: flex;
  background-color: ${theme.colors.white};
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${splashImage});
    width: 500px;
    height: 1000px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
  }
`

const contentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%;
`
const buttonStyle = css`
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
`

const logoStyle = css`
  position: absolute;
  top: 10%;
  left: 50%;
  height: 55px;
  width: 180px;
  transform: translate(-50%, -50%);
`

const signInText = css`
  color: ${theme.colors.grey};
  position: absolute;
  top: 78%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${theme.fontSize.sm};
`
export default function SignIn() {
  const provider = new GoogleAuthProvider()
  const navigate = useNavigate()

  async function SignInWithGoogle() {
    await signInWithPopup(auth, provider)
    navigate('/')
  }

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <img
          css={logoStyle}
          src={logo}
          alt="Logo"
        />
      </div>

      <div css={buttonStyle}>
        <LongButton onClick={SignInWithGoogle}>
          <img
            src={googleLogo}
            alt="Google Logo"
            style={{ width: '20px', height: '20px' }}
          />
          Continue with Google
        </LongButton>
      </div>

      <div>
        <p css={signInText}>ⓒ MAZI. All Rights Reserved.</p>
      </div>
    </div>
  )
}
