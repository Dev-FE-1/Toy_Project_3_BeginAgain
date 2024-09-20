import Category from '@/components/common/Category'
import EmptyInfo from '@/components/emptyInfo/EmptyInfo'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { CgFormatJustify } from 'react-icons/cg'
import { useFetchPlaylists } from '@/hooks/useFetchPlaylists'
import { useFetchUserBookmark } from '@/hooks/useFetchUserBookmark'
import { useHeaderStore } from '@/stores/header'
import { useEffect } from 'react'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import theme from '@/styles/theme'

// 유튜브 비디오 ID 추출 함수
function extractVideoId(url?: string) {
  if (!url) {
    console.error('URL is undefined or empty')
    return '' // 기본 값 반환
  }
  return url.replace('https://www.youtube.com/watch?v=', '')
}

const Bookmark = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  const { data: playlists } = useFetchPlaylists()
  const { data: userBookmarks } = useFetchUserBookmark()
  const navigate = useNavigate()

  useEffect(() => {
    setTitle('Bookmarks')
  }, [setTitle])

  const filteredPlaylists = playlists?.filter(pl =>
    userBookmarks?.includes(pl.id)
  )

  return (
    <main>
      <Category />
      {filteredPlaylists && filteredPlaylists.length > 0 ? (
        filteredPlaylists.map(pl => (
          <div
            key={pl.id}
            css={playlistItemStyle}>
            {/* 왼쪽: 북마크 아이콘 */}
            <div css={leftSectionStyle}>
              {userBookmarks?.includes(pl.id) ? (
                <FaBookmark css={bookmarkIconStyle} />
              ) : (
                <FaRegBookmark css={bookmarkIconStyle} />
              )}
            </div>

            {/* 가운데: 유튜브 이미지 */}
            <img
              src={`https://img.youtube.com/vi/${extractVideoId(pl.urls[0])}/hqdefault.jpg`}
              alt={pl.title}
              css={videoIdStyle}
              onClick={() => navigate(`/playlist-details/${pl.id}`)}
            />
            <div css={playlistInfoStyle}>
              <p css={titleStyle}>{pl.title}</p>
              {/* 오른쪽에 햄버거 아이콘 */}
              <CgFormatJustify css={hamburgerIconStyle} />
            </div>
          </div>
        ))
      ) : (
        <div css={EmptyInfoStyle}>
          <EmptyInfo
            status="북마크"
            title="플레이리스트"
          />
        </div>
      )}
      <div className="nav-margin"></div>
    </main>
  )
}

const playlistItemStyle = css`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  margin-top: 10px;
`
const leftSectionStyle = css`
  display: flex;
  align-items: center;
  margin-right: 10px;
`

const bookmarkIconStyle = css`
  font-size: 20px;
  margin-right: 8px;
  cursor: pointer;
  color: ${theme.colors.charcoalGrey};
  transition: color 0.3s ease;
`

const videoIdStyle = css`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`
const playlistInfoStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 10px;
  margin-left: 10px;
`

const titleStyle = css`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.black};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const hamburgerIconStyle = css`
  font-size: ${theme.fontSize.xxl};
  cursor: pointer;
  color: ${theme.colors.charcoalGrey};
  transition: color 0.3s ease;
`

const EmptyInfoStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export default Bookmark
