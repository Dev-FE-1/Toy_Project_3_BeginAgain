# 🏋🏻 운동 영상 공유 SNS 플랫폼

<img alt="pli" width="800" src="https://github.com/user-attachments/assets/9939cb73-b2d7-4806-9617-574aeb795c15" style="border-radius: 8px" />
 
  <br>

## 프로젝트 소개

- **MAZI**는 운동 영상을 공유하고 소통할 수 있는 SNS입니다.
- 사용자는 개인의 운동 플레이리스트를 생성할 수 있습니다.
- 카테고리별로 원하는 운동을 필터링하여 맞춤형 플레이리스트를 확인할 수 있습니다.
- 유저들은 다른 사람의 플레이리스트를 북마크하고, 마음에 드는 게시글에 좋아요를 누르거나 댓글을 남길 수 있습니다.

<br>

## 팀원소개 및 역할분담

<div align="center">

|                                                                [<img src="https://github.com/user-attachments/assets/e54d00b0-f1fb-46f4-bed4-794659e6f38e" width="150" height="150" style="border-radius: 50%;"/>](https://github.com/suhyun9892)                                                                | [<img src="https://github.com/user-attachments/assets/faab5896-c939-4bd9-97a4-34e03d83c83a" width="150" height="150" style="border-radius: 50%;"/>](https://github.com/95126m) | [<img src="https://velog.velcdn.com/images/nanafromjeju/post/bebee33d-39ce-4255-9112-19a1948f1d9f/image.jpeg" width="150" height="150" style="border-radius: 50%;"/>](https://github.com/Panda-raccoon) |                                      [<img src="https://github.com/user-attachments/assets/2ecad53c-20f8-444a-a096-6f8b5510ef44" width="150" height="150" style="border-radius: 50%;"/>](https://github.com/nanafromjeju)                                       |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                                                                 [👑 @suhyun9892](https://github.com/suhyun9892)                                                                                                                                  |                                                                      [@95126m](https://github.com/95126m)                                                                      |                                                                           [@Panda-raccoon](https://github.com/Panda-raccoon)                                                                            |                                                                                                        [@nanafromjeju](https://github.com/nanafromjeju)                                                                                                         |
| 플레이리스트<br/> 플레이리스트 상세보기<br/> 플레이리스트 편집<br/><br/>공통 컴포넌트<br/> (Navbar, Layout, Header,<br/> LongButton, ShortButton, EmptyInfo,<br/> Bottom Sheet) <br/><br/> 프로젝트 및 라우팅 세팅<br/>깃허브 세팅<br/> 트러블 슈팅 기록 및 충돌 해결<br/>테스트 코드<br/>회의 진행 및 발표<br/> |           컨텐츠 추가 페이지<br/> 프로필 페이지<br/> 프로필 수정 페이지<br/><br/> 공통 컴포넌트<br/> (TheModal, Category) <br/><br/> 유저 플로우<br/> 와이어 프레임            |                              북마크 페이지<br/><br/>공통컴포넌트 <br/> (Bookmark, Toast, DragAndDrop) <br/><br/> 기능 정의서<br/> 요구사항 정의서<br/>데이터베이스 구조도                               | 홈 페이지<br/> 스플래시 페이지<br/> 로그인 페이지<br/> 404 페이지<br/> <br/>공통 컴포넌트 <br/>(InfiniteScroll, FirebaseApi, Comments,<br/> Assets, Playlist, PlaylistDetail, <br/> CommentsModal)<br/><br/>디자인<br/> 프로젝트 정의서 <br/>리드미 및 발표자료 |

</div>

<br>

## 1. 페이지

| ![움짤 1](https://github.com/user-attachments/assets/6790e19c-2c9c-4c07-9473-89e2c7c4c4e1) | ![움짤 2](https://github.com/user-attachments/assets/7b95899e-e57b-4094-b2bd-70285a8c56dc) | ![움짤 3](https://github.com/user-attachments/assets/b98bae91-18a2-4f5a-918d-9e57f467ea80) | ![움짤 4](https://github.com/user-attachments/assets/c06ca88f-7366-46a8-82e3-ad92bae529d0) |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |

## 2. 기술 스택

- Front : React, Typescript, Vite, emotion, styled-components, Zustand, TanStack Query, Playwright
- Back-end : Firebase
- 버전 및 이슈관리 : Github, Github Issues
- 협업 툴 : Slack, Notion, Zoom, ZEP
- 서비스 배포 환경 : Netlify
- 디자인 : Figma
- [컨벤션](https://www.notion.so/2d7a46b888e8482a890543275cb48142)

  <br>

## 3. 채택한 개발 기술과 브랜치 전략

### React, styled-component, emotion

- **React**

  - 컴포넌트화를 통해 유지보수와 재사용성을 고려한 구조로 개발했습니다.

- **emotion**

  - 스타일링을 적용하여 컴포넌트 내에서 효율적으로 스타일을 관리했습니다.

- **framer-motion**
  - 모달에 자연스러운 애니메이션 효과를 적용했습니다.

### TypeScript

- **TypeScript**

  - 타입을 명시하여 코드의 안정성과 가독성을 높였습니다.

  - 코드 작성 시점에 타입 오류를 발견할 수 있어 디버깅 시간을 줄이고, 유지보수가 쉬운 코드를 작성할 수 있습니다.

- Javascript가 아닌 Typescript를 채택한 이유

  - 컴포넌트 타입 안전성: props의 타입을 명확히 정의해 예상치 못한 오류를 방지할 수 있습니다.

  - 리팩토링 시 안정성: 타입 시스템을 통해 코드 변경 시 다른 부분에 미치는 영향을 사전에 파악해 리팩토링이 안전해집니다.

  이러한 이유들로 인해 자바스크립트 대신 TypeScript를 채택하여 React 프로젝트의 안정성과 효율성을 극대화했습니다.

### eslint, prettier

- **ESLint**
  - 코드 품질을 관리하여 오류를 사전에 방지하고, 규칙을 준수하도록 도왔습니다.
- **Prettier**
  - 일관된 코드 포맷팅을 유지해 가독성을 높였습니다.

### 브랜치 전략

- main, develop, feat 브랜치로 나누어 체계적으로 개발을 진행했습니다.

  - **main** 배포 단계에서만 사용하는 브랜치입니다.

  - **develop** 개발 단계에서 git-flow의 master 역할을 합니다.

  - **feat** 기능 단위의 독립적인 개발을 위해 사용하며, 작업이 완료된 후 merge하고 삭제합니다.

  - **bug** 버그 수정 시 사용하는 브랜치입니다.

  - **style** 스타일 변경 및 퍼블리싱 작업에 사용하는 브랜치입니다.

  - **help** 도움이 필요할 때 사용하는 브랜치입니다.

<br>

## 4. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : _2024.09.02 - 2024.09.27_

- 기획 및 디자인 : _2024.09.02 - 2024.09.09_

- UI 구현 : _2024.09.09 - 2024.09.11_

- 기능 구현 : _2024.09.11 - 2024.09.27_

<br>

### 작업 관리

- GitHub Issues와 Slack을 사용하여 진행 상황을 공유했습니다.

- 매일 Zoom과 ZEP에서 회의를 진행하며 작업 순서와 방향성에 대한 고민을 나누고 Notion에 회의 내용을 기록했습니다.
