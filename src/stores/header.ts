import { create } from 'zustand'
import { combine } from 'zustand/middleware'
export const useHeaderStore = create(
  combine(
    {
      title: 'MAZI',
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
