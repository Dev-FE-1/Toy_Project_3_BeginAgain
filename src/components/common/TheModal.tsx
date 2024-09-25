import { css } from '@emotion/react'
import theme from '@/styles/theme'

type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  onConfirm,
  title = "확인",
  description = "삭제된 컨텐츠는 복구할 수 없습니다.",
}) => {
  if (!isOpen) return null;
  return (
    <div css={overlayStyle}>
      <div css={modalStyle}>
        <p
          css={css`
            font-size: ${theme.fontSize.lg};
            font-weight: ${theme.fontWeight.bold};
          `}
        >
          {title}
        </p>
        <p
          css={css`
            font-size: ${theme.fontSize.md};
            padding-top: 20px;
          `}
        >
          {description}
        </p>

        <div css={buttonContainerStyle}>
          {onClose && (
            <button onClick={onClose} css={closeButtonStyle}>
              취소
            </button>
          )}

          {onConfirm && (
            <button onClick={onConfirm} css={confirmButtonStyle}>
              확인
            </button>
          )}

          {onDelete && (
            <button onClick={onDelete} css={deleteButtonStyle}>
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const overlayStyle = css`
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  width: 430px;
  height: 100%;
`;

const modalStyle = css`
  background-color: ${theme.colors.white};
  padding: 30px;
  border-radius: 10px;
  width: 356px;
  height: 160px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  color: ${theme.colors.black};
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const closeButtonStyle = css`
  height: 35px;
  width: 160px;
  background-color: ${theme.colors.lightGrey};
  border: none;
  font-size: ${theme.fontSize.md};
  cursor: pointer;
  border-radius: 7px;
`;

const deleteButtonStyle = css`
  height: 35px;
  width: 160px;
  margin-left: 8px;
  background-color: ${theme.colors.lightBlue};
  border: none;
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.md};
  cursor: pointer;
  border-radius: 7px;
`;

const confirmButtonStyle = css`
  height: 35px;
  width: 160px;
  margin-left: 8px;
  background-color: ${theme.colors.lightBlue};
  border: none;
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.md};
  cursor: pointer;
  border-radius: 7px;
`;

export default Modal;
