// File: components/DataTable/cellRenderers.tsx
import React from "react";

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
        <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
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
      <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
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
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
        <div 
          className={`h-full ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`} 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
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
        <div className="text-center text-xs font-medium text-gray-700 dark:text-gray-300">
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
