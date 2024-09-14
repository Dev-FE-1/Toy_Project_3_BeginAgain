import { Outlet } from 'react-router-dom'
import { css } from '@emotion/react'
import { Width, Colors } from '@/styles/Theme'

const Container = () => {
  return (
    <main css={containerStyle}>
      <Outlet />
    </main>
  )
}

const containerStyle = css`
  position: relative;
  width: 100%;
  max-width: ${Width.max};
  margin: 0 auto;
  background-color: ${Colors.white};
  z-index: 99;
  height: 100%;
`
export default Container