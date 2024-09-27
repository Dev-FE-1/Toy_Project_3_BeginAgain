import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { ChangeEvent, useState } from 'react'
import { FaRegEyeSlash, FaEyeSlash } from 'react-icons/fa'

interface InputProps {
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  value?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const inputStyle = css`
  width: 327px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 3px;
  border: 1px solid ${theme.colors.lightGrey};
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
`

const iconStyle = css`
  position: absolute;
  right: 16px;
  cursor: pointer;
  color: ${theme.colors.grey};
`

const Input = ({ type = 'text', placeholder, value, onChange }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div css={inputStyle}>
      <input
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        css={{ flex: 1, border: 'none', outline: 'none' }}
      />
      {type === 'password' && (
        <span
          onClick={togglePasswordVisibility}
          css={iconStyle}>
          {showPassword ? <FaEyeSlash /> : <FaRegEyeSlash />}
        </span>
      )}
    </div>
  )
}

export default Input
