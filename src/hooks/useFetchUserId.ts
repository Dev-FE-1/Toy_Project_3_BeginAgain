import { useQuery } from '@tanstack/react-query'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

// User 정보 타입
export interface User {
  displayName: string
  photoURL: string
  uid: string
}

// userId로 해당 유저의 정보를 가져오는 훅
export const useFetchUserId = (userId: string) => {
  return useQuery<User>({
    queryKey: ['User', userId], // 쿼리 키
    queryFn: async () => {
      const db = getFirestore()
      const userDocRef = doc(db, 'Users', userId) // Users 컬렉션에서 userId로 문서 찾기
      const userSnap = await getDoc(userDocRef)

      if (!userSnap.exists()) {
        throw new Error('사용자를 찾을 수 없습니다.')
      }

      return {
        displayName: userSnap.data().displayName,
        photoURL: userSnap.data().photoURL,
        uid: userSnap.id
      } as User
    },
    enabled: !!userId // userId가 있을 때만 쿼리 실행
  })
}
