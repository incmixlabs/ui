import { createRootRouteWithContext, createRouter, createRoute } from '@tanstack/react-router';
import { ShadcnComponentShowcase } from '../pages/ShadcnComponentShowcase';

// Create a root route
export const rootRoute = createRootRouteWithContext<{}>()({
  component: () => <ShadcnComponentShowcase />
});

// Create routes
export const shadcnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'shadcn',
  component: ShadcnComponentShowcase,
});


// Create the route tree
const routeTree = rootRoute.addChildren([shadcnRoute]);

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
