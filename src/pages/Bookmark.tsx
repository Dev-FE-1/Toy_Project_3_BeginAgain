import React, { useState } from 'react'
import Header from '@/components/theLayout/theHeader/Header'
import Category from '@/components/theCommon/Category'
import Toast from '@/components/theCommon/Toast'

const Bookmark: React.FC = () => {
  const [isToastVisible, setIsToastVisible] = useState(false)

  const handleToastShow = () => {
    setIsToastVisible(true)
  }

  return (
    <>
      <Header title="북마크" />
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
