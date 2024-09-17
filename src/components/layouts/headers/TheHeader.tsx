import { css } from '@emotion/react'
import { Colors, Width, FontSize} from '@/styles/Theme'
import { CgChevronLeft } from 'react-icons/cg'
import { useHeaderStore } from '@/stores/header'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAddPlaylistStore } from '@/stores/addPlaylist'

export default function TheHeader() {
  const title = useHeaderStore(state => state.title)
  const navigate = useNavigate()
  const location = useLocation()
  const { isDone, savePlaylist } = useAddPlaylistStore()
  const isAddPlaylist = location.pathname === '/add-playlist'
  const isProfile = location.pathname === '/profile'

  const handleComplete = async () => {
    try {
      await savePlaylist();
      navigate('/', { state: { showToast: true } })
    } catch (error) {
      console.error('저장 실패:', error)
    }
  }

  return (
    <header css={headerStyle}>
      {title === 'PlaylistDetailPage' && (
        <CgChevronLeft
          css={iconStyle}
          onClick={() => navigate(-1)}
        />
      )}
      <h1 css={titleStyle}>{title}</h1>

      {isAddPlaylist && (
        <button
          css={successBtn(isDone)} 
          onClick={isDone ? handleComplete : undefined}  
          disabled={!isDone}
        >
          완료
        </button>
      )}

      {isProfile && (<button css={editBtn}>수정</button>)}

    </header>
  )
}

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  position: sticky;
  width: ${Width.max};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: ${Colors.white};
  background-color: ${Colors.white};
`

const titleStyle = css`
  font-size: ${FontSize.xl};
  color: ${Colors.black};
`

const iconStyle = css`
  font-size: 24px;
  color: ${Colors.black};
  margin-right: 12px;
`

const successBtn = (isDone: boolean) => css`
  position: absolute;
  display: sticky;
  right: 10px;
  background-color: transparent; 
  color: ${isDone ? Colors.lightBlue : Colors.grey};  
  font-size: ${FontSize.md};
  border: none;
  cursor: ${isDone ? 'pointer' : 'default'};  
`;

const editBtn = css`
  position: absolute;
  display: sticky;
  right: 10px;
  background-color: transparent; 
  color: ${Colors.lightBlue};  
  font-size: ${FontSize.md};
  border: none; 
  cursor: pointer;
`;