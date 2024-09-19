import { css } from '@emotion/react'
import theme from '@/styles/theme'

const notFoundContainer = css`
  text-align: center;
  padding: 50px;
  background-color: white;
  width: 100%;
  height: 100%;
`

const imageStyle = css`
  width: 400px;
  height: 400px;
`

const titleStyle = css`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.semiBold};
  color: ${theme.colors.lightBlue};
  margin: 20px 0;
`

const textStyle = css`
  font-size: ${theme.fontSize.xxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.skyBlue};
`

const NotFound: React.FC = () => {
  return (
    <div css={notFoundContainer}>
      <img
        src="/src/assets/pageNotFound.png"
        alt="Page Not Found"
        css={imageStyle}
      />
      <h1 css={titleStyle}>404</h1>
      <p css={textStyle}>Page Not Found</p>
    </div>
  )
}

export default NotFound
