import '@emotion/react'
import { ColorsType, FontSizeType, FontWeightType, WidthType } from './theme'

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsType
    fontSize: FontSizeType
    fontWeight: FontWeightType
    width: WidthType
  }
}

// Theme 파일 안에 설정해 놓은 값들을
// emotion.d.ts 파일에 타입으로 정의해주면
// 타입 추론이 가능해집니다 !
// emotion이 타입 추론을 가능하게 만들어주는 파일이라고 생각하시면 됩니다.
