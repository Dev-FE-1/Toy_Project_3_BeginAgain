import create from 'zustand';
import { getAuth, updateProfile } from "firebase/auth"

interface ProfileState {
  displayName: string;
  setDisplayName: (name: string) => void;
  saveProfile: () => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  displayName: '',
  setDisplayName: (name) => set({ displayName: name }),
  saveProfile: async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, { displayName: get().displayName });
        alert('프로필이 성공적으로 저장되었습니다.');
      } catch (error) {
        console.error('프로필 저장 중 오류 발생:', error);
        alert('프로필 저장에 실패했습니다.');
      }
    }
  }
}));
