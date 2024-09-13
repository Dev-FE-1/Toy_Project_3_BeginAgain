import React, { useState } from 'react'
import Category from '@/components/common/Category'
import Toast from '@/components/common/Toast'
import { useHeaderStore } from '@/stores/header'

const Bookmark: React.FC = () => {
  const setTitle = useHeaderStore(state => state.setTitle)
  setTitle('Bookmark')

  const [isToastVisible, setIsToastVisible] = useState(false)

  const handleToastShow = () => {
    setIsToastVisible(true)
  }

  return (
    <>
      <Category />
      <div
        onClick={handleToastShow}
        style={{
          cursor: 'pointer',
          padding: '20px',
          backgroundColor: '#f0f0f0',
          textAlign: 'center'
        }}>
        <h1>토스트테스트</h1>
      </div>
      {isToastVisible && (
        <Toast
          message="북마크페이지에 토스트 해보기!"
          duration={2000}
          isVisible={isToastVisible}
          onHide={() => setIsToastVisible(false)}
        />
      )}
    </>
  )
}

export default Bookmark
