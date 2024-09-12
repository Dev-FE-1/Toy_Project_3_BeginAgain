import Header from '@/components/theLayout/theHeader/Header'
import LongButton from '@/components/LongButton'
import { css } from '@emotion/react'

const Profile = () => {
  return (
    <>
      <Header title="Profile" />
      <div css={pageStyle}>
        <h1>Profile</h1>
        <LongButton
          onClick={() => alert('Click')}
          text="Click Me">
          로그아웃
        </LongButton>
      </div>
    </>
  )
}

const pageStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export default Profile
