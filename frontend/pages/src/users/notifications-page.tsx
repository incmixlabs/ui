import { AUTH_API_URL } from "@incmix/ui/constants"
import type { WsMessage } from "@incmix/utils/types"
import { Text } from "@radix-ui/themes"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useMemo, useState } from "react"
import { useCurrentUser } from "../auth"
import LoadingPage from "../common/loading-page"

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate()
  const { user, isLoading, isError } = useCurrentUser()
  const [items, setItems] = useState<{ message: string }[]>([])

  const ws = useMemo(() => {
    const url = new URL(`${AUTH_API_URL}/connect`)
    const wss = window.location.protocol === "https:" ? "wss" : "ws"
    url.protocol = wss
    return new WebSocket(url)
  }, [])

  useEffect(() => {
    if ((!user && !isLoading) || isError) {
      navigate({ to: "/login" })
    }
  }, [user, isLoading, isError, navigate])

  useEffect(() => {
    ws.addEventListener("open", (_e) => {
      console.log("ws connected")
    })

    const wsHandleMessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data) as WsMessage
      if (data.action === "CONNECT") {
        const message = data.data["message"] as string
        if (message.length) setItems((prev) => [{ message }, ...prev])
      }
      if (data.action === "DISCONNECT") {
        const message = data.data["message"] as string
        if (message.length) setItems((prev) => [{ message }, ...prev])
      }
    }
    ws.addEventListener("message", wsHandleMessage)
    return () => {
      setItems([])
      ws.removeEventListener("message", wsHandleMessage)
    }
  }, [ws])

  if (isLoading) return <LoadingPage />
  if (isError || !user) return null
  return (
    <div className="space-y-2">
      {items.map((m, i) => (
        <Text className="block" key={`notif_${i}`}>
          {m.message}
        </Text>
      ))}
    </div>
  )
}

export default NotificationsPage
