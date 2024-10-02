import { NavLink } from 'react-router-dom'
import { SerializedStyles, css } from '@emotion/react'
import { IconType } from 'react-icons'
import theme from '@/styles/theme'

interface NavigationItemProps {
  path: string
  Icon: IconType
  label?: string
  onClick?: () => void
  customStyle?: SerializedStyles
}

const NavigationItem = ({
  path,
  Icon,
  label,
  onClick,
  customStyle
}: NavigationItemProps) => {
  return (
    <NavLink
      to={path}
      css={[navLinkStyle, customStyle]}
      onClick={onClick}
      className={({ isActive }) => (isActive ? 'active' : undefined)}>
      <div css={iconStyle}>
        <Icon css={icon} />
        {label}
      </div>
    </NavLink>
  )
}

const navLinkStyle = css`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  &.active {
    div {
      color: ${theme.colors.paleBlue};
    }
  }
  &:hover {
    div {
      color: ${theme.colors.paleBlue};
    }
  }
`

const iconStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.charcoalGrey};
  gap: 3px;
`

const icon = css`
  font-size: 24px;
  opacity: 0.8;
`

export default NavigationItem
