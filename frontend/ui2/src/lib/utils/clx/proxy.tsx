import { createClassed } from "./classed"
import type { ClassedFunctionProxy } from "./types"

export const classedProxy = createClassed().classed as ClassedFunctionProxy
