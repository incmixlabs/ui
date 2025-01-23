"use client";
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { I18n } from "@incmix/pages/i18n"
import { useRateLimitStore } from "@incmix/store"
import {
  AUTH_API_URL,
  RATELIMIT_API_URL,
  USERS_API_URL,
} from "@incmix/ui/constants"
import { isTauri } from "@incmix/ui/tauri"
import type {
  AuthUserSession,
  OptionalPresignedUrl,
  UserProfile,
} from "@incmix/utils/types"
import {
  type QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { invoke } from "@tauri-apps/api/core"
import { listen } from "@tauri-apps/api/event"
import { toast } from "sonner"

export const useAuth = () => {
  const { data, isLoading, isError, fetchStatus } = useQuery({
    queryKey: ["user", I18n.language],
    queryFn: async () => {
      const res = await fetch(`${AUTH_API_URL}`, {
        credentials: "include",
        headers: {
          "Accept-Language": I18n.language ?? "en",
        },
      })
      if (!res.ok) throw new Error("Not authenticated")
      return res.json() as Promise<AuthUserSession>
    },
    retry: false,
  })

  const authUser = isError ? null : data

  useRateLimits()

  return { authUser, isLoading, isError, fetchStatus }
}

export const useUser = (userId: string) => {
  const {
    data,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user", userId, I18n.language],
    queryFn: async () => {
      const res = await fetch(`${USERS_API_URL}?id=${userId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept-Language": I18n.language ?? "en",
        },
      })
      if (!res.ok) throw new Error("Failed to fetch user data")
      return res.json() as Promise<UserProfile>
    },
    enabled: !!userId,
  })

  const isLoading = isUserLoading
  const isError = isUserError
  const user = isError ? null : data

  return { user, isLoading, isError }
}

export const useCurrentUser = () => {
  const { authUser, isLoading: isAuthLoading, isError: isAuthError } = useAuth()

  const {
    user: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useUser(authUser?.id ?? "")

  const isError = isAuthError || isUserError
  const isLoading = isAuthLoading || isUserLoading
  const user = isError ? null : userData

  return { user, isLoading, isError }
}

export const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { t } = useTranslation(["login"])

  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => {
      const response = await fetch(`${AUTH_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })
      if (!response.ok) {
        if (response.status === 403) {
          return { email, verified: false }
        }
        const contentType = response.headers.get("content-type")
        if (contentType?.includes("application/json")) {
          const data = (await response.json()) as any
          throw new Error(data.message || t("error.login"))
        }
        if (contentType?.includes("text/plain")) {
          throw new Error(await response.text())
        }
        throw new Error(t("error.login"))
      }
      const data = (await response.json()) as any
      return { ...data, verified: true }
    },
    onSuccess: (data) => {
      if (data.verified) {
        queryClient.setQueryData(["user"], data)
        navigate({ to: "/dashboard" })
      } else {
        navigate({ to: "/welcome", search: { email: data.email } })
      }
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : t("error.login")
      toast.error(message)
    },
  })

  const handleLogin = (email: string, password: string) => {
    loginMutation.mutate({ email, password })
  }

  return {
    handleLogin,
    isPending: loginMutation.isPending,
    isSuccess: loginMutation.isSuccess,
    loginError: loginMutation.error,
  }
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation(["login"])

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${AUTH_API_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Accept-Language": I18n.language ?? "en",
        },
      })
      if (!response.ok) throw new Error(t("error.logout"))
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null)
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : t("error.logout")
      toast.error(message)
    },
  })

  const handleLogout = () => logoutMutation.mutate()

  return {
    handleLogout,
    isPending: logoutMutation.isPending,
    isSuccess: logoutMutation.isSuccess,
  }
}

export const useProfileUpdate = (userId: string) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation(["profile"])

  const updateUserMutation = useMutation({
    mutationFn: async ({ fullName }: { fullName: string }) => {
      const response = await fetch(`${USERS_API_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        body: JSON.stringify({ fullName }),
        credentials: "include",
      })
      if (!response.ok) {
        const errorData = (await response.json()) as any
        throw new Error(errorData.message || t("error.updateUser"))
      }
      return response.json()
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(["user"], (oldData: UserProfile) => ({
        ...oldData,
        fullName: data?.fullName,
      }))
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : t("error.updateUser")
      toast.error(message)
    },
  })

  const handleUpdateUser = (fullName: string) =>
    updateUserMutation.mutateAsync({ fullName })

  return {
    handleUpdateUser,
    isUpdatingUser: updateUserMutation.isPending,
    updateUserError: updateUserMutation.error,
  }
}

export const useProfilePictureUrl = (userId: string) => {
  const { data: presignedUrl } = useQuery({
    queryKey: ["profilePictureUrl", userId],
    queryFn: async () => {
      const response = await fetch(
        `${USERS_API_URL}/${userId}/profile-picture`,
        {
          credentials: "include",
        }
      )
      if (!response.ok) {
        const message: { message: string } = (await response.json()) as any
        throw new Error(message.message)
      }
      const data = (await response.json()) as OptionalPresignedUrl
      return data.url
    },
    enabled: !!userId,
  })

  return presignedUrl || null
}

export const useProfilePicture = (userId: string) => {
  const queryClient = useQueryClient()
  const { t } = useTranslation(["profile"])

  const addProfilePictureMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append("file", file)
      const response = await fetch(
        `${USERS_API_URL}/${userId}/profile-picture`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
          headers: {
            "Accept-Language": I18n.language ?? "en",
          },
        }
      )
      if (!response.ok) {
        const errorData = (await response.json()) as any
        throw new Error(errorData.message || t("error.addProfilePicture"))
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : t("error.addProfilePicture")
      toast.error(message)
    },
  })

  const deleteProfilePictureMutation = useMutation({
    mutationFn: async () => {
      const updateResponse = await fetch(
        `${USERS_API_URL}/${userId}/profile-picture`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Accept-Language": I18n.language ?? "en",
          },
        }
      )
      if (!updateResponse.ok) {
        throw new Error(t("error.deleteProfilePicture"))
      }
      return updateResponse.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })

  const handleAddProfilePicture = (file: File) =>
    addProfilePictureMutation.mutateAsync(file)
  const handleDeleteProfilePicture = () =>
    deleteProfilePictureMutation.mutateAsync()

  return {
    handleAddProfilePicture,
    handleDeleteProfilePicture,
    isAddingProfilePicture: addProfilePictureMutation.isPending,
    isDeletingProfilePicture: deleteProfilePictureMutation.isPending,
    addProfilePictureError: addProfilePictureMutation.error,
    deleteProfilePictureError: deleteProfilePictureMutation.error,
  }
}

export const useGoogleAuthCallback = (state: string, code: string) => {
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["googleLoginCallback", state, code],
    queryFn: async () => {
      const response = await fetch(
        `${AUTH_API_URL}/google/callback?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": I18n.language ?? "en",
          },
          credentials: "include",
        }
      )
      if (!response.ok) throw new Error("Failed to retrieve authentication URL")
      return response.json()
    },
    retry: false,
  })

  const isLoggedIn = !isLoading && !isError

  if (isLoggedIn) {
    queryClient.invalidateQueries({ queryKey: ["user"] })
  }

  return { data, isLoading, isError, isLoggedIn, error }
}

export const useGoogleLogin = () => {
  const { t } = useTranslation(["login"])

  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${AUTH_API_URL}/google`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
          "X-Client-Type": isTauri ? "desktop" : "web",
        },
        credentials: "include",
      })
      if (!response.ok) throw new Error(t("error.googleAuthUrl"))
      const data = await response.json()

      if (isTauri) {
        await invoke("open_google_auth", { url: data.authUrl })
      } else {
        window.location.href = data.authUrl
      }
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const handleGoogleLogin = () => {
    googleLoginMutation.mutate()
  }

  return {
    handleGoogleLogin,
    isLoading: googleLoginMutation.isPending,
    isSuccess: googleLoginMutation.isSuccess,
  }
}

export const setupGoogleAuthCallbackListener = (queryClient: QueryClient) => {
  if (!isTauri) return null

  const setupListener = () => {
    const unsubscribe = listen("google_auth_callback", (event) => {
      if (typeof event.payload !== "string") {
        console.error("Invalid event payload")
        return
      }

      try {
        const url = new URL(event.payload)
        const state = url.searchParams.get("state")
        const code = url.searchParams.get("code")

        if (state && code) {
          handleGoogleCallback(state, code, queryClient)
        }
      } catch (error) {
        console.error("Error parsing URL from event:", error)
      }
    })

    const cleanup = () => {
      unsubscribe.then((fn) => fn())
    }

    return cleanup
  }

  return setupListener
}

const handleGoogleCallback = async (
  state: string,
  code: string,
  queryClient: QueryClient
) => {
  try {
    const response = await fetch(
      `${AUTH_API_URL}/google/callback?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
          "X-Client-Type": isTauri ? "desktop" : "web",
        },
        credentials: "include",
      }
    )
    if (!response.ok) throw new Error("Failed to authenticate with Google")
    const data = await response.json()
    queryClient.setQueryData(["user", I18n.language], data)
    queryClient.invalidateQueries({ queryKey: ["user", I18n.language] })
  } catch (error) {
    console.error("Google authentication error:", error)
    toast.error("Failed to authenticate with Google")
  }
}

export const useRateLimits = () => {
  const { data: rateLimits } = useQuery<{
    [key: string]: { time: number; limit: number }
  }>({
    queryKey: ["rateLimits"],
    queryFn: async () => {
      const response = await fetch(`${RATELIMIT_API_URL}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "accept-language": I18n.language ?? "en",
        },
      })
      if (!response.ok) throw new Error("Failed to fetch rate limits")
      return response.json()
    },
  })

  const { setRateLimits } = useRateLimitStore()

  useEffect(() => {
    if (rateLimits) setRateLimits(rateLimits)
  }, [rateLimits, setRateLimits])

  return rateLimits
}
