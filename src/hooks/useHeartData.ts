import { useState } from 'react'

export const useHeartData = () => {
  const [isHeartFilled, setIsHeartFilled] = useState(false)

  const handleHeartClick = () => {
    setIsHeartFilled(prev => !prev)
  }

  return {
    isHeartFilled,
    handleHeartClick
  }
}
