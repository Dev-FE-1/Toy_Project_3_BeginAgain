import { css } from '@emotion/react'
import theme from '@/styles/theme'
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
    background-color: ${theme.colors.lightBlue};
    font-size: ${theme.fontSize.md};
    color: ${theme.colors.white};
  `,
  cancel: css`
    background-color: ${theme.colors.lightGrey};
    font-size: ${theme.fontSize.md};
    color: ${theme.colors.black};
  `
}

export default ShortButton
