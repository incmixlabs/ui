import { createContextualCan } from "@casl/react"
import { createAbility } from "@jsprtmnn/utils/casl"
import type { AppAbility } from "@jsprtmnn/utils/types"
import { createContext } from "react"

const emptyAbility = createAbility([])
export const AbilityContext = createContext<AppAbility>(emptyAbility)
export const Can = createContextualCan(AbilityContext.Consumer)
