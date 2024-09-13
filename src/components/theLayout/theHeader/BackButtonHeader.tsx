import { css } from '@emotion/react'
import { Colors, Width } from '@/styles/Theme'
import { FontSize } from '@/styles/Theme'
import { createPortal } from 'react-dom'
import { CgChevronLeft } from 'react-icons/cg'

interface BackButtonHeaderProps {
  title: string
}

const BackButtonHeader = ({ title }: BackButtonHeaderProps) => {
  const headerElement = document.getElementById('header')

  if (!headerElement) {
    return null
  }

  return createPortal(
    <div css={headerStyle}>
      <CgChevronLeft css={iconStyle} />
      <h1 css={titleStyle}>{title}</h1>
    </div>,
    headerElement
  )
}

const headerStyle = css`
  display: flex;
  justify-content: flex-start;
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

const iconStyle = css`
  font-size: 24px;
  color: ${Colors.black};
  margin-right: 12px;
`

const titleStyle = css`
  font-size: ${FontSize.xl};
  color: ${Colors.black};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`

export default BackButtonHeader
