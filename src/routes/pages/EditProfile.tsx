import { useEffect, useRef } from 'react'
import { getAuth } from "firebase/auth"
import { useHeaderStore } from '@/stores/header'
import { useProfileStore } from '@/stores/editProfile'
import { css } from '@emotion/react'
import theme from '@/styles/theme'

export default function EditProfile() {
  const setTitle = useHeaderStore(state => state.setTitle)
  const displayName = useProfileStore(state => state.displayName)
  const setDisplayName = useProfileStore(state => state.setDisplayName)
  const photoURL = useProfileStore(state => state.photoURL)
  const setPhotoURL = useProfileStore(state => state.setPhotoURL)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    setTitle('프로필 수정')
    if (user) {
      setDisplayName(user.displayName || '')
      setPhotoURL(user.photoURL || '')
    }
  }, [setTitle, user, setDisplayName, setPhotoURL])

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoURL(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div css={pageStyle}>
      <div className="nav-margin-top"></div>
      {user && (
        <>
          <img
            src={photoURL || ''}
            alt={displayName || ''}
            css={profileStyle}
            onClick={handleImageClick}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onChangeImage}
            css={hiddenInputStyle}
          />
          <div css={textStyle}>
            <div css={titleText}>닉네임</div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              css={inputStyle}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div css={textStyle}>
            <div css={titleText}>이메일</div>
            <div css={inputText}>{user.email}</div>
          </div>
        </>
      )}
    </div>
  )
}

const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const profileStyle = css`
  width: 130px;
  height: 130px;
  margin-top: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`

const hiddenInputStyle = css`
  display: none;
`

const textStyle = css`
  margin-top: 3rem;
  border-bottom: 2px solid #ebebeb;
  font-size: ${theme.fontSize.md};
  height: 50px;
  width: 24.5em;
  padding-left: 3px;
`

const titleText = css`
  color: ${theme.colors.black};
  margin-bottom: 10px;
`

const inputStyle = css`
  padding: 10px;
  font-size: ${theme.fontSize.md};
  width: 100%;
  border: 1px solid ${theme.colors.grey};
  border-radius: 4px;
`

const inputText = css`
  color: ${theme.colors.grey};
`
