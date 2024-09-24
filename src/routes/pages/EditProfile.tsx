import { getAuth } from "firebase/auth"
import { useHeaderStore } from '@/stores/header'
import { useEffect } from 'react'
import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { useProfileStore } from '@/stores/editProfile'

export default function EditProfile() {
  const setTitle = useHeaderStore(state => state.setTitle);
  const displayName = useProfileStore(state => state.displayName);
  const setDisplayName = useProfileStore(state => state.setDisplayName);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setTitle('프로필 수정');
    if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [setTitle, user, setDisplayName]);

  return (
    <div css={pageStyle}>
      <div className="nav-margin-top"></div>
      {user && (
        <>
          <img
            src={user.photoURL || ''}
            alt={user.displayName || ''}
            css={profileStyle}
          />
          <div css={textStyle}>
            <div css={titleText}>이름</div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              css={inputStyle}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div css={textStyle}>
            <div css={titleText}>이메일</div>
            <div css={inputText}>{user.email}</div>
          </div>
        </>
      )}
    </div>
  );
}

const pageStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const profileStyle = css`
  width: 130px;
  margin-top: 40px;
  border-radius: 50%;
`;

const textStyle = css`
  margin-top: 3rem;
  border-bottom: 2px solid #ebebeb;
  font-size: ${theme.fontSize.md};
  height: 50px;
  width: 24.5em;
  padding-left: 3px;
`;

const titleText = css`
  color: ${theme.colors.black};
  margin-bottom: 10px;
`;

const inputStyle = css`
  padding: 10px;
  font-size: ${theme.fontSize.md};
  width: 100%;
  border: 1px solid ${theme.colors.grey};
  border-radius: 4px;
`;

const inputText = css`
  color: ${theme.colors.grey};
`;