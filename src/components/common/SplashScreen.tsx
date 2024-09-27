import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/api/firebaseApp'
import { css } from '@emotion/react'
import whiteLogo from '@/assets/whiteLogo.png'
import backgroundImage from '@/assets/background.png'

export default function App() {
  const [isSplash, setIsSplash] = useState(true)
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
      <div>
        {isSplash && (
          <div css={containerStyle}>
            <img
              src={whiteLogo}
              css={logoStyle}
            />
          </div>
        )}
      </div>
    </>
  )
}

const containerStyle = css`
  background-image: url(${backgroundImage});
  background-size: 430px 990px;
  background-position: center;
  background-color: white;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: 1;
`
const logoStyle = css`
  height: 60px;
  width: 200px;
  text-align: center;
  z-index: 2;
`
