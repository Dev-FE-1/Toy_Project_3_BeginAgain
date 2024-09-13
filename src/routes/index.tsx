import { createBrowserRouter } from 'react-router-dom'
import NavbarLayout from '@/components/layouts/NavbarLayout'
import Home from '@/routes/pages/Home'
import AddPlaylist from '@/routes/pages/AddPlaylist'
import Bookmark from '@/routes/pages/Bookmark'
import MyPlaylist from '@/routes/pages/MyPlaylist'
import Profile from '@/routes/pages/Profile'
import PlaylistDetailPage from '@/routes/pages/PlaylistDetailPage'
import LogIn from '@/routes/pages/LogIn'
import RequiresAuth from '@/routes/protected/RequiresAuth'

export const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    children: [
      {
        element: <RequiresAuth />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/playlist-details/:id', element: <PlaylistDetailPage /> },
          { path: '/add-playlist', element: <AddPlaylist /> },
          { path: '/bookmark', element: <Bookmark /> },
          { path: '/my-playlist', element: <MyPlaylist /> },
          { path: '/profile', element: <Profile /> }
        ]
      }
    ]
  },
  { path: '/login', element: <LogIn /> }
])
