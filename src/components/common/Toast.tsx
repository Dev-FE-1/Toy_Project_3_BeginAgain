import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { CgCheckO } from 'react-icons/cg'

const toastStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: ${theme.colors.charcoalGrey};
  color: ${theme.colors.white};
  border-radius: 6px;
  font-size: ${theme.fontSize.md};
  position: fixed;
  bottom: 100px;
  left: 50%;
  z-index: 9;
  transform: translateX(-50%);
  transition: opacity 0.5s ease-in-out;
  opacity: 0;
  visibility: hidden;
`
const visibleStyle = css`
  opacity: 1;
  visibility: visible;
`
const hiddenStyle = css`
  opacity: 0;
  visibility: hidden;
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
    <div css={[toastStyle, isVisible ? visibleStyle : hiddenStyle]}>
      <CgCheckO
        size={theme.fontSize.md.replace('px', '')}
        color={theme.colors.white}
      />
      <span>{message}</span>
    </div>
  )
}

export default Toast
