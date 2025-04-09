import { Avatar } from "@/components/avatar"
import { HoverCard } from "@/components/card/hover-card"
import { iconSize } from "@/components/icons/icon"
import { CalendarDays } from "lucide-react"
import type React from "react"
import { people } from "./data"

interface Props {
  children: React.ReactNode
  handle: string
}

export function Mention({ children, handle }: Props) {
  const isString =
    Array.isArray(children) &&
    children.length === 1 &&
    typeof children[0] === "string"
  // REMINDER: children has other children - return early
  if (!isString) {
    return children
  }

  const user = people.find(({ username }) => username === `@${handle}`) // or `username === children[0]`
  // REMINDER: only allowed users are rendered with HoverCard
  if (!user) {
    return children
  }

  const twitterUrl = `https://twitter.com/${handle}`

  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <a href={twitterUrl} target="_blank" rel="noreferrer">
          {children}
        </a>
      </HoverCard.Trigger>
      <HoverCard.Content asChild className="w-auto max-w-xs">
        <div className="flex justify-between space-x-4">
          <Avatar
            size="1"
            id={user.id}
            src={user.profileImg}
            name={user.username}
          />
          <div className="space-y-1">
            <h4 className="font-semibold text-sm">{user.username}</h4>
            <p className="text-sm">{user.description}</p>
            <div className="flex items-center pt-2">
              <CalendarDays className={`mr-2 ${iconSize} opacity-70`} />{" "}
              <span className="text-muted-foreground text-xs">
                Joined {user.joined}
              </span>
            </div>
          </div>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  )
}
