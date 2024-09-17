import { css } from '@emotion/react'
import { Colors, FontSize } from '@/styles/Theme'
import { ReactNode } from 'react'

interface LongButtonProps {
  children: ReactNode
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
  background-color: ${Colors.lightBlue};
  border: none;
  font-size: ${FontSize.md};
  color: ${Colors.white};
`

export default LongButton
