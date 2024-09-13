import { css } from '@emotion/react'
import { Colors, FontSize } from '@/styles/Theme'
import { ReactNode } from 'react'

interface ShortButtonProps {
  children: ReactNode
  text?: string
  onClick: () => void
  type?: 'button' | 'submit'
  styleType: 'confirm' | 'cancel'
}

const ShortButton = ({
  children,
  onClick,
  type = 'button',
  styleType
}: ShortButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      css={[baseButtonStyle, buttonStyle[styleType] || []]}>
      {children}
    </button>
  )
}

const baseButtonStyle = css`
  display: flex;
  width: 160px;
  height: 35px;
  padding: 8px 11px;
  justify-content: center;
  align-items: center;
  justify-content: center;
  align-items: center;
  gap: 7px;
  flex: 1 0 0;
  border: none;
  border-radius: 3px;
`

const buttonStyle = {
  confirm: css`
    background-color: ${Colors.lightBlue};
    font-size: ${FontSize.md};
    color: ${Colors.white};
  `,
  cancel: css`
    background-color: ${Colors.lightGrey};
    font-size: ${FontSize.md};
    color: ${Colors.black};
  `
}

export default ShortButton
