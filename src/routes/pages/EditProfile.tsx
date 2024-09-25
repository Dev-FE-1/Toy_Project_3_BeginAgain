import { useState, useRef, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useProfileStore } from '@/stores/editProfile'
import { css } from '@emotion/react'
import theme from '@/styles/theme'

export default function EditProfile() {
  const [previewPhoto, setPreviewPhoto] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const auth = getAuth()
  const user = auth.currentUser
  const storage = getStorage()

  const setTitle = useProfileStore((state) => state.setTitle)
  const displayName = useProfileStore((state) => state.displayName)
  const setDisplayName = useProfileStore((state) => state.setDisplayName)
  const photoURL = useProfileStore((state) => state.photoURL)
  const setPhotoURL = useProfileStore((state) => state.setPhotoURL)

  useEffect(() => {
    setTitle('프로필 수정')
    if (user) {
      setDisplayName(user.displayName || '')
      setPhotoURL(user.photoURL || '')
      setPreviewPhoto(user.photoURL || '')
    }
  }, [setTitle, user, setDisplayName, setPhotoURL])

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && user) {
      const newPhotoURL = URL.createObjectURL(file)
      setPreviewPhoto(newPhotoURL)

      try {
        const storageRef = ref(storage, `profile_images/${user.uid}`)
        await uploadBytes(storageRef, file)
        const downloadURL = await getDownloadURL(storageRef)
        await updateProfile(user, { photoURL: downloadURL })
        setPhotoURL(downloadURL)
      } catch (error) {
        console.error('사진 업로드 실패:', error)
      }
    }
  }

  return (
    <div css={pageStyle}>
      <div className="nav-margin-top"></div>
      {user && (
        <>
          <img
            src={previewPhoto || photoURL}
            alt="프로필 사진"
            css={profileStyle}
            onClick={handlePhotoClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            css={fileInputStyle}
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
`;

const profileStyle = css`
  width: 130px;
  margin-top: 40px;
  border-radius: 50%;
  cursor: pointer; 
`;

const fileInputStyle = css`
  display: none; 
`;

const textStyle = css`
  margin-top: 3rem;
  border-bottom: 2px solid #EBEBEB;
  font-size: ${theme.fontSize.md};
  height: 50px;
  width: 24.5em;
  padding-left: 3px;
`;

const titleText = css`
  color: ${theme.colors.black};
  margin-bottom: 10px;
`;

const inputStyle = css`
  padding: 10px;
  font-size: ${theme.fontSize.md};
  width: 100%;
  border: 1px solid ${theme.colors.grey};
  border-radius: 4px;
`;

const inputText = css`
  color: ${theme.colors.grey};
`;
