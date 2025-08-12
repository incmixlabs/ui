// File: components/DataTable/cellRenderers.tsx
import React, { ReactNode } from "react";

// Cell Renderer Components
export const TagCell: React.FC<{ value: string[] }> = ({ value }) => {
  if (!Array.isArray(value)) return <>{String(value)}</>;

  return (
    <div className="flex flex-wrap gap-1.5">
      {value.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center rounded-full bg-primary-50 dark:bg-primary-950/50 px-2 py-1 text-xs font-medium text-primary-700 dark:text-primary-300 ring-1 ring-inset ring-primary-700/10 dark:ring-primary-300/20"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export const StatusCell: React.FC<{
  value: string;
  statusMap?: Record<string, { color: string }>;
  defaultColor?: string;
}> = ({
  value,
  statusMap = {
    success: {
      color: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-950/50 dark:text-green-400 dark:ring-green-500/30"
    },
    failed: {
      color: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/50 dark:text-red-400 dark:ring-red-500/30"
    },
    processing: {
      color: "bg-yellow-50 text-yellow-700 ring-yellow-600/20 dark:bg-yellow-950/50 dark:text-yellow-400 dark:ring-yellow-500/30"
    },
    pending: {
      color: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-950/50 dark:text-blue-400 dark:ring-blue-500/30"
    },
    canceled: {
      color: "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-500/30"
    },
  },
  defaultColor = "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-500/30"
}) => {
  const status = String(value).toLowerCase();
  const statusStyle = statusMap[status] || { color: defaultColor };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize ${statusStyle.color}`}>
      {String(value)}
    </span>
  );
};

export const BooleanCell: React.FC<{ value: boolean }> = ({ value }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${
    value
      ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-950/50 dark:text-green-400 dark:ring-green-500/30'
      : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/50 dark:text-red-400 dark:ring-red-500/30'
  }`}>
    {value ? 'Yes' : 'No'}
  </span>
);

// Updated CurrencyCell to accept any format options
export const CurrencyCell: React.FC<{ value: number, options?: any }> = ({ value, options }) => (
  <span className="block text-left font-medium">
    {new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options
    }).format(value)}
  </span>
);

// Updated NumberCell to accept any format options
export const NumberCell: React.FC<{ value: number, options?: any }> = ({ value, options }) => (
  <span className="block text-left">
    {typeof options === 'object'
      ? new Intl.NumberFormat(undefined, options).format(value)
      : value.toLocaleString()}
  </span>
);

export const DateCell: React.FC<{ value: string | Date, format?: string }> = ({ value, format }) => {
  if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value as string)))) {
    const date = value instanceof Date ? value : new Date(value as string);

    // Default options
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    // Check if time is not midnight to determine if time was provided
    if (date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }

    // If a custom format is provided, use it
    if (format) {
      // This is a simplified format implementation
      return (
        <span className="font-mono text-sm text-gray-12">
          {format
            .replace('YYYY', date.getFullYear().toString())
            .replace('MM', (date.getMonth() + 1).toString().padStart(2, '0'))
            .replace('DD', date.getDate().toString().padStart(2, '0'))
            .replace('HH', date.getHours().toString().padStart(2, '0'))
            .replace('mm', date.getMinutes().toString().padStart(2, '0'))}
        </span>
      );
    }

    return (
      <span className="font-mono text-sm text-gray-12">
        {date.toLocaleString(undefined, options)}
      </span>
    );
  }
  return <>{String(value)}</>;
};

export const StringCell: React.FC<{ value: any }> = ({ value }) => (
  <div className="truncate max-w-[300px] text-left">
    {value !== null && value !== undefined ? String(value) : ''}
  </div>
);

// Helper function to get contrasting text color (black or white) based on background color
export function getContrastingTextColor(backgroundColor: string): string {
  // Convert hex to RGB
  const hex = backgroundColor.replace('#', '');
  let r = 0, g = 0, b = 0;
  
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  
  // Calculate contrast using YIQ method
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 128 ? 'var(--gray-1)' : 'var(--gray-12)';
}

// Helper function to adjust color brightness (for hover effects)
export function adjustColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Interface for dropdown options
export interface DropdownOption {
  value: string;
  label: string;
  color?: string;
  icon?: ReactNode;
}

// Enhanced Dropdown Cell Renderer with multiple display styles
export const DropdownCell: React.FC<{ 
  value: string;
  options?: DropdownOption[];
  displayStyle?: 'badge' | 'button' | 'minimal' | 'plain';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  isLoading?: boolean;
}> = ({ 
  value, 
  options = [], 
  displayStyle = 'badge',
  size = 'md',
  showIcon = false,
  isLoading = false
}) => {
  // Handle null/undefined values
  const safeValue = value || '';
  
  // Debug logging to understand what's happening
  console.log('DropdownCell Debug:', { value, safeValue, options, displayStyle });
  
  // Find the selected option with more robust matching
  const selectedOption = options.find(option => 
    option.value === safeValue || 
    option.value === value ||
    option.label === safeValue ||
    option.label === value
  );

  // If no option found, create a fallback that shows the actual value
  const finalOption = selectedOption || {
    value: safeValue,
    label: safeValue || 'No Value',
    color: 'var(--gray-1)'
  };

  console.log('DropdownCell Selected Option:', finalOption);

  if (!safeValue && options.length === 0) {
    return (
      <span className={`${size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3 py-1.5 text-sm' : 'px-2 py-1 text-xs'} text-gray-400 italic`}>
        No options
      </span>
    );
  }
  
  // Determine text color based on background color (if provided)
  const textColor = finalOption.color 
    ? getContrastingTextColor(finalOption.color)
    : 'var(--gray-12)';

  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={`inline-flex items-center gap-1 ${sizeClasses[size]} rounded-md bg-gray-12 text-gray-1`}>
        <div className="w-3 h-3 border border-gray-4 border-t-transparent rounded-full animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  // Badge style (original)
  if (displayStyle === 'badge') {
    const displayText = finalOption.label || value || 'No Value';
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full ${sizeClasses[size]} font-medium ring-1 ring-inset capitalize`}
        style={{
          backgroundColor: finalOption.color || 'var(--blue-1)',
          color: textColor,
          borderColor: finalOption.color ? adjustColor(finalOption.color, -20) : 'var(--blue-1)'
        }}
      >
        {showIcon && finalOption.icon}
        <span>{displayText}</span>
      </span>
    );
  }

  // Button style (like your custom implementation)
  if (displayStyle === 'button') {
    const displayText = finalOption.label || value || 'No Value';
    return (
      <div
        className={`inline-flex items-center gap-2 ${sizeClasses[size]} rounded-md font-medium border transition-all duration-200 cursor-pointer hover:opacity-80`}
        style={{
          backgroundColor: finalOption.color ? `${finalOption.color}20` : 'var(--blue-1)',
          color: finalOption.color || 'var(--blue-1)',
          borderColor: finalOption.color ? `${finalOption.color}40` : 'var(--blue-1)'
        }}
      >
        {showIcon && (
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: finalOption.color || 'var(--blue-1)' }}
          />
        )}
        <span>{displayText}</span>
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    );
  }

  // Plain style - just text with a dropdown chevron, no colors
  if (displayStyle === 'plain') {
    const displayText = finalOption.label || value || 'No Value';
    return (
      <div className={`inline-flex items-center gap-2 ${sizeClasses[size]} text-gray-12 cursor-pointer`}>
        <span>{displayText}</span>
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    );
  }

  // Minimal style - just text, no chevron, no colors (fallback)
  const displayText = finalOption.label || value || 'No Value';
  return (
    <span className={`${sizeClasses[size]} text-gray-1`}>
      {displayText}
    </span>
  );
};

// Interface for User objects
export interface User {
  id: string;
  name: string;
  image?: string;
  email: string;
}

// Get color for user based on user ID - consistent coloring
const getColorForUser = (userId: string) => {
  const colors = [
    "bg-blue-9", "bg-amber-9", "bg-green-9", 
    "bg-purple-9", "bg-pink-9", "bg-orange-9"
  ];
  
  // Simple hash function to get consistent color for same user ID
  const hash = userId.split("").reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

// Generate initials from name
const getInitials = (name: string): string => {
  if (!name) return "";
  const nameParts = name.split(" ");
  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// Avatar component for showing a user
export const Avatar: React.FC<{ user: User; size?: number }> = ({ user, size = 24 }) => {
  const isPlaceholder = user.image?.includes('placeholder');
  
  return (
    <div
      className="rounded-full flex items-center justify-center text-xs font-medium shrink-0 overflow-hidden"
      style={{ width: size, height: size }}
      title={user.name}
    >
      {user.image && !isPlaceholder ? (
        <img
          src={user.image}
          alt={user.name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className={`w-full h-full rounded-full ${getColorForUser(user.id)} flex items-center justify-center`}>
          <span className="text-[10px] font-medium text-gray-1">
            {getInitials(user.name)}
          </span>
        </div>
      )}
    </div>
  );
};

// Avatar group component for showing multiple users with overlap
export const AvatarGroup: React.FC<{ users: User[]; maxDisplay?: number }> = ({ users, maxDisplay = 3 }) => {
  if (!users || users.length === 0) {
    return (
      <div className="h-7 w-7 rounded-full bg-gray-1 flex items-center justify-center overflow-hidden border-2 border-white">
        <span className="text-xs text-gray-12">—</span>
      </div>
    );
  }

  const displayUsers = users.slice(0, maxDisplay);
  const remaining = users.length - maxDisplay;
  const zIndexBase = 30; // Match the zIndex from OverlappingAvatarGroup

  return (
    <div className="flex -space-x-2">
      {displayUsers.map((user, index) => (
        <div
          key={user.id}
          className="w-7 h-7 rounded-full border-2 border-white dark:border-background overflow-hidden"
          style={{ zIndex: zIndexBase - index }}
        >
          <Avatar user={user} size={28} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-1 flex items-center justify-center"
          style={{ zIndex: zIndexBase - maxDisplay }}
          title={`+${remaining} more users`}
        >
          <span className="text-[10px] font-medium text-gray-12">+{remaining}</span>
        </div>
      )}
    </div>
  );
};

// People Cell Renderer
export const PeopleCell: React.FC<{ 
  value: User[];
  maxDisplay?: number;
}> = ({ value, maxDisplay = 3 }) => {
  return <AvatarGroup users={value || []} maxDisplay={maxDisplay} />;
};

// Define the type for cell renderer functions
export type CellRendererFn = (value: any, options?: any) => React.ReactNode;

// Timeline Progress Bar Cell Renderer Component
export interface TimelineProgressProps {
  startDate: string | Date;
  endDate: string | Date;
  currentDate?: string | Date;
  color?: string;
  showDates?: boolean;
  showPercentage?: boolean;
}

export const TimelineProgressCell: React.FC<TimelineProgressProps> = ({ 
  startDate, 
  endDate, 
  currentDate = new Date(), 
  color = "primary",
  showDates = true,
  showPercentage = true
}) => {
  // Convert all dates to Date objects
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);
  const current = currentDate instanceof Date ? currentDate : new Date(currentDate);
  
  // Calculate total duration and elapsed time
  const totalDuration = end.getTime() - start.getTime();
  const elapsedTime = current.getTime() - start.getTime();
  
  // Calculate progress percentage (capped between 0-100)
  const progress = Math.max(0, Math.min(100, (elapsedTime / totalDuration) * 100));
  
  // Status colors
  const colorClasses = {
    primary: "bg-primary-500",
    secondary: "bg-gray-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };
  
  // Format date function
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  return (
    <div className="w-full space-y-1">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-1 rounded overflow-hidden">
        <div 
          className={`h-full ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`} 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-12">
        {showDates && (
          <>
            <span>{formatDate(start)}</span>
            <span>{formatDate(end)}</span>
          </>
        )}
        {showPercentage && !showDates && (
          <span className="font-medium">{Math.round(progress)}% Complete</span>
        )}
      </div>
      
      {/* Only show percentage complete text if explicitly enabled */}
      {showPercentage && (
        <div className="text-center text-xs font-medium text-gray-12">
          {Math.round(progress)}% Complete
        </div>
      )}
    </div>
  );
};

// Define the default renderers
export const defaultCellRenderers: Record<string, CellRendererFn> = {
  "String": (value: any) => <StringCell value={value} />,
  "Number": (value: any, options?: any) => <NumberCell value={value} options={options} />,
  "Currency": (value: any, options?: any) => <CurrencyCell value={value} options={options} />,
  "Date": (value: any, format?: string) => <DateCell value={value} format={format} />,
  "Tag": (value: any) => <TagCell value={value} />,
  "Status": (value: any, statusMap?: Record<string, { color: string }>, defaultColor?: string) => <StatusCell value={value} statusMap={statusMap} defaultColor={defaultColor} />,
  "Boolean": (value: any) => <BooleanCell value={value} />,
  "Dropdown": (value: any, meta?: any) => {
    const options = meta?.dropdownOptions || [];
    const displayStyle = meta?.displayStyle || 'badge';
    const size = meta?.size || 'md';
    const showIcon = meta?.enableIcons || false;
    const isLoading = meta?.isLoading || false;
    
    return (
      <DropdownCell 
        value={String(value || '')} 
        options={options}
        displayStyle={displayStyle}
        size={size}
        showIcon={showIcon}
        isLoading={isLoading}
      />
    );
  },
  "People": (value: any, options?: any) => <PeopleCell value={value} maxDisplay={options?.maxDisplay} />,
  "TimelineProgress": (value: any, options?: any) => {
    // Extract format options if they exist
    const formatOptions = options?.format || {};
    
    // If the value is an object with the required properties, use it directly
    if (value && typeof value === 'object' && 'startDate' in value && 'endDate' in value) {
      return <TimelineProgressCell 
        startDate={value.startDate} 
        endDate={value.endDate} 
        currentDate={value.currentDate} 
        color={value.color || options?.color}
        showDates={formatOptions.showDates !== undefined ? formatOptions.showDates : true}
        showPercentage={formatOptions.showPercentage !== undefined ? formatOptions.showPercentage : false}
      />;
    }
    
    // Otherwise, use the options passed to the renderer
    if (options && options.startDate && options.endDate) {
      return <TimelineProgressCell 
        {...options} 
        showDates={formatOptions.showDates !== undefined ? formatOptions.showDates : true}
        showPercentage={formatOptions.showPercentage !== undefined ? formatOptions.showPercentage : false}
      />;
    }
    
    // Fallback with error message
    return <div className="text-red-500 text-sm">Invalid timeline data format</div>;
  }
};

// Define a type for the cell renderer registry that allows string indexing
export type CellRendererRegistry = Record<string, CellRendererFn>;

// Create the registry with the default renderers
export const cellRendererRegistry: CellRendererRegistry = { ...defaultCellRenderers };

// Function to register a new cell renderer
export function registerCellRenderer(
  type: string,
  renderer: CellRendererFn
) {
  cellRendererRegistry[type] = renderer;
}

// Function to get a cell renderer based on column type
export function getCellRenderer(
  type: string,
  value: any,
  options?: any
): React.ReactNode {
  const renderer = cellRendererRegistry[type] || cellRendererRegistry["String"];
  return renderer(value, options);
}
