import { css } from '@emotion/react'
import { Colors, FontSize, FontWeight } from '@/styles/Theme'

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
            font-size: ${FontSize.lg};
            font-weight: ${FontWeight.semiBold};
          `}>
          선택한 컨텐츠를 삭제하시겠습니까?
        </p>
        <p
          css={css`
            font-size: ${FontSize.md};
            font-weight: ${FontWeight.thin};
            padding-top: 10px;
          `}>
          삭제된 컨텐츠는 복구할 수 없습니다.
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
            삭제
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
  background-color: ${Colors.white};
  padding: 30px;
  border-radius: 5px;
  width: 356px;
  height: 160px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  color: ${Colors.black};
`

const buttonContainerStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`

const closeButtonStyle = css`
  height: 35px;
  width: 160px;
  background-color: ${Colors.lightGrey};
  border: none;
  font-size: ${FontSize.md};
  font-weight: ${FontWeight.semiBold};
  cursor: pointer;
  border-radius: 3px;
`

const deleteButtonStyle = css`
  height: 35px;
  width: 160px;
  margin-left: 8px;
  background-color: ${Colors.lightBlue};
  border: none;
  color: ${Colors.white};
  font-size: ${FontSize.md};
  font-weight: ${FontWeight.semiBold};
  cursor: pointer;
  border-radius: 3px;
`

export default Modal
