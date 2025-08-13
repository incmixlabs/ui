import React from 'react';
import { Select } from '@base';
import { LucideIcon } from 'lucide-react';

// Define interfaces for the component
export interface LabelOption {
  id: string;
  name: string;
  /** 'status' for workflow states, 'priority' for task priorities */
  type: 'status' | 'priority';
  color?: string;
  description?: string;
  order?: number;
}

export interface LabelDropdownSelectorProps {
  // Data props
  options: LabelOption[];
  value: string;
  onValueChange: (value: string) => void;

  // Visual customization
  icon?: LucideIcon;
  renderIcon?: (option: LabelOption) => React.ReactNode;
  showColorDot?: boolean;

  // UI props
  className?: string;
  triggerClassName?: string;
  placeholder?: string;
  disabled?: boolean;

  // Label text customization
  getOptionLabel?: (option: LabelOption) => string;
  valueLabel?: string; // Optional custom label for the selected value
}

export function LabelDropdownSelector({
  options,
  value,
  onValueChange,
  icon: Icon,
  renderIcon,
  showColorDot = true,
  className = '',
  triggerClassName = '',
  placeholder = 'Select...',
  disabled = false,
  getOptionLabel,
  valueLabel,
}: LabelDropdownSelectorProps) {
  // Find the currently selected option
  const selectedOption = options.find(option => option.id === value);

  // Default icon rendering if no custom renderIcon is provided
  const defaultRenderIcon = (option: LabelOption) => {
    if (Icon) {
      return <Icon className="h-4 w-4 flex-shrink-0" style={{ color: option.color }} />;
    }
    return null;
  };

  // Use custom or default icon renderer
  const finalRenderIcon = renderIcon || defaultRenderIcon;

  // Function to get the display label for an option
  const getLabel = (option: LabelOption) => {
    if (getOptionLabel) {
      return getOptionLabel(option);
    }
    return option.name;
  };

  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <Select.Trigger
        className={`flex h-9 px-4 py-2 min-w-[140px] rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${triggerClassName} ${className}`}
      >
        {selectedOption ? (
          <div className="flex items-center gap-2">
            {showColorDot && selectedOption.color && (
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: selectedOption.color, minWidth: '0.75rem' }} />
            )}
            {finalRenderIcon(selectedOption)}
            <span className="text-sm font-medium">
              {valueLabel || getLabel(selectedOption)}
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-500">{placeholder}</span>
        )}
      </Select.Trigger>

      <Select.Content>
        {options.map((option) => (
          <Select.Item key={option.id} value={option.id}>
            <div className="flex items-center gap-2">
              {showColorDot && option.color && (
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: option.color, minWidth: '0.75rem' }} />
              )}
              {finalRenderIcon(option)}
              <span>{getLabel(option)}</span>
            </div>
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
