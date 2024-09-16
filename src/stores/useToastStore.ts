// import { useState } from 'react'

// export const useToast = () => {
//   const [toastMessage, setToastMessage] = useState('')
//   const [isToastVisible, setIsToastVisible] = useState(false)

//   const showToast = (message: string) => {
//     setToastMessage(message)
//     setIsToastVisible(true)

//     setTimeout(() => {
//       setIsToastVisible(false)
//     }, 2000) // 2초 동안 토스트 표시 후 사라짐
//   }

//   return { toastMessage, isToastVisible, showToast }
// }

// store/toastStore.ts

// import { create } from 'zustand'

// interface ToastProps {
//   isVisible: boolean
//   message: string
//   showToast: (message: string) => void
//   hideToast: () => void
// }

// export const useToastStore = create<ToastProps>(set => ({
//   isVisible: false,
//   message: '',
//   showToast: (message: string) => {
//     set({ isVisible: true, message })
//   },
//   hideToast: () => set({ isVisible: false, message: '' })
// }))
