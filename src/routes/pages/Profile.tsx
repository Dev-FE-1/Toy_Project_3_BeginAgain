import LongButton from '@/components/common/LongButton'
import { css } from '@emotion/react'
import { signOut } from 'firebase/auth'
import { auth } from '@/api/firebaseApp'
import { useNavigate } from 'react-router-dom'
import { useHeaderStore } from '@/stores/header'
import { useEffect } from 'react'
import theme from '@/styles/theme'

const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
const profileStyle = css`
  width: 130px;
  margin-top: 50px;
  border-radius: 50%;
`
const textStyle = css`
  margin-top: 3rem;
  border-bottom: 2px solid #ebebeb;
  font-size: ${theme.fontSize.md};
  height: 55px;
  width: 100%;
  padding-left: 20px;
`
const titleText = css`
  color: ${theme.colors.black};
  margin-bottom: 10px;
`
const inputText = css`
  color: ${theme.colors.grey};
`
const logoutBtn = css`
  margin-top: 12em;
`

export default function Profile() {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('Profile')
  }, [setTitle])

  const user = auth.currentUser
  const navigate = useNavigate()

  async function logOut() {
    await signOut(auth)
    navigate('/SignIn')
  }
  return (
    <>
      <div css={pageStyle}>
        {user && (
          <>
            <img
              src={user.photoURL || ''}
              alt={user.displayName || ''}
              css={profileStyle}
            />
            <div css={textStyle}>
              <div css={titleText}>이름</div>
              <div css={inputText}>{user.displayName}</div>
            </div>
            <div css={textStyle}>
              <div css={titleText}>이메일</div>
              <div css={inputText}>{user.email}</div>
            </div>
          </>
        )}
        <div css={logoutBtn}>
          <LongButton
            onClick={logOut}
            text="Click Me">
            로그아웃
          </LongButton>
        </div>
      </div>
    </>
  )
}
