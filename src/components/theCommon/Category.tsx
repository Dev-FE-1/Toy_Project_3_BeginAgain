import { css } from '@emotion/react'
import { Colors } from '@/styles/Theme'
import { FontSize } from '@/styles/Theme'

const Category = () => {
  return (
    <ul css={CategoryContainer}>
      <li>
        <CategoryButton>전체</CategoryButton>
      </li>
      <li>
        <CategoryButton>상체</CategoryButton>
      </li>
      <li>
        <CategoryButton>하체</CategoryButton>
      </li>
      <li>
        <CategoryButton>스트레칭</CategoryButton>
      </li>
      <li>
        <CategoryButton>유산소</CategoryButton>
      </li>
      <li>
        <CategoryButton>전신</CategoryButton>
      </li>
    </ul>
  )
}

const CategoryButton = ({
  children,
  onClick,
  styleType = 'primary'
}: {
  children: React.ReactNode
  onClick?: () => void
  styleType?: 'primary' | 'secondary'
}) => {
  return (
    <button
      onClick={onClick}
      css={[baseButtonStyle, buttonStyle[styleType]]}>
      {children}
    </button>
  )
}

const baseButtonStyle = css`
  display: inline-flex;
  padding: 4px 10px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid ${Colors.lightBlue};
  cursor: pointer;
  font-size: ${FontSize.sm}
  line-height: 100%;
  letter-spacing: -0.18px;
  transition: background-color 0.3s ease;
`

const buttonStyle = {
  primary: css`
    background-color: ${Colors.white};
    color: ${Colors.lightBlue};
    &:hover {
      background-color: ${Colors.lightBlue};
      color: ${Colors.white};
    }
  `,
  secondary: css`
    background-color: ${Colors.lightBlue};
    color: ${Colors.white};
    &:hover {
      background-color: ${Colors.white};
      color: ${Colors.lightBlue};
    }
  `
}

const CategoryContainer = css`
  list-style-type: none;

  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`
export default Category
