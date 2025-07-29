// utils/dropdown-utils.tsx
import React from "react";
import { DataTableColumn } from "../types";
import { DropdownOption, DropdownCell } from "../cell-renderers";
import DropdownCellEditor from "../components/DropdownCellEditor";

export interface EnhancedDropdownConfig<TData> {
    // Basic configuration
    headingName: string | React.ReactNode;
    accessorKey: keyof TData | string;
    id?: string;

    // Dropdown options
    options: DropdownOption[];
    strictDropdown?: boolean;

    // Enhanced features
    displayStyle?: 'badge' | 'button' | 'minimal';
    size?: 'sm' | 'md' | 'lg';
    enableColorPicker?: boolean;
    enableIcons?: boolean;
    showCreateButton?: boolean;
    createButtonText?: string;

    // Callbacks
    onCreateOption?: (name: string, color?: string) => Promise<string>;
    onUpdateOption?: (id: string, updates: { name?: string; color?: string }) => Promise<void>;
    onDeleteOption?: (id: string) => Promise<void>;

    // State
    isLoading?: boolean;
    loadingText?: string;
    errorMessage?: string;

    // Standard column options
    enableSorting?: boolean;
    enableInlineEdit?: boolean;
    width?: string | number;
    className?: string;
    
    // Custom rendering options
    renderer?: (value: any, row: TData) => React.ReactNode;
    accessorFn?: (row: TData) => any;
}

/**
 * Creates an enhanced dropdown column with all the advanced features
 */
export function createEnhancedDropdownColumn<TData extends object>(
    config: EnhancedDropdownConfig<TData>
): DataTableColumn<TData> {
    const columnDef: DataTableColumn<TData> = {
        headingName: config.headingName,
        type: "Dropdown",
        accessorKey: config.accessorKey,
        id: config.id || String(config.accessorKey),
        enableSorting: config.enableSorting ?? true,
        enableInlineEdit: config.enableInlineEdit ?? true,
        width: config.width,
        className: config.className,
        
        // Custom accessor function if provided
        ...(config.accessorFn && { accessorFn: config.accessorFn }),
        
        // Add cell renderer that handles the dropdown display
        cell: ({ getValue, row }: { getValue: () => any; row: { original: TData } }) => {
            const value = getValue();
            
            // If a custom renderer is provided, use it
            if (config.renderer) {
                return config.renderer(value, row.original);
            }
            
            // Otherwise use the default dropdown cell rendering
            const dropdownOptions = config.options;
            const option = dropdownOptions.find(opt => opt.value === value);
            
            if (!option) {
                return 'No Value';
            }
            
            // Return based on the display style and column type
            const displayStyle = config.displayStyle || 'badge';
            const columnId = config.id || String(config.accessorKey);
            const isPriority = columnId === 'priority';
            
            // Always use button style for both status and priority
            return (
                <div
                    className={`inline-flex items-center gap-2 px-2 py-1 text-xs rounded-md font-medium border transition-all duration-200`}
                    style={{
                        backgroundColor: option.color ? `${option.color}20` : '#f3f4f6',
                        color: option.color || '#374151',
                        borderColor: option.color ? `${option.color}40` : '#d1d5db'
                    }}
                >
                    {isPriority ? (
                        // Flag icon for priority
                        <svg 
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={option.color || '#9ca3af'}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                            <line x1="4" y1="22" x2="4" y2="15"></line>
                        </svg>
                    ) : (
                        // Dot for status
                        <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: option.color || '#9ca3af' }}
                        />
                    )}
                    <span>{option.label}</span>
                </div>
            );
            
            // No more styles to handle
        },

        // Enhanced meta configuration
        meta: {
            dropdownOptions: config.options,
            strictDropdown: config.strictDropdown ?? true,
            displayStyle: config.displayStyle ?? 'badge',
            size: config.size ?? 'md',
            enableColorPicker: config.enableColorPicker ?? false,
            enableIcons: config.enableIcons ?? false,
            showCreateButton: config.showCreateButton ?? false,
            createButtonText: config.createButtonText ?? "Create & Select",
            onCreateOption: config.onCreateOption,
            onUpdateOption: config.onUpdateOption,
            onDeleteOption: config.onDeleteOption,
            isLoading: config.isLoading ?? false,
            loadingText: config.loadingText ?? "Loading...",
            errorMessage: config.errorMessage,
        },

        // Custom inline cell editor 
        inlineCellEditor: (props: {
            value: any;
            onSave: (newValue: any) => void;
            onCancel: () => void;
            columnDef?: any;
            rowData?: any;
        }) => (
            <DropdownCellEditor
                value={props.value}
                options={config.options}
                onSave={props.onSave}
                onCancel={props.onCancel}
                strictDropdown={config.strictDropdown ?? true}
                enableColorPicker={config.enableColorPicker ?? false}
                enableIcons={config.enableIcons ?? false}
                showCreateButton={config.showCreateButton ?? false}
                createButtonText={config.createButtonText ?? "Create & Select"}
                onCreateOption={config.onCreateOption}
                onUpdateOption={config.onUpdateOption}
                onDeleteOption={config.onDeleteOption}
                isLoading={config.isLoading ?? false}
                loadingText={config.loadingText ?? "Loading..."}
                errorMessage={config.errorMessage}
                displayStyle={config.displayStyle ?? 'badge'}
                size={config.size ?? 'md'}
                rowData={props.rowData}
            />
        ),
    };
    
    return columnDef;
}

/**
 * Helper function to generate unique colors for new dropdown options
 */
export function generateUniqueDropdownColor(existingColors: string[]): string {
    const colorPalette = [
        '#93c5fd', // Light blue
        '#fcd34d', // Light yellow  
        '#86efac', // Light green
        '#f9a8d4', // Light pink
        '#c4b5fd', // Light purple
        '#a5b4fc', // Lavender
        '#fdba74', // Light orange
        '#67e8f9', // Light teal
        '#d8b4fe', // Light violet
        '#f87171', // Light red
        '#fde68a', // Light gold
        '#6ee7b7', // Mint
    ];

    // Find an unused color from the palette
    const unusedColor = colorPalette.find(color => !existingColors.includes(color));
    return unusedColor || '#93c5fd'; // Default to light blue if all colors are used
}

/**
 * Creates standard status dropdown options
 */
export function createStatusDropdownOptions(): DropdownOption[] {
    return [
        { value: "todo", label: "To Do", color: "#93c5fd" },
        { value: "in_progress", label: "In Progress", color: "#fcd34d" },
        { value: "review", label: "In Review", color: "#f9a8d4" },
        { value: "done", label: "Done", color: "#86efac" },
    ];
}

/**
 * Creates standard priority dropdown options
 */
export function createPriorityDropdownOptions(): DropdownOption[] {
    return [
        { value: "low", label: "Low", color: "#6b7280" },
        { value: "medium", label: "Medium", color: "#3b82f6" },
        { value: "high", label: "High", color: "#f59e0b" },
        { value: "urgent", label: "Urgent", color: "#ef4444" },
    ];
}