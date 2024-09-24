// import { useEffect } from 'react'
// import Sortable from 'sortablejs'

// interface UseItemReorderProps {
//   items: any[]
//   onReorder: (updatedItems: any[]) => void
//   ref: React.RefObject<HTMLDivElement>
//   isOwner?: boolean // PlaylistDetail에서는 소유자 여부 확인
// }

// const useItemReorder = ({
//   items,
//   onReorder,
//   ref,
//   isOwner
// }: UseItemReorderProps) => {
//   useEffect(() => {
//     if (!ref.current || !items || (isOwner !== undefined && !isOwner)) return

//     const sortable = new Sortable(ref.current, {
//       handle: '.drag-handle',
//       animation: 150,
//       onEnd: event => {
//         if (event.oldIndex === undefined || event.newIndex === undefined) return

//         // 최신 items 배열을 복사하고 이동 처리
//         const updatedItems = [...items]
//         const [movedItem] = updatedItems.splice(event.oldIndex, 1)
//         updatedItems.splice(event.newIndex, 0, movedItem)

//         onReorder(updatedItems)
//       }
//     })

//     return () => {
//       sortable.destroy()
//     }
//   }, [ref, isOwner, onReorder])
// }

// export default useItemReorder
