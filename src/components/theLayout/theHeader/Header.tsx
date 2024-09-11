import { css } from '@emotion/react'
import { Colors } from '@/styles/Theme'
import { FontSize } from '@/styles/Theme'
import { createPortal } from 'react-dom'

interface HeaderProps {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return createPortal(
    <div css={headerStyle}>
      <h1 css={titleStyle}>{title}</h1>
    </div>,
    document.getElementById('header')!
  )
}

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  position: sticky;

  z-index: 100;
  color: ${Colors.white};
`

const titleStyle = css`
  font-size: ${FontSize.xl};
  color: ${Colors.black};
`

export default Header
