import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Category from '@/components/common/Category'
import { css } from '@emotion/react'
import { Colors, FontSize, FontWeight } from '@/styles/Theme'
import { IoIosAddCircleOutline, IoIosRemove } from "react-icons/io"
import { useHeaderStore } from '@/stores/header'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const AddPlaylist = () => {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('Add Playlist')
  }, [setTitle])

  const navigate = useNavigate()
  const [videoUrls, setVideoUrls] = useState<string[]>([])  
  const [currentVideoUrl, setCurrentVideoUrl] = useState('')  
  const [videoTitle, setVideoTitle] = useState('')
  const [videoDescription, setVideoDescription] = useState('')
  // const [videoCategory, setVideoCategory] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [isDone, setIsDone] = useState(false)
  const [inputCount, setInputCount] = useState(0);

  useEffect(() => {
    if (videoUrls.length > 0 && videoTitle) {
      return setIsDone(true)
    }
    return setIsDone(false)
  }, [videoUrls, videoTitle, isPublic])

  const addVideoUrl = () => {
    if (currentVideoUrl && !videoUrls.includes(currentVideoUrl)) {
      setVideoUrls([...videoUrls, currentVideoUrl])
      setCurrentVideoUrl('') 
    }
  }

  const removeVideoUrl = (index: number) => {
    setVideoUrls(videoUrls.filter((_, i) => i !== index))
  }

  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCount(e.target.value.length);
  };

  async function addPlaylist() {
    console.log(videoUrls, videoTitle, videoDescription, isPublic)
    const auth = getAuth()
    const db = getFirestore()
    const user = auth.currentUser
    const coll = collection(db, 'Playlists')

    await addDoc(coll, {
      urls: videoUrls,
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
    
    navigate('/', { state: { showToast: true } });
  }

  return (
    <>
      {isDone && <button onClick={addPlaylist}>완료</button>}
      <div css={DivContainer}>
        <div css={TitleContainer}>
          <span css={requiredTitleStyle}>동영상 링크</span>
        </div>
        <input
          type="text"
          placeholder="동영상 주소를 입력해주세요."
          value={currentVideoUrl}
          onChange={e => setCurrentVideoUrl(e.target.value)}
          css={LinkInputContainer}
        />
        <button css={AddButton} onClick={addVideoUrl}>
          <IoIosAddCircleOutline size='20' />
        </button>
        <ul css={DeleteButtonContainer}>
          {videoUrls.map((url, index) => (
            <li key={index} css={UrlStyle}>
              {url}
              <button
                onClick={() => removeVideoUrl(index)}
                css={DeleteButton}>
                <IoIosRemove size='15' color='#D32F2F' />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div css={DivContainer}>
        <div css={TitleContainer}>
          <span css={requiredTitleStyle}>플레이리스트 제목</span>
        </div>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={videoTitle}
          onChange={e => {
            setVideoTitle(e.target.value);
            onInputHandler(e);
          }}
          css={TitleInputContainer}
          maxLength={30}
        />
        <p css={SpanContainer}>
          <span>{inputCount}</span>
          <span>/30</span>
        </p>
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
        <div css={TitleContainer}>
          <div css={requiredTitleStyle}>카테고리 설정</div>
        </div>
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

const requiredTitleStyle = css`
  &::after {
    content: '*';
    color: red;
    margin-left: 4px;
  }
`

const DivContainer = css`
  position: relative;
  display: inline-block;
  width: 100%;
  transform: rotate(0);
`

const TitleContainer = css`
  font-size: ${FontSize.md};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
`

const InputBaseStyle = css`
  border: none;
  border-bottom: 2px solid #ebebeb;
  outline: none;
  font-size: ${FontSize.md};
  font-weight: ${FontWeight.medium};
  color: ${Colors.black};
  height: 30px;
  width: 100%;
  letter-spacing: -0.2px;
  padding-left: 30px;
  padding-right: 40px;
  box-sizing: border-box;
  margin-bottom: 10px;
`

const LinkInputContainer = css`
  ${InputBaseStyle}
`

const TitleInputContainer = css`
  ${InputBaseStyle}
  margin-bottom: 35px;
`

const InputContainer = css`
  ${InputBaseStyle}
  margin-bottom: 35px;
`

const SpanContainer = css`
  display: inline-block;
  z-index: 9;
  position: fixed;
  right: 0.5rem;
  transform: translateY(50%);
  border: none;
  background-color: transparent;
  color: ${Colors.grey};
  font-size: ${FontSize.sm};
`

const AddButton = css`
  z-index: 9;
  position: fixed;
  top: 15px;
  right: 0;
  transform: translateY(50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
`

const DeleteButtonContainer = css`
  position: relative;
  overflow-y: scroll;
  max-height: 4rem;
  margin-bottom: 35px;
  cursor: pointer;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${Colors.lightGrey};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${Colors.grey};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${Colors.skyBlue};
  }
`

const DeleteButton = css`
  position: absolute;
  right: 0;
  margin-bottom: 7px;
  transform: translateY(23%);
  border: none;
  background-color: transparent;
  cursor: pointer;
`

const UrlStyle = css`
  display: flex;
  margin-left: 20px;
  margin-bottom: 5px;
  align-items: center;
  justify-content: space-between;
  font-size: ${FontSize.xs};
  color: ${Colors.darkGrey};
`

const CategoryStyle = css`
  margin-bottom: 35px;
`

const RadioLabelStyle = css`
  margin-left: 20px;
  display: inline-block;
`

const RadioInputStyle = css`
  margin-right: 10px;
`

export default AddPlaylist