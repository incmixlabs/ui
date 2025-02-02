import { RemoveScroll } from 'react-remove-scroll';
import { Sheet } from "@components/sheet"
import "@radix-ui/themes/src/components/theme-panel.css";
import { useThemeStore } from "@incmix/store/local"
import {
  ThemePanel as RadixThemePanel
} from "@radix-ui/themes/src/components//theme-panel.js"


export const ThemePanel = () => {
  const {setTheme, system, isSystem} = useThemeStore()

  return (
     <Sheet>
       <RadixThemePanel
            className={RemoveScroll.classNames.zeroRight}

            onAppearanceChange={(newTheme: 'light' | 'dark' | 'system'
            ) => {
              const newThemeMatchesSystem = newTheme === 'system';
              if (newThemeMatchesSystem !== system) {
                isSystem(!system);
              }
              if (newThemeMatchesSystem) {
                setTheme(newTheme as 'light' | 'dark');
              }
            }}
            style={{
              top: 'var(--header-height)',
              maxHeight: 'calc(100vh - var(--header-height) - var(--space-4) * 2)',
            }}
      />
    </Sheet>
  )
}
