import { createBrowserRouter } from 'react-router-dom'
import NavbarLayout from '@/components/layouts/NavbarLayout'
import Home from '@/routes/pages/Home'
import AddPlaylist from '@/routes/pages/AddPlaylist'
import Bookmark from '@/routes/pages/Bookmark'
import MyPlaylist from '@/routes/pages/MyPlaylist'
import Profile from '@/routes/pages/Profile'
import EditProfile from '@/routes/pages/EditProfile'
import PlaylistDetail from '@/routes/pages/PlaylistDetail'
import SavedPlaylistDetail from '@/routes/pages/SavedPlaylistsDetail'
import BookmarkedPlaylist from '@/routes/pages/BookmarkedPlaylist'
import RequiresAuth from '@/routes/protected/RequiresAuth'
import EditPlaylistInfo from '@/routes/pages/EditPlaylistInfo'
import SignIn from './pages/SignIn'
import NotFound from './pages/NotFound'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import DeleteVideos from './pages/DeleteVideos'

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
          { path: '/bookmarked-playlist/:id', element: <BookmarkedPlaylist /> },
          { path: '/my-playlist', element: <MyPlaylist /> },
          { path: '/saved-playlists/:id', element: <SavedPlaylistDetail /> },
          { path: '/edit-playlist/:id', element: <EditPlaylistInfo /> },
          { path: '/delete-videos/:id', element: <DeleteVideos /> },
          { path: '/profile', element: <Profile /> }
          { path: '/edit-profile', element: <EditProfile /> }
        ]
      }
    ]
  },
  { path: '/signIn', element: <SignIn /> },
  { path: '*', element: <NotFound /> }
])
