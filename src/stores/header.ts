import { create } from 'zustand'
import { combine } from 'zustand/middleware'

export const useHeaderStore = create(
  combine(
    {
      title: 'MAZI'
    },
    set => ({
      setTitle(title: string) {
        set({ title })
      }
    })
  )
)
