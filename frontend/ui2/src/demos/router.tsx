import { createRootRouteWithContext, createRouter, createRoute } from '@tanstack/react-router';
import { ComponentShowcase } from './pages/ComponentShowcase';

// Create a root route
export const rootRoute = createRootRouteWithContext<{}>()({
  component: () => <ComponentShowcase />
});

// Create routes
export const route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ComponentShowcase,
});


// Create the route tree
const routeTree = rootRoute.addChildren([route]);

// Create the router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
