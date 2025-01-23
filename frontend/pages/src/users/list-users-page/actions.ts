import { AUTH_API_URL } from "@incmix/ui/constants"

export const setVerified = async ({
  id,
  value,
}: { id: string; value: boolean }): Promise<{ message: string }> => {
  const response = await fetch(`${AUTH_API_URL}/users/setVerified`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ value, id }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = (await response.json()) as { message: string }
  if (!response.ok) throw new Error(data.message)

  return data
}

export const setEnabled = async ({
  id,
  value,
}: { id: string; value: boolean }): Promise<{ message: string }> => {
  const response = await fetch(`${AUTH_API_URL}/users/setEnabled`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ value, id }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const data = (await response.json()) as { message: string }
  if (!response.ok) {
    if (!data.message) throw new Error("Failed to Update")
    throw new Error(data.message)
  }

  return data
}
export const setPassword = async ({
  id,
  value,
}: { id: string; value: string }): Promise<{ message: string }> => {
  const response = await fetch(`${AUTH_API_URL}/users/setPassword`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify({ value, id }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  const data = (await response.json()) as { message: string }
  if (!response.ok) throw new Error(data.message)

  return data
}
