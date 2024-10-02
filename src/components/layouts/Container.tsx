import { Outlet } from 'react-router-dom'
import { css } from '@emotion/react'
import theme from '@/styles/theme'

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
  max-width: ${theme.width.max};
  margin: 0 auto;
  background-color: ${theme.colors.white};
  height: 100%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  border: 1px solid ${theme.colors.grey};
`
export default Container
