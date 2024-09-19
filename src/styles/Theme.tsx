export const colors = {
  lightBlue: '#7695FF',
  skyBlue: '#9DBDFF',
  paleBlue: '#D1E9F6',
  charcoalGrey: '#545F71',
  darkGrey: '#757575',
  black: '#1E1E1E',
  lightGrey: '#EBEBEB',
  red: '#D32F2F',
  white: '#FFFFFF',
  grey: '#B3B3B3'
}
export const fontSize = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px',
  xxxl: '80px'
}

export const fontWeight = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900
}

export const width = {
  max: '430px'
}

export type ColorsType = typeof colors
export type FontSizeType = typeof fontSize
export type FontWeightType = typeof fontWeight
export type WidthType = typeof width

interface Theme {
  colors: ColorsType
  fontSize: FontSizeType
  fontWeight: FontWeightType
  width: WidthType
}

const theme: Theme = {
  colors,
  fontSize,
  fontWeight,
  width
}

export default theme
