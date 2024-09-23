import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { useHeaderStore } from '@/stores/header'
import { useEffect, useState } from 'react'
import Category from '@/components/common/Category'

export default function EditPlaylistInfo() {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
    setTitle('Edit Playlist')
  }, [setTitle])

  const [videoUrls, setVideoUrls] = useState<string[]>([])
  const [videoTitle, setVideoTitle] = useState('')
  const [videoDescription, setVideoDescription] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [titleInputCount, setTitleInputCount] = useState(0)
  const [descriptionInputCount, setDescriptionInputCount] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    '전체'
  ])

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

  return (
    <>
      <div className="nav-margin-top"></div>
      <div css={DivContainer}>
        <div css={TitleContainer}>
          <span>플레이리스트 제목</span>
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
          maxLength={15}
        />
        <p css={firstSpanContainer}>
          <span>{titleInputCount}</span>
          <span>/15</span>
        </p>

        <div css={TitleContainer}>설명</div>
        <textarea
          placeholder="설명을 입력해주세요."
          value={videoDescription}
          onChange={e => {
            setVideoDescription(e.target.value)
            onDescriptionInputHandler(e)
          }}
          rows={3}
          maxLength={30}
          css={textAreaContainer}
        />
        <p css={secondSpanContainer}>
          <span>{descriptionInputCount}</span>
          <span>/30</span>
        </p>

        <div css={TitleContainer}>
          <div>카테고리 설정</div>
        </div>
        <div css={CategoryStyle}>
          <Category
            selectedCategories={selectedCategories}
            onSelectCategory={() => {}}
          />
        </div>

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
      <div className="nav-margin-bottom"></div>
    </>
  )
}

const commonInputStyle = css`
  border: none;
  border-bottom: 1px solid ${theme.colors.grey};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.black};
  height: 30px;
  width: 390px;
  margin-left: 20px;
  letter-spacing: -0.2px;
  box-sizing: border-box;
  margin-bottom: 30px;
  outline: none;
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

const TitleInputContainer = css`
  ${commonInputStyle}
`

const textAreaContainer = css`
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
  right: 30px;
  transform: translateY(50%);
  background-color: transparent;
  color: ${theme.colors.grey};
  font-size: ${theme.fontSize.sm};
`

const secondSpanContainer = css`
  display: inline-block;
  z-index: 1;
  position: fixed;
  right: 30px;
  top: 180px;
  transform: translateY(50%);
  background-color: transparent;
  color: ${theme.colors.grey};
  font-size: ${theme.fontSize.sm};
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
