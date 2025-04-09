import { Outlet, createRootRoute } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export default createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})
