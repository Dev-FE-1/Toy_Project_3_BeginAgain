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
          isActive={location.pathname === '/'}
          onClick={() => handleNavigation('/')}
        />
        <NavigationItem
          path="/my-playlist"
          Icon={CgStack}
          label="Playlist"
          isActive={location.pathname === '/my-playlist'}
          onClick={() => handleNavigation('/my-playlist')}
        />
        <div css={addButtonStyle}>
          <NavigationItem
            path="/add-playlist"
            Icon={CgMathPlus}
            isActive={location.pathname === '/add-playlist'}
            onClick={() => handleNavigation('/add-playlist')}
            blockActiveColor={true}
          />
        </div>
        <NavigationItem
          path="/bookmark"
          Icon={CgBookmark}
          label="Bookmark"
          isActive={location.pathname === '/bookmark'}
          onClick={() => handleNavigation('/bookmark')}
        />
        <NavigationItem
          path="/profile"
          Icon={CgProfile}
          label="Profile"
          isActive={location.pathname === '/profile'}
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
  z-index: 2;
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
