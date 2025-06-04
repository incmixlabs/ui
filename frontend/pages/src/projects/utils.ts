import { I18n } from "@incmix/pages/i18n"
import { ORG_API_URL } from "@incmix/ui/constants"
import { projects } from "@incmix/ui/projects-data"
import { useQuery } from "@tanstack/react-query"

export function useProjects() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects", I18n.language],
    queryFn: async () => {
      const res = await fetch(`${ORG_API_URL}/user`, {
        credentials: "include",
        headers: {
          "Accept-Language": I18n.language ?? "en",
        },
      })
      if (!res.ok) throw new Error(I18n.t("error.fetchOrganizations"))
      // return res.json()
      return projects
    },
    retry: false,
  })

  return { projects: (data ?? []) as typeof projects, isLoading, isError }
}
