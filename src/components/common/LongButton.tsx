import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { ReactNode } from 'react'

interface LongButtonProps {
  children: ReactNode
  text: string
  onClick: () => void
  type?: 'button' | 'submit'
}

const LongButton = ({
  children,
  onClick,
  type = 'submit'
}: LongButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      css={longButtonStyle}>
      {children}
    </button>
  )
}

const longButtonStyle = css`
  display: flex;
  width: 327px;
  height: 48px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 3px;
  background-color: ${theme.colors.lightBlue};
  border: none;
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.white};
  cursor: pointer;
`

export default LongButton
