import { create } from "zustand"
import type { CustomLayouts, LayoutItemWithNested } from "@incmix/ui/dashboard"
import type { Layout } from "@incmix/react-grid-layout"
import { presetLayouts } from "@incmix/ui/dashboard"
import { ensureNestedLayoutsInAllBreakpoints, validateLayouts } from "../utils/validate-layouts"
import { Breakpoint } from "@/utils"

export interface LayoutPreset {
  id: string
  name: string
  description: string
  image: string
  mainLayouts: CustomLayouts
}

interface LayoutState {
  // Layout state
  defaultLayouts: CustomLayouts

  // Preset state
  activePresetId: string

  // Actions
  applyPreset: (presetId?: string) => void
  applyTemplates: (mainLayouts?: CustomLayouts, templateId?: string) => void
  setDefaultLayouts: (layouts: CustomLayouts) => void
  handleLayoutChange: (_layout: any, allLayouts: any) => void
  handleNestedLayoutChange: (nestedLayout: Layout, itemKey: string) => void
  // updateStaticProperty: (isEditing: boolean) => void
}

// Validate the preset layouts before using them
const validationResult = validateLayouts(presetLayouts[0].mainLayouts)
if (!validationResult.isValid) {
  console.error("Preset layouts validation failed:", validationResult.errors)
}


export const useLayoutStore = create<LayoutState>((set, get) => ({
  // Initialize with validated preset layouts
  defaultLayouts: presetLayouts[0].mainLayouts,
  activePresetId: presetLayouts[0].id,

  applyPreset: (presetId) => {
    const preset = presetLayouts.find((p) => p.id === presetId)
    if (!preset) return

    // Validate and ensure nested layouts before applying
    const validationResult = validateLayouts(preset.mainLayouts)
    if (!validationResult.isValid) {
      console.error(`Preset ${presetId} layouts validation failed:`, validationResult.errors)
    }

    const validatedLayouts = ensureNestedLayoutsInAllBreakpoints(preset.mainLayouts)

    set({
      defaultLayouts: validatedLayouts,
      activePresetId: preset.id,
    })
  },

  applyTemplates: (mainLayouts, templateId) => {
    // Use existing layouts as fallbacks if new ones aren't provided
    const { defaultLayouts } = get()

    if (mainLayouts) {
      // Validate and ensure nested layouts before applying
      const validationResult = validateLayouts(mainLayouts)
      if (!validationResult.isValid) {
        console.error(`Template ${templateId} layouts validation failed:`, validationResult.errors)
      }

      const validatedLayouts = ensureNestedLayoutsInAllBreakpoints(mainLayouts)

      set({
        defaultLayouts: validatedLayouts,
        activePresetId: templateId,
      })
    } else {
      set({
        defaultLayouts,
        activePresetId: templateId,
      })
    }
  },

  setDefaultLayouts: (layouts) => {
    set({ defaultLayouts: layouts });
  },

  handleLayoutChange: (_layout, allLayouts) => {
    const { defaultLayouts } = get()

    const updatedLayouts = JSON.parse(JSON.stringify(defaultLayouts))

    Object.keys(allLayouts).forEach((breakpoint) => {
      const breakpointKey = breakpoint as Breakpoint

      if (updatedLayouts[breakpointKey] && allLayouts[breakpointKey]) {
        allLayouts[breakpointKey].forEach((newItem: LayoutItemWithNested) => {
          const existingItemIndex = updatedLayouts[breakpointKey].findIndex((item: LayoutItemWithNested) => item.i === newItem.i)

          if (existingItemIndex !== -1) {
            // Get the existing item
            const existingItem = updatedLayouts[breakpointKey][existingItemIndex]

            // Preserve the nested layouts if they exist
            const preservedLayouts = existingItem.layouts

            // Update the item with the new position/size data
            updatedLayouts[breakpointKey][existingItemIndex] = {
              ...newItem,
              layouts: preservedLayouts,
            }
          } else {
            updatedLayouts[breakpointKey].push(newItem)
          }
        })

        updatedLayouts[breakpointKey] = updatedLayouts[breakpointKey].filter((item: LayoutItemWithNested) => {
          return allLayouts[breakpointKey].some((newItem: LayoutItemWithNested) => newItem.i === item.i)
        })
      }
    })

    // Log to verify nested layouts are preserved
    // const gridItems = updatedLayouts.lg.filter((item: LayoutItemWithNested) => item.i.startsWith("grid-"))
    // console.log(
    //   "After merging layouts - Grid items with nested layouts:",
    //   gridItems.map((item: LayoutItemWithNested) => ({
    //     id: item.i,
    //     hasNestedLayouts: item.layouts && item.layouts.length > 0,
    //     nestedCount: item.layouts ? item.layouts.length : 0,
    //   })),
    // )

    set({ defaultLayouts: updatedLayouts })
  },

  handleNestedLayoutChange: (nestedLayout, itemKey) => {
    // Update the nested layouts within the main layouts
    set((state) => {
      const updatedLayouts = { ...state.defaultLayouts }

      // Update the nested layouts for each breakpoint
      const breakpoints = Object.keys(updatedLayouts) as Breakpoint[]
      breakpoints.forEach((breakpoint) => {
        if (updatedLayouts[breakpoint]) {
          updatedLayouts[breakpoint] = updatedLayouts[breakpoint].map((item) => {
            if (item.i === itemKey) {
              return {
                ...item,
                layouts: nestedLayout,
              }
            }
            return item
          })
        }
      })

      return { defaultLayouts: updatedLayouts }
    })
  },


  updateStaticProperty: (isEditing) => {
    console.log(`updateStaticProperty called with isEditing=${isEditing}`)
  
    const { defaultLayouts } = get()
  
    if (!defaultLayouts) {
      console.error("defaultLayouts is undefined in updateStaticProperty")
      return
    }
  
    // Explicitly initialize with all breakpoint keys
    const updatedDefaultLayouts: CustomLayouts = {
      lg: [],
      md: [],
      sm: [],
      xs: [],
      xxs: []
    };
    
    Object.entries(defaultLayouts).forEach(([breakpoint, mainLayouts]) => {
      console.log(`Updating static property for breakpoint ${breakpoint} with layouts=${mainLayouts[0].layouts}`)
  
      if(mainLayouts){
        updatedDefaultLayouts[breakpoint as keyof CustomLayouts] = mainLayouts.map((item) => {
          if(item?.layouts){
            return {
              ...item,
              static: !isEditing,
              layouts: item.layouts.map((nestedItem) => ({
                ...nestedItem,
                static: !isEditing,
              }))
            }
          }
          return {
            ...item,
            static: !isEditing,
          }
        });
      }
    });
    
    console.log(updatedDefaultLayouts);
  
    set({
      defaultLayouts: updatedDefaultLayouts,
    })
  
    console.log("Updated defaultLayouts in store")
  }
}))
