import create from 'zustand'
import { getAuth, updateProfile } from "firebase/auth"
import { NavigateFunction } from 'react-router-dom'

interface ProfileState {
  displayName: string
  photoURL: string | null
  setDisplayName: (name: string) => void
  setPhotoURL: (url: string) => void
  saveProfile: (navigate: NavigateFunction) => Promise<void>
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  displayName: '',
  photoURL: null,
  setDisplayName: (name) => set({ displayName: name }),
  setPhotoURL: (url) => set({ photoURL: url }),
  saveProfile: async (navigate) => {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      try {
        await updateProfile(user, { 
          displayName: get().displayName, 
          photoURL: get().photoURL || user.photoURL
        })

        navigate('/profile', { state: { showToast: true } });
      } catch (error) {
        console.error('프로필 저장 실패!', error)
      }
    }
  }
}))
