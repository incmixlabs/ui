import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './style/global.css'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './lib/router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
