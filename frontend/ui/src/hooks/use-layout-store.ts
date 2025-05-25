import { create } from "zustand";
import type { Breakpoint, CustomLayouts, LayoutItemWithNested } from "@incmix/ui/dashboard";

import type { Layout } from "@incmix/react-grid-layout";
import { presetLayouts } from "@incmix/ui/dashboard";
import {
  addGroupToLayouts,
  debugComponentNames,
  getNextGroupId,
} from "@utils";


interface LayoutState {
  defaultLayouts: CustomLayouts
  activePresetId: string
  applyPreset: (presetId?: string) => void
  applyTemplates: (mainLayouts?: CustomLayouts, templateId?: string) => void
  setDefaultLayouts: (layouts: CustomLayouts) => void
  handleLayoutChange: (_layout: any, allLayouts: any) => void
  handleNestedLayoutChange: (nestedLayout: Layout, itemKey: string) => void
  addNewGroup: () => string
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
    const { defaultLayouts } = get();
    console.log("handleLayoutChange defaultLayouts", defaultLayouts);
    // Debug the current layouts
    // debugComponentNames(
    //   defaultLayouts,
    //   "current layouts in handleLayoutChange",
    // );

    // Debug the incoming layouts
    // debugComponentNames(allLayouts, "incoming layouts in handleLayoutChange");

    // Create a deep copy of the current layouts to avoid reference issues
    const updatedLayouts = JSON.parse(JSON.stringify(defaultLayouts));


    // For each breakpoint, update the positions while preserving nested layouts and componentName
    Object.keys(allLayouts).forEach((breakpoint) => {
      const breakpointKey = breakpoint as Breakpoint;

      if (updatedLayouts[breakpointKey] && allLayouts[breakpointKey]) {
        // For each item in the new layouts
        allLayouts[breakpointKey].forEach((newItem: Layout) => {
          // Find the corresponding item in the current layouts
          const existingItemIndex = updatedLayouts[breakpointKey].findIndex(
            (item) => item.i === newItem.i,
          );

          if (existingItemIndex !== -1) {
            // Get the existing item
            const existingItem =
              updatedLayouts[breakpointKey][existingItemIndex];

            // Check if this item has nested layouts
            if (existingItem.layouts && existingItem.layouts.length > 0) {
              // We need to preserve the componentName for each nested layout item

              // Create a deep copy of the existing nested layouts to preserve all properties
              const preservedNestedLayouts = JSON.parse(
                JSON.stringify(existingItem.layouts),
              );

              // console.log(
              //   `Preserving nested layouts for ${existingItem.i}:`,
              //   preservedNestedLayouts.map((item) => ({
              //     id: item.i,
              //     componentName: item.componentName || "undefined",
              //   })),
              // );

              updatedLayouts[breakpointKey][existingItemIndex] = {
                ...newItem,
                layouts: preservedNestedLayouts,
                // Do not include componentName for parent items with layouts
              };

              // Log the updated item to verify
              console.log(
                `Updated item ${newItem.i} with preserved nested layouts:`,
                updatedLayouts[breakpointKey][existingItemIndex].layouts.map(
                  (item) => ({
                    id: item.i,
                    componentName: item.componentName || "undefined",
                  }),
                ),
              );
            } else {
              // This is a regular item without nested layouts - preserve componentName
              updatedLayouts[breakpointKey][existingItemIndex] = {
                ...newItem,
                componentName: existingItem.componentName,
              };
            }
          } else {
            // This is a new item, add it to the layouts
            updatedLayouts[breakpointKey].push({
              ...newItem,
              componentName:
                (defaultLayouts[breakpointKey].find(i => i.i === newItem.i)?.componentName) ??
                undefined,
            })
          }
        });

        // Remove any items that no longer exist in the new layouts
        updatedLayouts[breakpointKey] = updatedLayouts[breakpointKey].filter(
          (item) => {
            return allLayouts[breakpointKey].some(
              (newItem: Layout) => newItem.i === item.i,
            );
          },
        );
      }
    });

    // Debug the updated layouts before setting
    // debugComponentNames(
    //   updatedLayouts,
    //   "updated layouts in handleLayoutChange",
    // );
    // Update the store with the merged layouts
    set({ defaultLayouts: updatedLayouts });
  },

  handleNestedLayoutChange: (nestedLayout, itemKey) => {
    set((state) => {
      const updatedLayouts = { ...state.defaultLayouts };

      // Update the nested layouts for each breakpoint
      const breakpoints = Object.keys(updatedLayouts) as Breakpoint[];
      breakpoints.forEach((breakpoint) => {
        if (updatedLayouts[breakpoint]) {
          updatedLayouts[breakpoint] = updatedLayouts[breakpoint].map(
            (item) => {
              if (item.i === itemKey) {
                return {
                  ...item,
                  layouts: [...nestedLayout],
                };
              }
              return item;
            },
          );
        }
      });

      return { defaultLayouts: updatedLayouts };
    });
  },
  addNewGroup: () => {
    const currentLayouts = get().defaultLayouts
    const newGroupId = getNextGroupId(currentLayouts)
    set((state) => {
      const updatedLayouts = addGroupToLayouts(currentLayouts, newGroupId);

      console.log(`Created new group with ID: ${newGroupId}`);

      return { defaultLayouts: updatedLayouts };
    });

    return newGroupId;
  },
}));
