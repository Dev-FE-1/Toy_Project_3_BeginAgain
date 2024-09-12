import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavbarLayout from './components/theLayout/NavbarLayout'
import Home from '@/pages/Home'
import AddPlaylist from '@/pages/AddPlaylist'
import Bookmark from '@/pages/Bookmark'
import MyPlaylist from '@/pages/MyPlaylist'
import Profile from '@/pages/Profile'
import PlaylistDetailPage from '@/pages/PlaylistDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/PlaylistDetailPage',
        element: <PlaylistDetailPage />
      },
      { path: '/addplaylist', element: <AddPlaylist /> },
      { path: '/bookmark', element: <Bookmark /> },
      { path: '/myplaylist', element: <MyPlaylist /> },
      { path: '/profile', element: <Profile /> }
    ]
  }
])

const App = () => <RouterProvider router={router} />

export default App
