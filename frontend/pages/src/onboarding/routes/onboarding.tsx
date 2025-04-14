import { RootRoute } from "@common"
import { createRoute } from "@tanstack/react-router"
import OnboardingPage from "../pages/onboarding-page"

export default createRoute({
  getParentRoute: () => RootRoute,
  path: "/onboarding",
  component: () => <OnboardingPage />,
})
