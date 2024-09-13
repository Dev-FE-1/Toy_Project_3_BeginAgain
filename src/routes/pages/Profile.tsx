import LongButton from '@/components/common/LongButton'
import { css } from '@emotion/react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'

const pageStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export default function Profile() {
  const setTitle = useHeaderStore(state => state.setTitle)
  setTitle('Profile')

  const auth = getAuth()
  const user = auth.currentUser
  const navigate = useNavigate()

  async function logOut() {
    await signOut(auth)
    navigate('/login')
  }
  return (
    <>
      <div css={pageStyle}>
        {user && (
          <>
            <h1>{user.displayName}</h1>
            <img
              src={user.photoURL || ''}
              alt={user.displayName || ''}
              width={100}
            />
          </>
        )}
        <LongButton
          onClick={logOut}
          text="Click Me">
          로그아웃
        </LongButton>
      </div>
    </>
  )
}
