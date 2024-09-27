import { useEffect, useState } from 'react'
import { Category } from '@/components/common/Category'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { IoIosAddCircleOutline, IoIosRemove } from 'react-icons/io'
import { IoHelpCircleOutline } from 'react-icons/io5'
import { useHeaderStore } from '@/stores/header'
import { useAddPlaylistStore } from '@/stores/addPlaylist'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

const AddPlaylist = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { setIsDone, setPlaylistData } = useAddPlaylistStore()

  useEffect(() => {
    setTitle('컨텐츠 추가')
  }, [setTitle])
  const [videoUrls, setVideoUrls] = useState<string[]>([])
  const [currentVideoUrl, setCurrentVideoUrl] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [videoDescription, setVideoDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [titleInputCount, setTitleInputCount] = useState(0)
  const [descriptionInputCount, setDescriptionInputCount] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '전체'
  ])

  useEffect(() => {
    const hasRequiredData =
      videoUrls.length > 1 &&
      videoTitle.trim() !== '' &&
      selectedCategories.length > 0
    setIsDone(hasRequiredData)
    setPlaylistData(
      videoUrls,
      videoTitle,
      videoDescription,
      isPublic,
      selectedCategories
    )
  }, [
    videoUrls,
    videoTitle,
    videoDescription,
    isPublic,
    selectedCategories,
    setIsDone,
    setPlaylistData
  ])

  const addVideoUrl = () => {
    const pattern = /^https:\/\/www\.youtube\.com\/watch\?v=.*/
    if (!currentVideoUrl.match(pattern)) {
      alert(
        'https://www.youtube.com/watch?v= 를 반드시 포함시킨 링크만을 사용해주세요!'
      )
      return
    }
    if (currentVideoUrl && !videoUrls.includes(currentVideoUrl)) {
      setVideoUrls([...videoUrls, currentVideoUrl])
      setCurrentVideoUrl('')
    }
  }

  const removeVideoUrl = (index: number) => {
    setVideoUrls(videoUrls.filter((_, i) => i !== index))
  }

  const onTitleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoTitle(e.target.value)
    setTitleInputCount(e.target.value.length)
  }

  const onDescriptionInputHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setVideoDescription(e.target.value)
    setDescriptionInputCount(e.target.value.length)
  }

  const handleCategorySelect = (categories: string[]) => {
    if (!categories.includes('전체')) {
      categories = ['전체', ...categories]
    }
    setSelectedCategories(categories)
  }

  return (
    <>
      <div css={DivContainer}>
        <div className="nav-margin-top"></div>

        <div css={TitleContainer}>
          <span css={requiredTitleStyle}>동영상 링크</span>
          <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="1. + 버튼을 눌러야 링크가 추가됩니다. 2. 반드시 2개 이상의 유튜브 URL을 추가해주세요."
            data-tooltip-place="bottom"
            css={TooltipIconContainer}>
            <IoHelpCircleOutline
              size="19"
              color="#7695FF"
            />
          </a>
          <Tooltip
            id="my-tooltip"
            style={{
              width: '16rem',
              lineHeight: '1.3',
              backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }}
          />
        </div>

        <div css={InputButtonContainer}>
          <input
            type="text"
            placeholder="동영상 주소를 입력해주세요."
            value={currentVideoUrl}
            onChange={e => setCurrentVideoUrl(e.target.value)}
            css={LinkInputContainer}
          />
          <button
            css={AddButton}
            onClick={addVideoUrl}>
            <IoIosAddCircleOutline size="20" />
          </button>
        </div>

        <ul css={DeleteButtonContainer}>
          {videoUrls.map((url, index) => (
            <li
              key={index}
              css={UrlStyle}>
              {url}
              <button
                onClick={() => removeVideoUrl(index)}
                css={DeleteButton}>
                <IoIosRemove
                  size="15"
                  color="#D32F2F"
                />
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
            setVideoTitle(e.target.value)
            onTitleInputHandler(e)
          }}
          css={TitleInputContainer}
          maxLength={20}
        />
        <p css={firstSpanContainer}>
          <span>{titleInputCount}</span>
          <span>/20</span>
        </p>
      </div>
      <div css={DivContainer}>
        <div css={TitleContainer}>설명</div>
        <textarea
          placeholder="설명을 입력해주세요."
          value={videoDescription}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setVideoDescription(e.target.value)
            onDescriptionInputHandler(e)
          }}
          rows={5}
          maxLength={40}
          css={textAreaContainer}
        />
        <p css={SpanContainer}>
          <span>{descriptionInputCount}</span>
          <span>/40</span>
        </p>
      </div>
      <div css={DivContainer}>
        <div css={TitleContainer}>
          <div css={requiredTitleStyle}>카테고리 설정</div>
        </div>
        <div css={CategoryStyle}>
          <Category
            selectedCategories={selectedCategories}
            onSelectCategory={handleCategorySelect}
          />
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

const InputButtonContainer = css`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`

const TooltipIconContainer = css`
  margin-left: 3px;
  cursor: pointer;
`

const requiredTitleStyle = css`
  &::before {
    content: '*';
    color: ${theme.colors.red};
    margin-right: 2px;
  }
`
const commonButtonStyle = css`
  z-index: 1;
  position: fixed;
  border: none;
  background-color: transparent;
  cursor: pointer;
`
const commonInputStyle = css`
  border: none;
  border-bottom: 2px solid #ebebeb;
  outline: none;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.black};
  height: 30px;
  width: 24.5em;
  margin-left: 18px;
  padding-left: 3px;
  letter-spacing: -1px;
  box-sizing: border-box;
  margin-bottom: 35px;
`

const DivContainer = css`
  position: relative;
  display: inline-block;
  width: 100%;
  transform: rotate(0);
  margin-top: 20px;
`
const TitleContainer = css`
  font-size: ${theme.fontSize.md};
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 20px;
`
const LinkInputContainer = css`
  ${commonInputStyle}
  margin-bottom: 10px;
  letter-spacing: 0.3px;
`
const TitleInputContainer = css`
  ${commonInputStyle}
  letter-spacing: 0.3px;
`
const textAreaContainer = css`
  letter-spacing: 0.3px;
  padding: 8px;
  width: 390px;
  height: 100px;
  border: 1px solid ${theme.colors.grey};
  border-radius: 5px;
  margin-left: 20px;
  margin-right: 20px;
  resize: none;
  font-size: ${theme.fontSize.md};
  font: inherit;
  padding-top: 10px;
  margin-bottom: 30px;
  outline: none;
`
const firstSpanContainer = css`
  display: inline-block;
  z-index: 1;
  position: fixed;
  right: 1.5rem;
  transform: translateY(50%);
  background-color: transparent;
  color: ${theme.colors.grey};
  font-size: ${theme.fontSize.sm};
`
const SpanContainer = css`
  display: inline-block;
  z-index: 1;
  position: fixed;
  right: 1.5rem;
  top: 95px;
  transform: translateY(50%);
  background-color: transparent;
  color: ${theme.colors.grey};
  font-size: ${theme.fontSize.sm};
`
const AddButton = css`
  ${commonButtonStyle}
  margin-left: 28.4em;
  margin-bottom: 13px;
  transform: none;
`
const DeleteButtonContainer = css`
  position: relative;
  margin-left: 1.5rem;
  overflow-y: scroll;
  max-width: 24rem;
  max-height: 6rem;
  margin-bottom: 35px;
  cursor: pointer;
  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.lightGrey};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.grey};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${theme.colors.skyBlue};
  }
`
const DeleteButton = css`
  ${commonButtonStyle}
  position: absolute;
  right: 0;
  margin-bottom: 7px;
`
const UrlStyle = css`
  display: flex;
  margin-bottom: 5px;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.darkGrey};
  max-width: 22rem;
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
  cursor: pointer;
`
export default AddPlaylist
