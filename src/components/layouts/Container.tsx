import { Outlet } from 'react-router-dom'
import { css } from '@emotion/react'
import { Width } from '@/styles/Theme'

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
`
export default Container
