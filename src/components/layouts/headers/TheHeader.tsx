import { css } from '@emotion/react'
import { Colors, Width } from '@/styles/Theme'
import { FontSize } from '@/styles/Theme'
import { CgChevronLeft } from 'react-icons/cg'
import { useHeaderStore } from '@/stores/header'
import { useNavigate } from 'react-router-dom'

export default function TheHeader() {
  const title = useHeaderStore(state => state.title)
  const navigate = useNavigate()

  return (
    <header css={headerStyle}>
      {title === 'PlaylistDetailPage' && (
        <CgChevronLeft
          css={iconStyle}
          onClick={() => navigate(-1)}
        />
      )}
      <h1 css={titleStyle}>{title}</h1>
    </header>
  )
}

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  position: sticky;
  width: ${Width.max};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  color: ${Colors.white};
`

const titleStyle = css`
  font-size: ${FontSize.xl};
  color: ${Colors.black};
`

const iconStyle = css`
  font-size: 24px;
  color: ${Colors.black};
  margin-right: 12px;
`
