import { css } from '@emotion/react'
import { Colors, FontSize } from '@/styles/Theme'

interface EmptyInfoProps {
  title: string
  status: string
}

const EmptyInfo = ({ title, status }: EmptyInfoProps) => {
  return (
    <div css={sentenceContainerStyle}>
      <span css={firstSentenceStyle}>
        {status}된 {title}가 없습니다.
      </span>
      <span css={secondSentenceStyle}>{title}를 추가해주세요.</span>
    </div>
  )
}
// 문구 예시
// 북마크된 플레이리스트가 없습니다
// 등록된 코멘트가 없습니다

const sentenceContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  align-items: center;
`
const firstSentenceStyle = css`
  font-size: ${FontSize.lg};
  color: ${Colors.charcoalGrey};
`

const secondSentenceStyle = css`
  font-size: ${FontSize.md};
  color: ${Colors.grey};
`
export default EmptyInfo
