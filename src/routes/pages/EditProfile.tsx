import { useState, useRef, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useProfileStore } from '@/stores/editProfile'
import { css } from '@emotion/react'
import { FaCamera } from 'react-icons/fa'
import theme from '@/styles/theme'
import { useHeaderStore } from '@/stores/header'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import TheHeader from '@/components/layouts/headers/TheHeader'
import Modal from '@/components/common/TheModal'
import { useNavigate } from 'react-router-dom'


export default function EditProfile() {
  const { displayName, setDisplayName, photoURL, setPhotoURL } = useProfileStore()
  const setHeaderTitle = useHeaderStore((state) => state.setTitle)
  const [previewPhoto, setPreviewPhoto] = useState<string>(photoURL || '')
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  

  const auth = getAuth()
  const user = auth.currentUser
  const storage = getStorage()
  const firestore = getFirestore()
  const navigate = useNavigate()


  const initialDisplayName = useRef(displayName)
  const initialPhotoURL = useRef(photoURL)
  const [isModified, setIsModified] = useState(false)

  useEffect(() => {
    setHeaderTitle('프로필 수정')
    if (user) {
      setDisplayName(user.displayName || '')
      setPhotoURL(user.photoURL || '')
      setPreviewPhoto(user.photoURL || '')
    }
  }, [setHeaderTitle, user, setDisplayName, setPhotoURL])

  useEffect(() => {
    setIsModified(
      displayName !== initialDisplayName.current || photoURL !== initialPhotoURL.current
    );
  }, [displayName, photoURL])

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  };

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

        const userRef = doc(firestore, 'Users', user.uid)
        await setDoc(userRef, {
          displayName: displayName,
          photoURL: downloadURL,
          email: user.email,
        }, { merge: true })
      } catch (error) {
        console.error('사진 업로드 실패:', error)
      }
    }
  }

  const handleOpenModal = () => {
    if (isModified) {
      setShowConfirmModal(true)
    } else {
      navigate(-1)
    }
  }

  const handleCloseModal = () => {
    setShowConfirmModal(false)
  }

  const handleConfirmLeave = () => {
    setShowConfirmModal(false)
    navigate(-1)
  }

  return (
    <div css={pageStyle}>
      <TheHeader onOpenModal={handleOpenModal} />
      <div className="nav-margin-top"></div>
      {user && (
        <>
          <div css={profileContainerStyle}>
            <img
              src={previewPhoto || photoURL}
              alt="프로필 사진"
              css={profileStyle}
              onClick={handlePhotoClick}
            />
            <div css={iconStyle} onClick={handlePhotoClick}>
              <FaCamera size={20} />
            </div>
          </div>
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
      
      {showConfirmModal && (
        <Modal
          isOpen={showConfirmModal}
          title="변경사항이 저장되지 않습니다."
          description="정말 나가시겠습니까?"
          onConfirm={handleConfirmLeave}
          onClose={handleCloseModal}
        />
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

const profileContainerStyle = css`
  position: relative;
  width: 130px;
  margin-top: 40px;
`;

const profileStyle = css`
  width: 100%;
  border-radius: 50%;
  cursor: pointer; 
`;

const iconStyle = css`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  color: white;
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
  border-radius: 5px;
  height: 2rem;
`;

const inputText = css`
  color: ${theme.colors.grey};
`;
