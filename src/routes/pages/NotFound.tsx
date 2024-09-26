import { css } from '@emotion/react'
import theme from '@/styles/theme'

const notFoundContainer = css`
  position: relative;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  background-color: ${theme.colors.white};
  height: 100%;
  overflow-y: auto;
  border: 1px solid ${theme.colors.grey};
  text-align: center;
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

const textContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
`

const NotFound: React.FC = () => {
  return (
    <div css={notFoundContainer}>
      <div css={textContainerStyle}>
        <img
          src="/src/assets/pageNotFound.png"
          alt="Page Not Found"
          css={imageStyle}
        />
        <h1 css={titleStyle}>404</h1>
        <p css={textStyle}>Page Not Found</p>
      </div>
    </div>
  )
}

export default NotFound
