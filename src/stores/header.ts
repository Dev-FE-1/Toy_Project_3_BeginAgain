import { create } from 'zustand'
import { combine } from 'zustand/middleware'
export const useHeaderStore = create(
  combine(
    {
      title: '',
      handleClickRightButton: () => {}
    },
    set => ({
      setTitle(title: string) {
        set({ title })
      },
      setHandleClickRightButton(handler: () => void) {
        set({ handleClickRightButton: handler })
      }
    })
  )
)
