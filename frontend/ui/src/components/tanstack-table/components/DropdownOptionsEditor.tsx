import React, { useState } from 'react';
import { Box, Flex, Text, Button } from '@radix-ui/themes';
import { DropdownOption } from '../cell-renderers';
import ColorPicker from './ColorPicker';

interface DropdownOptionsEditorProps {
  options: DropdownOption[];
  onChange: (options: DropdownOption[]) => void;
  valuesInUse?: string[]; // Values currently used in the table
}

const DropdownOptionsEditor: React.FC<DropdownOptionsEditorProps> = ({ 
  options, 
  onChange,
  valuesInUse = []
}) => {
  
  const [newOption, setNewOption] = useState<DropdownOption>({
    label: '',
    value: '',
    color: 'var(--blue-1)'
  });
  
  // State for validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Add a new option to the list
  const handleAddOption = () => {
    // Validate the new option
    if (!newOption.label.trim()) {
      setErrors({ label: 'Label is required' });
      return;
    }
    
    // Check if the value already exists
    const valueExists = options.some(opt => opt.value === newOption.value);
    if (valueExists) {
      setErrors({ label: 'This option already exists' });
      return;
    }
    
    // Add the new option
    const updatedOptions = [...options, newOption];
    onChange(updatedOptions);
    
    // Reset the new option form
    setNewOption({
      label: '',
      value: '',
      color: 'var(--blue-5)'
    });
    
    // Clear any errors
    setErrors({});
  };

  // Update an existing option
  const handleUpdateOption = (index: number, field: keyof DropdownOption, value: string) => {
    // Create a deep copy to ensure we don't mutate the original array
    const updatedOptions = options.map(opt => ({ ...opt }));
    
    if (field === 'label') {
      // When label changes, also update the value (internal ID) to match
      const newValue = value.toLowerCase().replace(/\s+/g, '_');
      
      // Don't allow editing the value if it's in use in the table
      const isValueInUse = valuesInUse.includes(updatedOptions[index].value);
      
      if (!isValueInUse) {
        // Only update the value if it's not in use
        updatedOptions[index] = {
          ...updatedOptions[index],
          label: value,
          value: newValue
        };
      } else {
        // If the value is in use, just update the label
        updatedOptions[index] = {
          ...updatedOptions[index],
          label: value
        };
      }
    } else {
      // For other fields (color), just update that field
      updatedOptions[index] = {
        ...updatedOptions[index],
        [field]: value
      };
    }
    
    // Log the update for debugging
    console.log(`Updated option at index ${index}, field: ${field}, value: ${value}`);
    console.log('New options:', updatedOptions);
    
    // Notify parent of the change with the completely new array
    onChange(updatedOptions);
  };

  // Delete an option
  const handleDeleteOption = (index: number) => {
    // Check if this option's value is currently in use
    const optionValue = options[index].value;
    const isValueInUse = valuesInUse.includes(optionValue);
    
    if (isValueInUse) {
      // Don't allow deletion of options in use
      alert('Cannot delete this option because it is currently in use in the table.');
      return;
    }
    
    const updatedOptions = options.filter((_, i) => i !== index);
    onChange(updatedOptions);
  };

  return (
    <Box className="mt-4">
      {/* Section title */}
      <Text size="2" weight="bold" className="mb-3">
        Drop down data:
      </Text>
      
      {/* Options list */}
      <Box className="space-y-3 relative z-0">
        {options.length === 0 ? (
          <Text size="2" color="gray">No options defined yet. Add some below.</Text>
        ) : (
          options.map((option, index) => {
            const isValueInUse = valuesInUse.includes(option.value);
            
            return (
              <Flex key={index} align="center" gap="2" className="relative w-full">
                <div className="min-w-[40px] flex items-center justify-center">
                  <ColorPicker 
                    color={option.color || 'var(--blue-1)'} 
                    onChange={(color) => handleUpdateOption(index, 'color', color)} 
                  />
                </div>
                
                <input
                  value={option.label}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    handleUpdateOption(index, 'label', e.target.value)
                  }
                  placeholder="Option Label"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
                
                {/* Delete button */}
                <Button 
                  color="gray" 
                  variant="soft"
                  disabled={isValueInUse}
                  onClick={() => handleDeleteOption(index)}
                  className="px-3 min-w-[50px]"
                >
                  Del
                </Button>
              </Flex>
            );
          })
        )}
      </Box>
      
      {/* Add new option section */}
      <Box className="mt-5">
        <Text size="2" weight="bold" className="mb-3">
          Add new Value:
        </Text>
        
        <Flex align="center" gap="2" className="relative w-full">
          <div className="min-w-[40px] flex items-center justify-center">
            <ColorPicker 
              color={newOption.color || 'var(--blue-1)'} 
              onChange={(color) => setNewOption({...newOption, color})}
            />
          </div>
          
          {/* Label input for new option */}
          <input
            value={newOption.label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const newLabel = e.target.value;
              const newValue = newLabel.toLowerCase().replace(/\s+/g, '_');
              setNewOption({
                ...newOption,
                label: newLabel,
                value: newValue
              });
              if (errors.label) setErrors({});
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Option Label"
          />
          
          {/* Add button */}
          <Button 
            onClick={handleAddOption}
            color="blue"
            className="px-3 min-w-[50px]"
          >
            add
          </Button>
        </Flex>
        
        {/* Error message */}
        {errors.label && (
          <Text size="1" color="red" className="mt-1">
            {errors.label}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default DropdownOptionsEditor;
