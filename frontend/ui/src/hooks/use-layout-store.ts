import { create } from 'zustand'
import type { CustomLayouts } from '@incmix/ui/dashboard'
import type { Layout } from 'react-grid-layout'
import { initialLayouts, presetLayouts } from '@incmix/ui/dashboard'

export interface LayoutPreset {
  id: string
  name: string
  description: string
  image: string
  mainLayouts: CustomLayouts
  nestedLayouts: Record<string, Layout[]>
}



interface LayoutState {
  // Layout state
  defaultLayouts: CustomLayouts
  nestedLayouts: Record<string, Layout[]>
  
  // Preset state
  activePresetId: string
  
  // Actions
  applyPreset: (presetId?: string) => void
  applyTemplates: (mainLayouts?: CustomLayouts,nestedLayouts?: Record<string, Layout[]>,templateId?: string) => void
  setDefaultLayouts: (layouts: CustomLayouts) => void
  setNestedLayouts: (layouts: Record<string, Layout[]>) => void
  handleLayoutChange: (_layout: any, allLayouts: any) => void
  handleNestedLayoutChange: (nestedLayout: Layout[], itemKey: string) => void

  updateStaticProperty: (isEditing: boolean) => void
}

export const useLayoutStore = create<LayoutState>((set, get) => ({
  defaultLayouts: presetLayouts[0].mainLayouts,
  nestedLayouts: presetLayouts[0].nestedLayouts,
  activePresetId: presetLayouts[0].id,
  
  applyPreset: (presetId) => {
    const preset = presetLayouts.find(p => p.id === presetId);
    if (!preset) return;
    
    set({
      defaultLayouts: preset.mainLayouts,
      nestedLayouts: preset.nestedLayouts,
      activePresetId: preset.id,
    });
  },
  applyTemplates: (mainLayouts,nestedLayouts,templateId) => {
    set({
      defaultLayouts: mainLayouts,
      nestedLayouts: nestedLayouts,
      activePresetId: templateId,
    });
  },
  setDefaultLayouts: (layouts) => {
    set({ defaultLayouts: layouts });
  },
  
  setNestedLayouts: (layouts) => {
    set({ nestedLayouts: layouts });
  },
  
  handleLayoutChange: (_layout, allLayouts) => {
    console.log("All_Layouts",allLayouts);

    const { defaultLayouts } = get();
    const hasChanged = JSON.stringify(allLayouts) !== JSON.stringify(defaultLayouts);
    if (hasChanged) {
      set({ defaultLayouts: allLayouts });
    }
  },
  
  handleNestedLayoutChange: (nestedLayout, itemKey) => {
    console.log("Nested Layout",nestedLayout);
    
    set((state) => ({
      nestedLayouts: {
        ...state.nestedLayouts,
        [itemKey]: nestedLayout,
      },
    }));
  },
  updateStaticProperty: (isEditing) => {
    const { defaultLayouts, nestedLayouts } = get();
    
    const updatedDefaultLayouts: CustomLayouts = {};
    Object.entries(defaultLayouts).forEach(([breakpoint, layouts]) => {
      updatedDefaultLayouts[breakpoint] = layouts.map(item => ({
        ...item,
        static: !isEditing,
      }));
    });
    
    const updatedNestedLayouts: Record<string, Layout[]> = {};
    Object.entries(nestedLayouts).forEach(([key, layouts]) => {
      updatedNestedLayouts[key] = layouts.map(item => ({
        ...item,
        static: !isEditing,
      }));
    });
    
    set({
      defaultLayouts: updatedDefaultLayouts,
      nestedLayouts: updatedNestedLayouts,
    });
  }
}));