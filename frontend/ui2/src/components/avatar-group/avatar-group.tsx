import type React from "react"
import { SpreadLayout } from "./layouts/spread"
import { StackLayout } from "./layouts/stack"
import type { AvatarGroupProps } from "./types"

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  const { layout = "spread" } = props

  if (layout === "stack") {
    return <StackLayout {...props} />
  }

  return <SpreadLayout {...props} />
}

export default AvatarGroup
