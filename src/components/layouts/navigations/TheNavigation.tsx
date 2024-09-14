import {
  CgHome,
  CgStack,
  CgBookmark,
  CgMathPlus,
  CgProfile
} from 'react-icons/cg'
import { css } from '@emotion/react'
import { Colors, Width, FontSize } from '@/styles/Theme'
import NavigationItem from './NavigationItem'
import { useLocation, useNavigate } from 'react-router-dom'
import React from 'react'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [path, setPath] = React.useState(location.pathname)

  const handleNavigation = (path: string) => {
    setPath(path)
    navigate(path)
  }

  return (
    <nav>
      <ul css={navbar}>
        <NavigationItem
          path="/"
          Icon={CgHome}
          label="Home"
          isActive={path === '/'}
          onClick={() => handleNavigation('/')}
        />
        <NavigationItem
          path="/my-playlist"
          Icon={CgStack}
          label="Playlist"
          isActive={path === '/my-playlist'}
          onClick={() => handleNavigation('/my-playlist')}
        />
        <div css={addButtonStyle}>
          <NavigationItem
            path="/add-playlist"
            Icon={CgMathPlus}
          />
        </div>
        <NavigationItem
          path="/bookmark"
          Icon={CgBookmark}
          label="Bookmark"
          isActive={path === '/bookmark'}
          onClick={() => handleNavigation('/bookmark')}
        />
        <NavigationItem
          path="/profile"
          Icon={CgProfile}
          label="Profile"
          isActive={path === '/profile'}
          onClick={() => handleNavigation('/profile')}
        />
      </ul>
    </nav>
  )
}

const navbar = css`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 72px;
  position: fixed;
  width: ${Width.max};
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background-color: ${Colors.black};
  color: ${Colors.lightGrey};
  z-index: 100;
  border-radius: 45px 45px 0 0;
`

const addButtonStyle = css`
  background-color: ${Colors.paleBlue};
  border-radius: 50%;
  padding: 25px;
  position: relative;
  top: -14px;
  font-size: ${FontSize.xxl};
`

export default Navigation
