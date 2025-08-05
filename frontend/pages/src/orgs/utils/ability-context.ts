import { createContextualCan } from "@casl/react"
import { createAbilityFromPermissions } from "@incmix/utils/casl"
import type { AppAbility } from "@incmix/utils/types"
import { createContext } from "react"

const emptyAbility = createAbilityFromPermissions([])
export const AbilityContext = createContext<AppAbility>(emptyAbility)
export const Can = createContextualCan(AbilityContext.Consumer)
