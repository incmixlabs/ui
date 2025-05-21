import { create } from "zustand"
import type { CustomLayouts, LayoutItemWithNested } from "@incmix/ui/dashboard"
import type { Layout } from "@incmix/react-grid-layout"
import { presetLayouts } from "@incmix/ui/dashboard"
import { Breakpoint } from "@/utils"

export interface LayoutPreset {
  id: string
  name: string
  description: string
  image: string
  mainLayouts: CustomLayouts
}

interface LayoutState {
  defaultLayouts: CustomLayouts
  activePresetId: string
  applyPreset: (presetId?: string) => void
  applyTemplates: (mainLayouts?: CustomLayouts, templateId?: string) => void
  setDefaultLayouts: (layouts: CustomLayouts) => void
  handleLayoutChange: (_layout: any, allLayouts: any) => void
  handleNestedLayoutChange: (nestedLayout: Layout, itemKey: string) => void
}



export const useLayoutStore = create<LayoutState>((set, get) => ({
  // Initialize with validated preset layouts
  defaultLayouts: presetLayouts[0].mainLayouts,
  activePresetId: presetLayouts[0].id,

  applyPreset: (presetId) => {
    const preset = presetLayouts.find((p) => p.id === presetId);
    if (!preset) return;

    set({
      defaultLayouts: preset.mainLayouts,
      activePresetId: preset.id,
    });
  },

  applyTemplates: (mainLayouts, templateId) => {
    // Use existing layouts as fallbacks if new ones aren't provided
    const { defaultLayouts } = get();

    set({
      defaultLayouts: mainLayouts || defaultLayouts,
      activePresetId: templateId,
    });
  },

  setDefaultLayouts: (layouts) => {
    set({ defaultLayouts: layouts });
  },

  handleLayoutChange: (_layout, allLayouts) => {
    const { defaultLayouts } = get()

    const updatedLayouts = structuredClone(defaultLayouts)

    Object.keys(allLayouts).forEach((breakpoint) => {
      const breakpointKey = breakpoint as Breakpoint

      if (updatedLayouts[breakpointKey] && allLayouts[breakpointKey]) {
        allLayouts[breakpointKey].forEach((newItem: LayoutItemWithNested) => {
          const existingItemIndex = updatedLayouts[breakpointKey].findIndex((item: LayoutItemWithNested) => item.i === newItem.i)

          if (existingItemIndex !== -1) {
            const existingItem = updatedLayouts[breakpointKey][existingItemIndex]

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


    set({ defaultLayouts: updatedLayouts })
  },

  handleNestedLayoutChange: (nestedLayout, itemKey) => {
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
                layouts: [...nestedLayout],
              }
            }
            return item
          })
        }
      })

      return { defaultLayouts: updatedLayouts }
    })
  },


}))
