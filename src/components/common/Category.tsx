import React from "react"
import { css } from '@emotion/react'
import theme from '@/styles/theme'

export type Category = {
  id: number;
  name: string;
  children: Category[] | []
};

export const Category = ({
  selectedCategories = [],
  onSelectCategory
}: {
  selectedCategories: string[];
  onSelectCategory: (categories: string[]) => void
}) => {
  const categories = ['전체', '상체', '하체', '스트레칭', '유산소', '전신']

  const handleCategoryClick = (category: string) => {
    let newSelectedCategories;

    if (category === '전체') {
      newSelectedCategories = selectedCategories.includes('전체')
        ? selectedCategories.filter((c) => c !== '전체')
        : ['전체']
    } else {
      if (selectedCategories.includes(category)) {
        newSelectedCategories = selectedCategories.filter((c) => c !== category)
      } else {
        newSelectedCategories = [...selectedCategories, category]
      }

      if (!newSelectedCategories.includes('전체')) {
        newSelectedCategories = ['전체', ...newSelectedCategories]
      }
    }

    onSelectCategory(newSelectedCategories)
  };

  return (
    <ul css={CategoryContainer}>
      {categories.map(category => (
        <li key={category}>
          <CategoryButton
            onClick={() => handleCategoryClick(category)}
            styleType={selectedCategories.includes(category) ? "secondary" : "primary"}
          >
            {category}
          </CategoryButton>
        </li>
      ))}
    </ul>
  );
};

export const CategoryButton = ({
  children,
  onClick,
  styleType = 'primary'
}: {
  children: React.ReactNode;
  onClick?: () => void;
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
  border: 1px solid ${theme.colors.lightBlue};
  cursor: pointer;
  font-size: ${theme.fontSize.sm};
  line-height: 100%;
  letter-spacing: -0.18px;
  transition: background-color 0.3s ease;
`;

const buttonStyle = {
  primary: css`
    background-color: ${theme.colors.white};
    color: ${theme.colors.lightBlue};
    &:hover {
      background-color: ${theme.colors.lightBlue};
      color: ${theme.colors.white};
    }
  `,
  secondary: css`
    background-color: ${theme.colors.lightBlue};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.white};
      color: ${theme.colors.lightBlue};
    }
  `
};

const CategoryContainer = css`
  list-style-type: none;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export default Category