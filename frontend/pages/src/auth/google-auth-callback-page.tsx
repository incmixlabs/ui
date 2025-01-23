import { LoadingPage } from "@incmix/pages/common"
import { useNavigate } from "@tanstack/react-router"
import { useGoogleAuthCallback } from "./hooks/auth"
import GoogleAuthCallbackRoute from "./routes/google-auth-callback"

function GoogleAuthCallbackPage() {
  const { state, code } = GoogleAuthCallbackRoute.useSearch()
  const { isLoggedIn, isLoading } = useGoogleAuthCallback(state, code)
  const navigate = useNavigate()

  if (isLoading) {
    return <LoadingPage />
  }

  if (isLoggedIn) {
    navigate({ to: "/dashboard" })
  }

  return null
}

export default GoogleAuthCallbackPage
