import {
  CgHome,
  CgStack,
  CgBookmark,
  CgMathPlus,
  CgProfile
} from 'react-icons/cg'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import NavigationItem from './NavigationItem'
import { useLocation, useNavigate } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <nav>
      <ul css={navbar}>
        <NavigationItem
          path="/"
          Icon={CgHome}
          label="Home"
          onClick={() => handleNavigation('/')}
        />
        <NavigationItem
          path="/my-playlist"
          Icon={CgStack}
          label="Playlist"
          onClick={() => handleNavigation('/my-playlist')}
        />
        <NavigationItem
          path="/add-playlist"
          Icon={CgMathPlus}
          onClick={() => handleNavigation('/add-playlist')}
          customStyle={addButtonStyle}
        />
        <NavigationItem
          path="/bookmark"
          Icon={CgBookmark}
          label="Bookmark"
          onClick={() => handleNavigation('/bookmark')}
        />
        <NavigationItem
          path="/profile"
          Icon={CgProfile}
          label="Profile"
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
  width: ${theme.width.max};
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background-color: ${theme.colors.black};
  color: ${theme.colors.lightGrey};
  z-index: 2;
  border-radius: 45px 45px 0 0;
`

const addButtonStyle = css`
  background-color: ${theme.colors.paleBlue};
  border-radius: 50%;
  width: 72px;
  height: 72px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -14px;
  div {
    svg {
      font-size: 40px;
      stroke-width: 0;
    }
  }
  &.active {
    div {
      color: ${theme.colors.black};
    }
  }
  &:hover {
    div {
      color: ${theme.colors.black};
    }
  }
`

export default Navigation
