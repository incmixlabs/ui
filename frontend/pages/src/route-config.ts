import type { Dashboard } from "@incmix/store"
import { type AuthUserSession, UserRoles } from "@incmix/utils/types"
import { createRouter } from "@tanstack/react-router"
import {
  BoxIcon,
  FolderClosed,
  HelpCircle,
  Layers,
  LayoutDashboardIcon,
  LockIcon,
  type LucideIcon,
  Notebook,
} from "lucide-react"
import EmailVerificationRoute from "./auth/routes/email-verification"
import LoginRoute from "./auth/routes/login"
import ResetPasswordRoute from "./auth/routes/reset-password"
import SignupRoute from "./auth/routes/signup"
import WelcomeRoute from "./auth/routes/welcome"
import LoadingPage from "./common/loading-page"
import NotFoundPage from "./common/not-found-page"
import IndexRoute from "./common/routes/home"
import LoadingRoute from "./common/routes/loading"
import NotFoundRoute from "./common/routes/not-found"
import RootRoute from "./common/routes/root"
import DashboardHomeRoute from "./dashboard/routes/dashboard-home"
import FileManagerRoute from "./file-manager/routes/index"
import NotesRoute from "./notes/routes/index"
import OnboardingRoute from "./onboarding/routes/onboarding"
import OrganisationEnvVarsRoute from "./orgs/routes/env-vars"
import OrganisationDetailsRoute from "./orgs/routes/organisation-details"
import OrganisationsRoute from "./orgs/routes/organisations"
import OrganisationUsersRoute from "./orgs/routes/users"
import ProjectsRoute from "./projects/routes/index"
import RolesRoute from "./roles/routes/index"
import TasksRoute from "./tasks/routes/index"
import TranslationsRoute from "./translations/routes/translations"
import ListUsersRoute from "./users/routes/list-users"
import NotificationsRoute from "./users/routes/notifications"
import ProfileRoute from "./users/routes/profile"
import SettingsRoute from "./users/routes/settings"

export type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  isSelected?: boolean
  notificationCount?: number
  items?: {
    title: string
    url: string
    isSelected?: boolean
  }[]
}

// Route access types
export const ROUTE_ACCESS = {
  PUBLIC: "public",
  PROTECTED: "protected",
  MEMBER: "member",
  SUPER_ADMIN: "super_admin",
} as const

type RouteAccess = (typeof ROUTE_ACCESS)[keyof typeof ROUTE_ACCESS]

/**
 * Configuration for a single route in the application.
 */
type RouteConfig = {
  /**
   * The path for the route (e.g., "/dashboard").
   */
  path: string
  /**
   * The route object, typically created by createRoute from @tanstack/react-router.
   */
  route: any
  /**
   * Sidebar configuration for this route (optional) - if not provided, the route will not be displayed in the sidebar.
   */
  sidebar?: {
    /**
     * The display title for the sidebar item.
     */
    title: string
    /**
     * The icon to display in the sidebar (optional).
     */
    icon?: LucideIcon
    /**
     * The position/order of the item in the sidebar (optional).
     */
    position?: number
    /**
     * Child routes to display as nested sidebar items (optional).
     */
    children?: RouteConfig[]
  }
  /**
   * Access control for the route. Can be a single access type or an array of access types.
   */
  access: RouteAccess | RouteAccess[]
}

// Unified config for both sidebar and route tree
const ROUTES_CONFIG: RouteConfig[] = [
  {
    path: "/dashboard",
    route: DashboardHomeRoute,
    sidebar: {
      title: "Dashboard",
      icon: LayoutDashboardIcon,
      position: 1,
      children: [
        // Dynamic dashboards handled separately in sidebar builder
        {
          path: "/dashboard/home",
          route: DashboardHomeRoute,
          sidebar: { title: "Home" },
          access: ROUTE_ACCESS.MEMBER,
        },
      ],
    },
    access: ROUTE_ACCESS.MEMBER,
  },
  {
    path: "/projects",
    route: ProjectsRoute,
    sidebar: {
      title: "Projects",
      icon: Layers,
      position: 2,
      children: [
        {
          path: "/projects",
          route: ProjectsRoute,
          sidebar: { title: "All Projects" },
          access: ROUTE_ACCESS.MEMBER,
        },
        {
          path: "/tasks",
          route: TasksRoute,
          sidebar: { title: "Tasks" },
          access: ROUTE_ACCESS.MEMBER,
        },
        {
          path: "/users/list",
          route: ListUsersRoute,
          sidebar: { title: "Users" },
          access: ROUTE_ACCESS.SUPER_ADMIN,
        },
      ],
    },
    access: ROUTE_ACCESS.MEMBER,
  },
  {
    path: "/file-manager",
    route: FileManagerRoute,
    sidebar: { title: "File Manager", icon: FolderClosed, position: 3 },
    access: ROUTE_ACCESS.MEMBER,
  },
  {
    path: "/notes",
    route: NotesRoute,
    sidebar: { title: "Notes", icon: Notebook, position: 4 },
    access: ROUTE_ACCESS.MEMBER,
  },
  {
    path: "/organizations",
    route: OrganisationsRoute,
    sidebar: {
      title: "Organizations",
      icon: BoxIcon,
      position: 5,
      children: [
        {
          path: "/organization/$orgHandle",
          route: OrganisationDetailsRoute,

          access: ROUTE_ACCESS.MEMBER,
        },
        {
          path: "/organization/$orgHandle/env-vars",
          route: OrganisationEnvVarsRoute,

          access: ROUTE_ACCESS.MEMBER,
        },
        {
          path: "/organization/$orgHandle/users",
          route: OrganisationUsersRoute,

          access: ROUTE_ACCESS.MEMBER,
        },
      ],
    },
    access: ROUTE_ACCESS.MEMBER,
  },
  {
    path: "/roles",
    route: RolesRoute,
    sidebar: { title: "Roles and Permissions", icon: LockIcon, position: 6 },
    access: ROUTE_ACCESS.SUPER_ADMIN,
  },
  {
    path: "/help",
    route: null,
    sidebar: { title: "Help", icon: HelpCircle, position: 6 },
    access: ROUTE_ACCESS.PUBLIC,
  },
  // Add more as needed...
  // Auth, onboarding, etc. (not in sidebar)
  { path: "/login", route: LoginRoute, access: ROUTE_ACCESS.PUBLIC },
  { path: "/signup", route: SignupRoute, access: ROUTE_ACCESS.PUBLIC },
  {
    path: "/reset-password",
    route: ResetPasswordRoute,
    access: ROUTE_ACCESS.PUBLIC,
  },
  {
    path: "/email-verification",
    route: EmailVerificationRoute,
    access: ROUTE_ACCESS.PUBLIC,
  },
  {
    path: "/onboarding",
    route: OnboardingRoute,
    access: ROUTE_ACCESS.PUBLIC,
  },
  {
    path: "/profile",
    route: ProfileRoute,
    access: ROUTE_ACCESS.PROTECTED,
  },
  {
    path: "/settings",
    route: SettingsRoute,
    access: ROUTE_ACCESS.PROTECTED,
  },
  {
    path: "/notifications",
    route: NotificationsRoute,
    access: ROUTE_ACCESS.PROTECTED,
  },
  {
    path: "/translations",
    route: TranslationsRoute,
    access: ROUTE_ACCESS.SUPER_ADMIN,
  },
  { path: "/welcome", route: WelcomeRoute, access: ROUTE_ACCESS.PUBLIC },
  // Fallbacks
  // {
  //   path: NotFoundRoute.path,
  //   route: NotFoundRoute,
  //   access: ROUTE_ACCESS.PUBLIC,
  // },
  { path: "/", route: IndexRoute, access: ROUTE_ACCESS.PUBLIC },
]

// Helper to check access
function hasAccess(
  routeAccess: RouteAccess | RouteAccess[],
  userType: string | undefined
): boolean {
  if (!userType) return routeAccess === ROUTE_ACCESS.PUBLIC
  if (Array.isArray(routeAccess)) {
    return routeAccess.some((a) => hasAccess(a, userType))
  }
  if (routeAccess === ROUTE_ACCESS.PUBLIC) return true
  if (routeAccess === ROUTE_ACCESS.PROTECTED)
    return (
      userType === UserRoles.ROLE_MEMBER ||
      userType === UserRoles.ROLE_SUPER_ADMIN
    )
  if (routeAccess === ROUTE_ACCESS.MEMBER)
    return (
      userType === UserRoles.ROLE_MEMBER ||
      userType === UserRoles.ROLE_SUPER_ADMIN
    )
  if (routeAccess === ROUTE_ACCESS.SUPER_ADMIN)
    return userType === UserRoles.ROLE_SUPER_ADMIN
  return false
}

// Build route tree for router
export function buildRouteTree(
  authUser: AuthUserSession | null,
  isLoading: boolean
) {
  if (isLoading) {
    return createRouter({
      routeTree: RootRoute.addChildren([
        IndexRoute,
        NotFoundRoute,
        LoadingRoute,
      ]),
      defaultNotFoundComponent: LoadingPage,
    })
  }
  const userType = authUser?.userType

  // Recursively collect all route objects from config and children
  function collectRoutes(configs: RouteConfig[], acc: Map<any, any>) {
    for (const r of configs) {
      if (hasAccess(r.access, userType) && r.route && !acc.has(r.route)) {
        acc.set(r.route, true)
      }
      if (r.sidebar?.children) {
        collectRoutes(r.sidebar.children, acc)
      }
    }
  }
  const routeMap = new Map<any, any>()
  collectRoutes(ROUTES_CONFIG, routeMap)
  return createRouter({
    routeTree: RootRoute.addChildren([...routeMap.keys()]),
    defaultNotFoundComponent: NotFoundPage,
  })
}

// Build sidebar items
export function buildSidebarItems(
  userType: string | undefined,
  dashboards: Dashboard[] = [],
  t: (k: string) => string = (k) => k
): NavItem[] {
  // Recursively build sidebar from config
  function buildItems(configs: RouteConfig[]): NavItem[] {
    return configs
      .filter((r) => r.sidebar && hasAccess(r.access, userType))
      .map((r) => {
        const sidebar = r.sidebar
        const item: NavItem = {
          title: sidebar ? t(sidebar.title) : "",
          url: r.path,
          icon: sidebar?.icon,
        }
        if (sidebar?.children) {
          item.items = buildItems(sidebar.children)
        }
        // Special case: dynamic dashboards
        if (r.path === "/dashboard" && dashboards.length > 0) {
          item.items = [
            ...(item.items || []),
            ...dashboards.map((dashboard) => ({
              title:
                dashboard.dashboardName || `Project ${dashboard.dashboardId}`,
              url: `/dashboard/${dashboard.dashboardId}`,
            })),
          ]
        }
        return item
      })
      .sort((a, b) => {
        // Sort by sidebar.position, undefined last
        const aPos = configs.find((r) => r.path === a.url)?.sidebar?.position
        const bPos = configs.find((r) => r.path === b.url)?.sidebar?.position
        if (aPos == null && bPos == null) return 0
        if (aPos == null) return 1
        if (bPos == null) return -1
        return aPos - bPos
      })
  }
  const items = buildItems(ROUTES_CONFIG)
  console.log(items)
  return items
}
