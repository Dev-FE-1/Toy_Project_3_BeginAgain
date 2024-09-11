import {
  CgHome,
  CgStack,
  CgBookmark,
  CgMathPlus,
  CgProfile
} from 'react-icons/cg'
import { css } from '@emotion/react'
import { Colors, Width } from '@/styles/Theme'
import NavigationItem from './NavigationItem'

const Navigation = () => {
  return (
    <nav>
      <ul css={navbar}>
        <NavigationItem
          path="/"
          Icon={CgHome}
        />
        <NavigationItem
          path="/myplaylist"
          Icon={CgStack}
        />
        <NavigationItem
          path="/addplaylist"
          Icon={CgMathPlus}
        />
        <NavigationItem
          path="/bookmark"
          Icon={CgBookmark}
        />
        <NavigationItem
          path="/profile"
          Icon={CgProfile}
        />
      </ul>
    </nav>
  )
}

const navbar = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 72px;
  position: fixed;
  width: ${Width.max};
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background-color: ${Colors.black};
  color: ${Colors.lightGrey};
  opacity: 0.8;
  z-index: 100;
  border-radius: 10px 10px 0 0;
`

export default Navigation
