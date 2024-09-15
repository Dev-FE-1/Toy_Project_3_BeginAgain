import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { Colors } from '@/styles/Theme'
import { FontSize } from '@/styles/Theme'
import { CgCheckO } from 'react-icons/cg'

const toastStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: ${Colors.charcoalGrey};
  color: ${Colors.white};
  border-radius: 6px;
  font-size: ${FontSize.md};
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 8;
  transition: opacity 0.5s ease-in-out;
  opacity: 1;
`

const hiddenStyle = css`
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`

interface ToastProps {
  message: string
  duration?: number
  isVisible: boolean
  onHide: () => void
}

const Toast: React.FC<ToastProps> = ({
  message,
  duration = 2000,
  isVisible,
  onHide
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onHide])

  return (
    <div css={isVisible ? toastStyle : hiddenStyle}>
      <CgCheckO
        size={FontSize.md.replace('px', '')}
        color={Colors.white}
      />
      <span>{message}</span>
    </div>
  )
}

export default Toast
