import Logo from '@/assets/logo.png'
import { css } from '@emotion/react'
import { Colors, Width } from '@/styles/Theme'
import { createPortal } from 'react-dom'

const LogoHeader = () => {
  return createPortal(
    <div css={headerStyle}>
      <img
        src={Logo}
        alt="Logo"
        css={logoStyle}
      />
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
  width: ${Width.max};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  color: ${Colors.white};
`

const logoStyle = css`
  height: 25px;
  width: 75px;
`

export default LogoHeader
