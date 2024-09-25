import create from 'zustand'
import { getAuth, updateProfile } from "firebase/auth"
import { NavigateFunction } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

interface ProfileState {
  displayName: string
  setDisplayName: (name: string) => void
  photoURL: string
  setPhotoURL: (url: string) => void
  title: string
  setTitle: (title: string) => void
  saveProfile: (navigate: NavigateFunction, newPhoto: File | null) => Promise<void>
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  displayName: '',
  setDisplayName: (name) => set({ displayName: name }),
  photoURL: '',
  setPhotoURL: (url) => set({ photoURL: url }),
  title: '',
  setTitle: (title) => set({ title }),
  saveProfile: async (navigate, newPhoto) => {
    const auth = getAuth()
    const user = auth.currentUser
    const storage = getStorage()

    if (user) {
      try {
        let updatedPhotoURL = get().photoURL

        if (newPhoto) {
          const storageRef = ref(storage, `profile_images/${user.uid}`)
          await uploadBytes(storageRef, newPhoto)
          updatedPhotoURL = await getDownloadURL(storageRef)
          set({ photoURL: updatedPhotoURL })
        }

        await updateProfile(user, {
          displayName: get().displayName,
          photoURL: updatedPhotoURL,
        })

        navigate('/profile', { state: { showToast: true } })
      } catch (error) {
        console.error('프로필 저장 실패!', error)
      }
    }
  },
}))
