import { create } from "zustand";
import type { Breakpoint, CustomLayouts } from "@incmix/ui/dashboard";

import type { Layout } from "@incmix/react-grid-layout";
import { presetLayouts } from "../data";
import { addGroupToLayouts, getNextGroupId } from "../utils";

interface LayoutState {
  defaultLayouts: CustomLayouts;
  activePresetId: string;
  applyPreset: (presetId?: string) => void;
  applyTemplates: (mainLayouts?: CustomLayouts, templateId?: string) => void;
  setDefaultLayouts: (layouts: CustomLayouts) => void;
  handleLayoutChange: (_layout: any, allLayouts: any) => void;
  handleNestedLayoutChange: (nestedLayout: Layout[], itemKey: string) => void;
  addNewGroup: () => string;
}

export const useLayoutStore = create<LayoutState>((set, get) => {
  // Get the appearance store state directly without using the hook
  const presets = presetLayouts();
  const defaultPreset = presets.find(preset => preset.id === "default") || presets[0];

  return {
    defaultLayouts: defaultPreset.mainLayouts,
    activePresetId: defaultPreset.id,

    applyPreset: (presetId?: string) => {
      const preset = presets.find((p: any) => p.id === presetId);
      if (!preset) return;

      set({
        defaultLayouts: preset.mainLayouts,
        activePresetId: preset.id,
      });
    },

    applyTemplates: (mainLayouts?: CustomLayouts, templateId?: string) => {
      const { defaultLayouts } = get();

      set({
        defaultLayouts: mainLayouts || defaultLayouts,
        activePresetId: templateId,
      });
    },

    setDefaultLayouts: (layouts: CustomLayouts) => {
      set({ defaultLayouts: layouts });
    },

    handleLayoutChange: (_layout: Layout[], allLayouts: CustomLayouts) => {
      const { defaultLayouts } = get();

      const updatedLayouts = JSON.parse(JSON.stringify(defaultLayouts));

      Object.keys(allLayouts).forEach((breakpoint) => {
        const breakpointKey = breakpoint as Breakpoint;

        if (updatedLayouts[breakpointKey] && allLayouts[breakpointKey]) {
          allLayouts[breakpointKey].forEach((newItem: Layout) => {
            const existingItemIndex = updatedLayouts[breakpointKey].findIndex(
              (item: { i: string }) => item.i === newItem.i,
            );
            // console.log("existingItemIndex", existingItemIndex);

            if (existingItemIndex !== -1) {
            // Get the existing item
              const existingItem =
                updatedLayouts[breakpointKey][existingItemIndex];
              // console.log("existingItem", existingItem);

              if (existingItem.layouts && existingItem.layouts.length > 0) {
                const preservedNestedLayouts = JSON.parse(
                  JSON.stringify(existingItem.layouts),
                );

                updatedLayouts[breakpointKey][existingItemIndex] = {
                  ...newItem,
                  layouts: preservedNestedLayouts,
                };
              } else {
              // This is a regular item without nested layouts - preserve componentName
                updatedLayouts[breakpointKey][existingItemIndex] = {
                  ...newItem,
                  componentName: existingItem.componentName,
                };
              }
            } else {
              updatedLayouts[breakpointKey].push({
                ...newItem,
                componentName:
                  defaultLayouts[breakpointKey].find((i: { i: string }) => i.i === newItem.i)
                    ?.componentName ?? undefined,
              });
            }
          });

          // Remove any items that no longer exist in the new layouts
          updatedLayouts[breakpointKey] = updatedLayouts[breakpointKey].filter(
            (item: Layout) => {
              return allLayouts[breakpointKey].some(
                (newItem: Layout) => newItem.i === item.i,
              );
            },
          );
        }
      });

      set({ defaultLayouts: updatedLayouts });
    },

    handleNestedLayoutChange: (nestedLayout: Layout[], itemKey: string) => {
      set((state) => {
        const updatedLayouts = { ...state.defaultLayouts };

        const breakpoints = Object.keys(updatedLayouts) as Breakpoint[];
        breakpoints.forEach((breakpoint) => {
          if (updatedLayouts[breakpoint]) {
            updatedLayouts[breakpoint] = updatedLayouts[breakpoint].map(
              (item: Layout) => {
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
    addNewGroup: (): string => {
      const currentLayouts = get().defaultLayouts;
      const newGroupId = getNextGroupId(currentLayouts);
      set((state) => {
        const updatedLayouts = addGroupToLayouts(currentLayouts, newGroupId);

        // console.log(`Created new group with ID: ${newGroupId}`);

        return { defaultLayouts: updatedLayouts };
      });

      return newGroupId;
    },
  // Add a comma here to fix the syntax error
  }
});
