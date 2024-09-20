import { css } from '@emotion/react'
import theme from '@/styles/theme'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null
  return (
    <div css={overlayStyle}>
      <div css={modalStyle}>
        <p
          css={css`
            font-size: ${theme.fontSize.lg};
            font-weight: ${theme.fontWeight.semiBold};
          `}>
          선택한 북마크 해제하시겠습니까?
        </p>
        <p
          css={css`
            font-size: ${theme.fontSize.md};
            font-weight: ${theme.fontWeight.thin};
            padding-top: 10px;
          `}>
          북마크는 다시 추가할 수 있습니다
        </p>

        <div css={buttonContainerStyle}>
          <button
            onClick={onClose}
            css={closeButtonStyle}>
            취소
          </button>

          <button
            onClick={onDelete}
            css={deleteButtonStyle}>
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

const overlayStyle = css`
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  width: 430px;
  height: 100%;
`

const modalStyle = css`
  background-color: ${theme.colors.white};
  padding: 30px;
  border-radius: 5px;
  width: 356px;
  height: 160px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  color: ${theme.colors.black};
`

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const closeButtonStyle = css`
  height: 35px;
  width: 160px;
  background-color: ${theme.colors.lightGrey};
  border: none;
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semiBold};
  cursor: pointer;
  border-radius: 3px;
`

const deleteButtonStyle = css`
  height: 35px;
  width: 160px;
  margin-left: 8px;
  background-color: ${theme.colors.lightBlue};
  border: none;
  color: ${theme.colors.white};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semiBold};
  cursor: pointer;
  border-radius: 3px;
`

export default Modal
