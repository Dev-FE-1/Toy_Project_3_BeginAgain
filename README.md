# 운동 영상 공유 SNS 플랫폼, MAZI

- [x] PlayLists
- [x] Comments
- [ ] Likes
- [ ] Bookmarks

### Likes

```ts
export interface Like {
  id: string
  createdAt: string
  feedId: string
  userId: string
}
```

```ts
export const useFetchLike = (feedId: string) => {
  return useQuery({
    queryKey: ['likes', feedId],
    queryFn: async () => {
      const auth = getAuth()
      const user = auth.currentUser
      const db = getFirestore()
      const coll = collection(db, 'Likes')
      const querySnapshot = await getDocs(
        query(
          coll, 
          where('userId', '==', user.uid), 
          where('feedId', '==', feedId)
        )
      )
      return !!querySnapshot.docs.length // true or false
    }
  })
}
```