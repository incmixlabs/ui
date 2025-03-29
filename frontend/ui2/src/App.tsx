import { RouterProvider } from '@tanstack/react-router'
import { router } from './lib/router'
import './style/global.css'

function App() {
  return <RouterProvider router={router} />
}

export default App
