import { createRootRouteWithContext, createRouter, createRoute } from '@tanstack/react-router';
import { ShadcnComponentShowcase } from '../pages/ShadcnComponentShowcase';
import { RadixUIComponentShowcase } from '../pages/RadixUIComponentShowcase';

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

export const radixuiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'radixui',
  component: RadixUIComponentShowcase,
});

// Create the route tree
const routeTree = rootRoute.addChildren([shadcnRoute, radixuiRoute]);

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
