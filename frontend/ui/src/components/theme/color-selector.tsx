import { FC } from 'react';
import { Grid, Tooltip } from '@radix-ui/themes';
import { themePropDefs } from '@radix-ui/themes/src/components/theme.props.js';
import { capitalize } from '@/utils/strings';
import { useThemeStore } from '@/store/theme';

export const ColorSelector:FC = () => {
  return (
    <Grid columns="10" gap="2" mt="3" role="group" aria-labelledby="accent-color-title">
      {themePropDefs.accentColor.values.map((color) => (
        <label
          key={color}
          className="rt-ThemePanelSwatch"
          style={{ backgroundColor: `var(--${color}-9)` }}
        >
          <Tooltip
            content={`${capitalize(color)}${
              accentColor === 'gray' && resolvedGrayColor !== 'gray'
                ? ` (${capitalize(resolvedGrayColor)})`
                : ''
            }`}
          >
            <input
              className="rt-ThemePanelSwatchInput"
              type="radio"
              name="accentColor"
              value={color}
              checked={accentColor === color}
              onChange={(event) =>
                onAccentColorChange(event.target.value as typeof accentColor)
              }
            />
          </Tooltip>
        </label>
      ))}
    </Grid>
  );
}
