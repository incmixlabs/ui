import { I18n } from "@incmix/pages/i18n"
import { ORG_API_URL } from "@incmix/ui/constants"
import { createAbilityFromPermissions } from "@incmix/utils/casl"
import type { AppAbility, Permission } from "@incmix/utils/types"
import type {
  GetMembersResponse,
  Member,
  Organization,
} from "@incmix/utils/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useCallback } from "react"
import { toast } from "sonner"

export function useOrganizations() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["organizations", I18n.language],
    queryFn: async () => {
      const res = await fetch(`${ORG_API_URL}/user`, {
        credentials: "include",
        headers: {
          "Accept-Language": I18n.language ?? "en",
        },
      })
      if (!res.ok) throw new Error(I18n.t("error.fetchOrganizations"))
      return res.json()
    },
    retry: false,
  })

  return { organizations: data as Organization[], isLoading, isError }
}

export function useValidateHandle() {
  const validateHandle = useMutation({
    mutationFn: async ({
      handle,
    }: {
      handle: string
    }) => {
      const response = await fetch(`${ORG_API_URL}/validate-handle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        body: JSON.stringify({ handle }),
        credentials: "include",
      })

      if (!response.ok) {
        const data = (await response.json()) as any
        throw new Error(data.message)
      }
      return (await response.json()) as { success: boolean }
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : I18n.t("error.validateHandle")
      toast.error(message)
    },
  })

  const handleValidateOrganization = useCallback(
    async (handle: string) => {
      const { success } = await validateHandle.mutateAsync({ handle })

      if (success) return Promise.resolve(true)

      return Promise.reject(
        I18n.t("organizations:organizationHandleValidationFail")
      )
    },
    [validateHandle]
  )

  return {
    handleValidateOrganization,
    isValidating: validateHandle.isPending,
    validateHandleError: validateHandle.error,
  }
}
export function useCreateOrganization() {
  type BuildingOrgMember = Omit<Member, "orgHandle">

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const createOrgMutation = useMutation({
    mutationFn: async ({
      name,
      handle,
      members,
    }: {
      name: string
      handle: string
      members: BuildingOrgMember[]
    }) => {
      const response = await fetch(`${ORG_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        body: JSON.stringify({ name, handle, members }),
        credentials: "include",
      })
      if (!response.ok) {
        const data = (await response.json()) as any
        throw new Error(data.message || I18n.t("error.createOrganization"))
      }
      return response.json()
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
      navigate({ to: `/organization/${data.handle}` })
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : I18n.t("error.createOrganization")
      toast.error(message)
    },
  })

  const handleCreateOrganization = (
    name: string,
    handle: string,
    members: BuildingOrgMember[]
  ) => {
    createOrgMutation.mutate({ name, handle, members })
  }

  return {
    handleCreateOrganization,
    isCreatingOrganization: createOrgMutation.isPending,
    createOrganizationError: createOrgMutation.error,
  }
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient()

  const updateOrgMutation = useMutation({
    mutationFn: async ({
      orgHandle,
      name,
    }: { orgHandle: string; name: string }) => {
      const response = await fetch(`${ORG_API_URL}/${orgHandle}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        body: JSON.stringify({ name }),
        credentials: "include",
      })
      if (!response.ok) {
        const errorData = (await response.json()) as any
        throw new Error(errorData.message || I18n.t("error.updateOrganization"))
      }
      return response.json()
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(["organizations", data.handle], data)
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
      queryClient.invalidateQueries({ queryKey: ["organization", data.handle] })
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : I18n.t("error.updateOrganization")
      toast.error(message)
    },
  })

  const handleUpdateOrganization = (orgHandle: string, name: string) =>
    updateOrgMutation.mutateAsync({ orgHandle, name })

  return {
    handleUpdateOrganization,
    isUpdatingOrganization: updateOrgMutation.isPending,
    updateOrganizationError: updateOrgMutation.error,
  }
}

export function useDeleteOrganization() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const deleteOrgMutation = useMutation({
    mutationFn: async (orgHandle: string) => {
      const response = await fetch(`${ORG_API_URL}/${orgHandle}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Accept-Language": I18n.language ?? "en",
        },
      })
      if (!response.ok) {
        const data = (await response.json()) as any
        throw new Error(data.message || I18n.t("error.deleteOrganization"))
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
      navigate({ to: "/organizations" })
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : I18n.t("error.deleteOrganization")
      toast.error(message)
    },
  })

  const handleDeleteOrganization = (orgHandle: string) =>
    deleteOrgMutation.mutateAsync(orgHandle)

  return {
    handleDeleteOrganization,
    isDeletingOrganization: deleteOrgMutation.isPending,
    deleteOrganizationError: deleteOrgMutation.error,
  }
}

export function useAddMember() {
  const queryClient = useQueryClient()

  const addMemberMutation = useMutation({
    mutationFn: async ({
      orgHandle,
      email,
      role,
    }: {
      orgHandle: string
      email: string
      role: string
    }) => {
      const response = await fetch(`${ORG_API_URL}/${orgHandle}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        body: JSON.stringify({ email, role }),
        credentials: "include",
      })
      if (!response.ok) {
        const errorData = (await response.json()) as any
        throw new Error(errorData.message || I18n.t("error.addMember"))
      }
      return response.json()
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(["organizations", data.handle], data)
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
      queryClient.invalidateQueries({ queryKey: ["organization", data.handle] })
      queryClient.invalidateQueries({
        queryKey: ["organizationMembers", data.handle],
      })
    },
  })

  const handleAddMember = (orgHandle: string, email: string, role: string) =>
    addMemberMutation.mutateAsync({ orgHandle, email, role })

  return {
    handleAddMember,
    isAddingMember: addMemberMutation.isPending,
    addMemberError: addMemberMutation.error,
  }
}

export function useRemoveMembers() {
  const queryClient = useQueryClient()

  const removeMembersMutation = useMutation({
    mutationFn: async ({
      orgHandle,
      userIds,
    }: {
      orgHandle: string
      userIds: string[]
    }) => {
      const response = await fetch(`${ORG_API_URL}/${orgHandle}/members`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        body: JSON.stringify({ userIds }),
        credentials: "include",
      })
      if (!response.ok) {
        const errorData = (await response.json()) as any
        throw new Error(errorData.message || I18n.t("error.removeMembers"))
      }
      return response.json()
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(["organizations", data.handle], data)
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
      queryClient.invalidateQueries({ queryKey: ["organization", data.handle] })
      queryClient.invalidateQueries({
        queryKey: ["organizationMembers", data.handle],
      })
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : I18n.t("error.removeMembers")
      toast.error(message)
    },
  })

  const handleRemoveMembers = (orgHandle: string, userIds: string[]) =>
    removeMembersMutation.mutateAsync({ orgHandle: orgHandle, userIds })

  return {
    handleRemoveMembers,
    isRemovingMembers: removeMembersMutation.isPending,
    removeMembersError: removeMembersMutation.error,
  }
}

export function useUpdateMemberRole() {
  const queryClient = useQueryClient()

  const updateMemberRoleMutation = useMutation({
    mutationFn: async ({
      orgHandle,
      userId,
      role,
    }: {
      orgHandle: string
      userId: string
      role: string
    }) => {
      const response = await fetch(`${ORG_API_URL}/${orgHandle}/members`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": I18n.language ?? "en",
        },
        body: JSON.stringify({ userId, role }),
        credentials: "include",
      })
      if (!response.ok) {
        const errorData = (await response.json()) as any
        throw new Error(errorData.message || I18n.t("error.updateMemberRole"))
      }
      return response.json()
    },
    onSuccess: (data: any) => {
      queryClient.setQueryData(["organizations", data.handle], data)
      queryClient.invalidateQueries({ queryKey: ["organizations"] })
      queryClient.invalidateQueries({ queryKey: ["organization", data.handle] })
      queryClient.invalidateQueries({
        queryKey: ["organizationMembers", data.handle],
      })
    },
  })

  const handleUpdateMemberRole = (
    orgHandle: string,
    userId: string,
    role: string
  ) =>
    updateMemberRoleMutation.mutateAsync({ orgHandle: orgHandle, userId, role })

  return {
    handleUpdateMemberRole,
    isUpdatingMemberRole: updateMemberRoleMutation.isPending,
    updateMemberRoleError: updateMemberRoleMutation.error,
  }
}

export function useOrganization(orgHandle: string | undefined) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["organization", orgHandle, I18n.language],
    queryFn: async () => {
      if (!orgHandle) throw new Error(I18n.t("error.organizationIdRequired"))
      const res = await fetch(`${ORG_API_URL}/handle/${orgHandle}`, {
        credentials: "include",
        headers: {
          "Accept-Language": I18n.language ?? "en",
        },
      })
      if (!res.ok) throw new Error(I18n.t("error.fetchOrganizationDetails"))
      return res.json()
    },
    enabled: !!orgHandle,
    retry: false,
  })

  return { organization: data as Organization | undefined, isLoading, isError }
}

export function useOrganizationMembers(orgHandle: string | undefined): {
  members: GetMembersResponse
  isLoading: boolean
  isError: boolean
} {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["organizationMembers", orgHandle, I18n.language],
    queryFn: async () => {
      if (!orgHandle) throw new Error(I18n.t("error.organizationIdRequired"))
      const res = await fetch(`${ORG_API_URL}/${orgHandle}/members`, {
        credentials: "include",
        headers: {
          "Accept-Language": I18n.language ?? "en",
        },
      })
      if (!res.ok) throw new Error(I18n.t("error.fetchOrganizationMembers"))
      return res.json()
    },
    enabled: !!orgHandle,
    retry: false,
  })
  const members: GetMembersResponse = data as GetMembersResponse

  return { members, isLoading, isError }
}

const getOrganizationPermissions = async (
  orgHandle: string
): Promise<Permission[]> => {
  const response = await fetch(`${ORG_API_URL}/${orgHandle}/permissions`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": I18n.language ?? "en",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch organization permissions")
  }

  return response.json() as Promise<Permission[]>
}

export const useOrganizationMemberAbility = (
  orgHandle: string
): {
  ability: AppAbility | undefined
  isLoading: boolean
  isError: boolean
} => {
  const { data, isLoading, isError } = useQuery<Permission[]>({
    queryKey: ["organizationPermissions", orgHandle],
    queryFn: () => getOrganizationPermissions(orgHandle),
  })

  if (!data) return { ability: undefined, isLoading, isError }

  const ability = createAbilityFromPermissions(data)

  return { ability, isLoading, isError }
}
