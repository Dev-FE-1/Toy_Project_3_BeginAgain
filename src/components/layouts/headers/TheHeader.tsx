import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { CgChevronLeft } from 'react-icons/cg'
import { useHeaderStore } from '@/stores/header'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAddPlaylistStore } from '@/stores/addPlaylist'

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  position: sticky;
  width: ${theme.width.max};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: ${theme.colors.white};
  background-color: ${theme.colors.white};
`
const titleStyle = css`
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.black};
`
const iconStyle = css`
  font-size: 24px;
  color: ${theme.colors.black};
  margin-right: 12px;
  position: absolute;
  left: 20px;
`
const successBtn = (isDone: boolean) => css`
  position: absolute;
  display: sticky;
  right: 10px;
  background-color: transparent;
  color: ${isDone ? theme.colors.lightBlue : theme.colors.grey};
  font-size: ${theme.fontSize.md};
  border: none;
  cursor: ${isDone ? 'pointer' : 'default'};
`
const editBtn = css`
  position: absolute;
  display: sticky;
  right: 10px;
  background-color: transparent;
  color: ${theme.colors.lightBlue};
  font-size: ${theme.fontSize.md};
  border: none;
  cursor: pointer;
`

const logoStyle = css`
  width: 80px;
  height: 25px;
`

export default function TheHeader() {
  const title = useHeaderStore(state => state.title)
  const navigate = useNavigate()
  const location = useLocation()
  const { isDone, savePlaylist } = useAddPlaylistStore()
  const isAddPlaylist = location.pathname === '/add-playlist'
  const isProfile = location.pathname === '/profile'

  const handleComplete = async () => {
    try {
      await savePlaylist()
      navigate('/', { state: { showToast: true } })
    } catch (error) {
      console.error('저장 실패:', error)
    }
  }

  return (
    <header css={headerStyle}>
      {title === 'Playlist Detail' && (
        <CgChevronLeft
          css={iconStyle}
          onClick={() => navigate(-1)}
        />
      )}
      {title === 'Home' ? (
        <img
          css={logoStyle}
          src="/src/assets/logo.png"
          alt="logo"
        />
      ) : (
        <h2 css={titleStyle}>{title}</h2>
      )}
      {isAddPlaylist && (
        <button
          css={successBtn(isDone)}
          onClick={isDone ? handleComplete : undefined}
          disabled={!isDone}>
          완료
        </button>
      )}
      {isProfile && <button css={editBtn}>수정</button>}
    </header>
  )
}
