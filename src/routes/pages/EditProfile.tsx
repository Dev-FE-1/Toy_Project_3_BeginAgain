import { css } from '@emotion/react'
import theme from '@/styles/theme'
import { useHeaderStore } from '@/stores/header'
import { useEffect, useState } from 'react'
import { div } from 'framer-motion/client'

export default function EditProfile() {
  const setTitle = useHeaderStore(state => state.setTitle)

  useEffect(() => {
      setTitle('플레이리스트 편집')
  }, [setTitle])

  return(
    <div>테스트</div>
  )
}