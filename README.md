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
  playlistId: string
  userId: string
}
```

```ts
export const useFetchLike = (playlistId: string) => {
  return useQuery({
    queryKey: ['likes', playlistId],
    queryFn: async () => {
      const auth = getAuth()
      const user = auth.currentUser
      const db = getFirestore()
      const coll = collection(db, 'Likes')
      const querySnapshot = await getDocs(
        query(
          coll,
          where('userId', '==', user.uid),
          where('playlistId', '==', playlistId)
        )
      )
      return !!querySnapshot.docs.length // true or false
    }
  })
}
```
