import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Category from '@/components/common/Category'
import { css } from '@emotion/react'
import { Colors, FontSize, FontWeight } from '@/styles/Theme'
// import { GrAddCircle } from 'react-icons/gr'
import { useHeaderStore } from '@/stores/header'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const AddPlaylist = () => {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('Add Playlist')
  }, [setTitle])

  const navigate = useNavigate()
  const [videoUrl, setVideoUrl] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [videoDescription, setVideoDescription] = useState('')
  // const [videoCategory, setVideoCategory] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (videoUrl && videoTitle) {
      return setIsDone(true)
    }
    return setIsDone(false)
  }, [videoUrl, videoTitle, isPublic])

  async function addPlaylist() {
    console.log(videoUrl, videoTitle, videoDescription, isPublic)
    const auth = getAuth()
    const db = getFirestore()
    const user = auth.currentUser
    const coll = collection(db, 'Playlists')
    await addDoc(coll, {
      urls: [videoUrl],
      title: videoTitle,
      description: videoDescription,
      isPublic,
      userId: user?.uid,
      createdAt: new Date().toISOString()
    })

    // 좋아요!
    // await addDoc(coll, {
    //   playlistId: '', // 참조(ref)
    //   userId: user?.uid, // 참조
    //   createdAt: new Date().toISOString()
    // })

    // 댓글
    // await addDoc(coll, {
    //   playlistId: '', // 참조(ref)
    //   userId: user?.uid, // 참조
    //   comment: '너무 좋은 플레이리스트에요. 감사합니다!'
    //   createdAt: new Date().toISOString()
    // })

    navigate('/')
  }

  return (
    <>
      <div css={DivContainer}>
        <div css={TitleContainer}>동영상 링크</div>

        {isDone && <button onClick={addPlaylist}>완료</button>}

        <input
          type="text"
          placeholder="동영상 주소를 입력해주세요."
          value={videoUrl}
          onChange={e => setVideoUrl(e.target.value)}
          css={InputContainer}
        />
        {/* <button css={AddButton}>
          <GrAddCircle
            size={24}
            color="#1E1E1E"
          />
        </button> */}
      </div>

      <div css={DivContainer}>
        <div css={TitleContainer}>플레이리스트 제목</div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={videoTitle}
          onChange={e => setVideoTitle(e.target.value)}
          css={InputContainer}
        />
      </div>

      <div css={DivContainer}>
        <div css={TitleContainer}>설명</div>
        <input
          type="text"
          placeholder="설명을 입력해주세요."
          value={videoDescription}
          onChange={e => setVideoDescription(e.target.value)}
          css={InputContainer}
        />
      </div>

      <div css={DivContainer}>
        <div css={TitleContainer}>카테고리 설정</div>
        <div css={CategoryStyle}>
          <Category />
        </div>
      </div>

      <div css={DivContainer}>
        <div css={TitleContainer}>공개 설정</div>
        <label css={RadioLabelStyle}>
          <input
            type="radio"
            value="Open"
            checked={isPublic}
            onChange={() => setIsPublic(true)}
            css={RadioInputStyle}
          />
          공개
        </label>
        <label css={RadioLabelStyle}>
          <input
            type="radio"
            value="Close"
            checked={!isPublic}
            onChange={() => setIsPublic(false)}
            css={RadioInputStyle}
          />
          비공개
        </label>
      </div>
    </>
  )
}

const DivContainer = css`
  position: relative;
  display: inline-block;
  width: 100%;
`
const TitleContainer = css`
  font-size: ${FontSize.md};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`
const InputContainer = css`
  border: none;
  border-bottom: 2px solid #ebebeb;
  outline: none;
  font-size: ${FontSize.md};
  font-weight: ${FontWeight.medium};
  color: ${Colors.black};
  height: 30px;
  width: 100%;
  letter-spacing: -0.2px;
  padding-left: 10px;
  padding-right: 40px;
  box-sizing: border-box;
  margin-bottom: 35px;
`
// const AddButton = css`
//   position: absolute;
//   right: 0;
//   bottom: 50px;
//   transform: translateY(50%);
//   border: none;
//   background-color: transparent;
//   cursor: pointer;
// `
const CategoryStyle = css`
  margin-bottom: 35px;
`
const RadioLabelStyle = css`
  margin-right: 20px;
  display: inline-block;
`

const RadioInputStyle = css`
  margin-right: 8px;
`

export default AddPlaylist
