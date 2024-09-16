import { NavLink } from 'react-router-dom'
import { css } from '@emotion/react'
import { IconType } from 'react-icons'
import { FontSize, Colors } from '@/styles/Theme'

interface NavigationItemProps {
  path: string
  Icon: IconType
  label?: string
  isActive?: boolean
  onClick?: () => void
  blockActiveColor?: boolean
}

const NavigationItem = ({
  path,
  Icon,
  label,
  isActive,
  onClick,
  blockActiveColor
}: NavigationItemProps) => {
  return (
    <NavLink
      to={path}
      css={navLinkStyle}
      onClick={onClick}>
      <div css={[iconStyle, isActive && !blockActiveColor && activeIconStyle]}>
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
`

const iconStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: ${FontSize.xs};
  color: ${Colors.charcoalGrey};
  gap: 3px;
`

const icon = css`
  font-size: 24px;
  opacity: 0.8;
`

const activeIconStyle = css`
  color: ${Colors.paleBlue};
`
export default NavigationItem
