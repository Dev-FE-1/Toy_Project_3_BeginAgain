import { initializeApp } from 'firebase/app'
initializeApp({
  apiKey: 'AIzaSyAwMu9NhfMOYVvm477EbzUdmYBCstAL1ME',
  authDomain: 'dev-camp-1.firebaseapp.com',
  projectId: 'dev-camp-1',
  storageBucket: 'dev-camp-1.appspot.com',
  messagingSenderId: '1028693702983',
  appId: '1:1028693702983:web:453a9a0feac42d18eeb462'
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routes'
import GlobalStyles from '@/styles/GlobalStyles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
