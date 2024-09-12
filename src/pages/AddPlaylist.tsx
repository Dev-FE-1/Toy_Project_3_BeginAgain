import Header from '@/components/theLayout/theHeader/Header'
import Modal from '@/components/theLayout/Modal'
import React, { useState } from 'react'

function Radio({ children, name, value, defaultChecked }) {
  return (
    <label>
      <input type="radio" name={name} value={value} defaultChecked={defaultChecked} />
      {children}
    </label>
  )
}
const AddPlaylist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  };

  const closeModal = () => {
    setIsModalOpen(false)
  };

  const deletePlaylist = () => {
    setIsModalOpen(false);
  }
  return (
    <>
      <Header title="Add Playlist" />
      <div className='add-link'> 동영상 링크
        <input></input>
        <button></button>
      </div>

      <div className='add-title'>플레이리스트 제목
        <input type="text" placeholder="제목을 입력해주세요."/>
      </div>

      <div className='add-description'>설명
        <input type="text" placeholder="설명을 입력해주세요."/>
      </div>

      <div className='category-setting'>카테고리 설정
        <input />
      </div>

      <div className='open-setting'>공개 설정
        <Radio name="setting" defaultChecked>공개</Radio>
        <Radio name="setting">비공개</Radio>
      </div>

      <button onClick={openModal}>삭제</button>
      <Modal isOpen={isModalOpen} onClose={closeModal} onDelete={deletePlaylist}></Modal>
    </>
  )
}

export default AddPlaylist;
