import { NavLink } from 'react-router-dom'
import { css } from '@emotion/react'
import { IconType } from 'react-icons'

interface NavigationItemProps {
  path: string
  Icon: IconType
}

const NavigationItem = ({ path, Icon }: NavigationItemProps) => {
  return (
    <NavLink to={path}>
      <Icon css={icon} />
    </NavLink>
  )
}

const icon = css`
  font-size: 24px;
  opacity: 0.8;
`

export default NavigationItem
