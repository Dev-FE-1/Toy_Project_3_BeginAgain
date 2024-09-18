import { createBrowserRouter } from 'react-router-dom'
import NavbarLayout from '@/components/layouts/NavbarLayout'
import Home from '@/routes/pages/Home'
import AddPlaylist from '@/routes/pages/AddPlaylist'
import Bookmark from '@/routes/pages/Bookmark'
import MyPlaylist from '@/routes/pages/MyPlaylist'
import Profile from '@/routes/pages/Profile'
import PlaylistDetail from '@/routes/pages/PlaylistDetail'
import SavedPlaylistDetail from '@/routes/pages/SavedPlaylistsDetail'
import RequiresAuth from '@/routes/protected/RequiresAuth'
import SignIn from './pages/SignIn'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const router = createBrowserRouter([
  {
    element: <NavbarLayout />,
    children: [
      {
        element: <RequiresAuth />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/playlist-details/:id', element: <PlaylistDetail /> },
          { path: '/add-playlist', element: <AddPlaylist /> },
          { path: '/bookmark', element: <Bookmark /> },
          { path: '/my-playlist', element: <MyPlaylist /> },
          { path: '/saved-playlists', element: <SavedPlaylistDetail /> },
          { path: '/profile', element: <Profile /> }
        ]
      }
    ]
  },
  { path: '/signIn', element: <SignIn /> }
])
