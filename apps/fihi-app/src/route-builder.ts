import {
  DashboardHomeRoute,
  DynamicDashboard,
  EmailVerificationRoute,
  FileManagerRoute,
  ForgotPasswordRoute,
  GoogleAuthCallbackRoute,
  IndexRoute,
  ListUsersRoute,
  LoadingPage,
  LoadingRoute,
  LoginRoute,
  NotFoundPage,
  NotFoundRoute,
  NotesRoute,
  NotificationsRoute,
  OnboardingRoute,
  OrganisationDetailsRoute,
  OrganisationEnvVarsRoute,
  OrganisationUsersRoute,
  OrganisationsRoute,
  ProfileRoute,
  ProjectsRoute,
  ResetPasswordRoute,
  RolesRoute,
  RootRoute,
  SettingsRoute,
  SignupRoute,
  TasksRoute,
  TauriGoogleAuthCallbackRoute,
  TranslationsRoute,
  WelcomeRoute,
} from "@incmix/pages"
import { type AuthUserSession, UserRoles } from "@incmix/utils/types"
import { createRouter } from "@tanstack/react-router"

const baseRoutes = [IndexRoute, NotFoundRoute]

const routeTypes = {
  PUBLIC: "public",
  PROTECTED: "protected",
  MEMBER: "member",
  SUPER_ADMIN: "super-admin",
} as const

const routes = [
  { route: DashboardHomeRoute, routeType: routeTypes.MEMBER },
  { route: DynamicDashboard, routeType: routeTypes.MEMBER },
  { route: EmailVerificationRoute, routeType: routeTypes.PUBLIC },
  { route: FileManagerRoute, routeType: routeTypes.MEMBER },
  { route: ForgotPasswordRoute, routeType: routeTypes.PUBLIC },
  { route: GoogleAuthCallbackRoute, routeType: routeTypes.PUBLIC },
  { route: ListUsersRoute, routeType: routeTypes.SUPER_ADMIN },
  { route: LoginRoute, routeType: routeTypes.PUBLIC },
  { route: NotesRoute, routeType: routeTypes.MEMBER },
  { route: NotificationsRoute, routeType: routeTypes.PROTECTED },
  { route: OnboardingRoute, routeType: routeTypes.PUBLIC },
  { route: OrganisationDetailsRoute, routeType: routeTypes.MEMBER },
  { route: OrganisationEnvVarsRoute, routeType: routeTypes.MEMBER },
  { route: OrganisationUsersRoute, routeType: routeTypes.MEMBER },
  { route: OrganisationsRoute, routeType: routeTypes.MEMBER },
  { route: ProfileRoute, routeType: routeTypes.PROTECTED },
  { route: ProjectsRoute, routeType: routeTypes.MEMBER },
  { route: ResetPasswordRoute, routeType: routeTypes.PUBLIC },
  { route: RolesRoute, routeType: routeTypes.SUPER_ADMIN },
  { route: SettingsRoute, routeType: routeTypes.PROTECTED },
  { route: SignupRoute, routeType: routeTypes.PUBLIC },
  { route: TasksRoute, routeType: routeTypes.MEMBER },
  { route: TauriGoogleAuthCallbackRoute, routeType: routeTypes.PUBLIC },
  { route: TranslationsRoute, routeType: routeTypes.SUPER_ADMIN },
  { route: WelcomeRoute, routeType: routeTypes.PUBLIC },
]

export function buildRouteTree(
  authUser: AuthUserSession | null,
  isLoading: boolean
) {
  if (isLoading) {
    return createRouter({
      routeTree: RootRoute.addChildren([...baseRoutes, LoadingRoute]),
      defaultNotFoundComponent: LoadingPage,
    })
  }
  if (!authUser) {
    const publicRoutes = routes
      .filter((route) => route.routeType === routeTypes.PUBLIC)
      .map((route) => route.route)

    return createRouter({
      routeTree: RootRoute.addChildren([...publicRoutes, ...baseRoutes]),
      defaultNotFoundComponent: NotFoundPage,
    })
  }

  if (authUser.userType === UserRoles.ROLE_MEMBER) {
    const memberRoutes = routes
      .filter(
        (route) =>
          route.routeType === routeTypes.MEMBER ||
          route.routeType === routeTypes.PROTECTED
      )
      .map((route) => route.route)

    return createRouter({
      routeTree: RootRoute.addChildren([...memberRoutes, ...baseRoutes]),
      defaultNotFoundComponent: NotFoundPage,
    })
  }

  if (authUser.userType === UserRoles.ROLE_SUPER_ADMIN) {
    const superAdminRoutes = routes.map((route) => route.route)

    return createRouter({
      routeTree: RootRoute.addChildren([...superAdminRoutes, ...baseRoutes]),
      defaultNotFoundComponent: NotFoundPage,
    })
  }

  const protectedRoutes = routes
    .filter(
      (route) =>
        route.routeType === routeTypes.PROTECTED ||
        route.routeType === routeTypes.PUBLIC
    )
    .map((route) => route.route)

  return createRouter({
    routeTree: RootRoute.addChildren([...protectedRoutes, ...baseRoutes]),
    defaultNotFoundComponent: NotFoundPage,
  })
}
