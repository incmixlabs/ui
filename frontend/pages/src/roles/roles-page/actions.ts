import { ORG_API_URL } from "@incmix/ui/constants"

export async function getRolesPermissions() {
  const res = await fetch(`${ORG_API_URL}/roles-permissions`, {
    credentials: "include",
  })
  const data = await res.json()

  console.log(data)
  return data
}

export type Change = {
  roleId: string
  action: string
  subject: string
  enabled: boolean
}

export async function updateRolesPermissions(changes: Change[]) {
  const res = await fetch(`${ORG_API_URL}/roles-permissions`, {
    method: "PUT",
    body: JSON.stringify(changes),
    credentials: "include",
  })
  const data = await res.json()
  return data
}
