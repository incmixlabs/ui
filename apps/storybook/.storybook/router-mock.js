// Mock implementation of @tanstack/react-router for Storybook
import React from 'react'

export const useLocation = () => ({
  pathname: '/dashboard',
  search: '',
  hash: '',
  state: {},
  key: 'storybook-mock'
})

export const useParams = () => ({})

export const useNavigate = () => () => {}

export const useRouter = () => ({
  location: {
    pathname: '/dashboard',
    search: '',
    hash: '',
    state: {},
    key: 'storybook-mock'
  },
  navigate: () => {},
  history: {
    push: () => {},
    replace: () => {},
    go: () => {},
    back: () => {},
    forward: () => {}
  }
})

export const Link = ({ children, to, ...props }) => {
  return React.createElement('a', { ...props, href: to || '#' }, children)
}

export const Navigate = () => null

export const Outlet = ({ children }) => children || null