# TanStack Table Component Documentation

This documentation provides a comprehensive guide to using the TanStack Table component, a powerful and customizable data table built on TanStack's React Table library. The component supports filtering, sorting, pagination, row selection, expandable rows, and many other advanced features.

## Table of Contents

1. [Basic Usage](#basic-usage)
2. [Column Configuration](#column-configuration)
3. [Filtering Options](#filtering-options)
4. [Row Grouping](#row-grouping)
5. [Props Reference](#props-reference)
6. [Custom Cell Renderers](#custom-cell-renderers)
7. [Advanced Usage Examples](#advanced-usage-examples)
8. [Real-World Examples](#real-world-examples)
9. [Troubleshooting](#troubleshooting)

## Basic Usage

Here's a simple example of using the TanStack Table component:

```tsx
import { DataTable } from "@incmix/ui/components/tanstack-table";
import { DataTableColumn } from "@incmix/ui/components/tanstack-table/types";

// Sample data
const data = [
  { id: 1, name: "John Doe", age: 25, status: "active" },
  { id: 2, name: "Jane Smith", age: 32, status: "inactive" },
  // ...more data
];

// Define columns
const columns: DataTableColumn<typeof data[0]>[] = [
  {
    headingName: "ID",
    accessorKey: "id",
    type: "Number",
    enableSorting: true,
  },
  {
    headingName: "Name",
    accessorKey: "name",
    type: "String",
    enableSorting: true,
  },
  {
    headingName: "Age",
    accessorKey: "age",
    type: "Number",
    enableSorting: true,
  },
  {
    headingName: "Status",
    accessorKey: "status",
    type: "Status",
    enableSorting: true,
  }
];

// Render the component
function MyTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
    />
  );
}
```

By default, the table includes:
- Row selection (checkboxes)
- Sorting (click on column headers)
- Pagination (10 rows per page)
- Column visibility toggle
- Basic filtering

## Column Configuration

Columns are defined using the `DataTableColumn` interface. Each column can have the following properties:

### Required Properties

| Property | Type | Description |
|----------|------|-------------|
| `headingName` | string | The display name for the column header |
| `accessorKey` | keyof TData \| string | The key to access the data from your data object |
| `type` | ColumnType | The type of data in this column (see below) |

### Column Types

The component includes built-in renderers for these column types:

| Type | Description | Example Value | Rendering Behavior |
|------|-------------|---------------|-------------------|
| `String` | Plain text | `"Hello World"` | Basic text with truncation for long content |
| `Number` | Numeric values | `42` | Right-aligned with optional formatting |
| `Currency` | Money values | `199.99` | Formatted with currency symbol and proper decimal places |
| `Date` | Date values | `"2023-01-15"` or `new Date()` | Formatted date/time |
| `Tag` | Array of tags | `["React", "TypeScript"]` | Individual badge-style elements |
| `Boolean` | True/false values | `true` or `false` | "Yes"/"No" with colored indicators |
| `Status` | Status indicators | `"active"`, `"pending"`, `"failed"` | Color-coded status indicators |
| `Rating` | Rating values | `4` | Visual star rating (requires custom renderer) |
| `Image` | Image URLs | `"https://example.com/image.jpg"` | Thumbnail images |
| `Link` | Hyperlinks | `"https://example.com"` | Clickable links |
| `Custom` | Custom rendering | Any value with a custom renderer | Whatever your renderer returns |

### Optional Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier for the column (defaults to accessorKey) |
| `enableSorting` | boolean | Enable/disable sorting for this column |
| `enableFiltering` | boolean | Enable/disable filtering for this column |
| `enableHiding` | boolean | Enable/disable hiding this column |
| `className` | string | Additional CSS class for the column |
| `cell` | (info: any) => ReactNode | Custom cell renderer function |
| `width` | string \| number | Fixed width for the column |
| `minWidth` | string \| number | Minimum width for the column |
| `maxWidth` | string \| number | Maximum width for the column |
| `format` | object | Formatting options for the column |
| `renderer` | (value: any, row: TData) => ReactNode | Custom renderer function |

### Column Formatting

You can apply custom formatting to columns using the `format` property:

```tsx
// For Date columns
{
  headingName: "Joined Date",
  type: "Date",
  accessorKey: "joinDate",
  format: {
    dateFormat: "YYYY-MM-DD HH:mm" // Custom date format
  }
}

// For Currency columns
{
  headingName: "Balance",
  type: "Currency",
  accessorKey: "balance",
  format: {
    numberFormat: {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
  }
}
```

### Column Groups

You can group columns under a common header:

```tsx
import { ColumnGroup } from "@incmix/ui/components/tanstack-table/types";

const columnGroups: ColumnGroup<typeof data[0]>[] = [
  {
    title: "Personal Information",
    columns: [
      {
        headingName: "Name",
        accessorKey: "name",
        type: "String",
      },
      {
        headingName: "Age",
        accessorKey: "age",
        type: "Number",
      }
    ]
  },
  {
    title: "Account Information",
    columns: [
      {
        headingName: "Status",
        accessorKey: "status",
        type: "Status"
      },
      {
        headingName: "Created At",
        accessorKey: "createdAt",
        type: "Date"
      }
    ]
  }
];

// Then use these column groups:
<DataTable
  columns={columnGroups}
  data={data}
/>
```

## Filtering Options

The TanStack Table component offers several filtering options:

### Built-in Column Filtering

The table has built-in filtering capabilities. You can specify a column to use for global filtering:

```tsx
<DataTable
  columns={columns}
  data={data}
  enableFiltering={true}
  filterColumn="name"
  filterPlaceholder="Search by name..."
/>
```

### Faceted Filtering

Faceted filters provide multi-select filtering options that appear above the table:

```tsx
import { DataTableFacet } from "@incmix/ui/components/tanstack-table/types";

const facets: DataTableFacet<typeof data[0]>[] = [
  {
    column: "status",
    title: "Status",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" }
    ]
  },
  {
    column: "department",
    title: "Department",
    options: [
      { label: "Engineering", value: "engineering" },
      { label: "Marketing", value: "marketing" },
      { label: "Sales", value: "sales" }
    ]
  }
];

<DataTable
  columns={columns}
  data={data}
  facets={facets}
/>
```

### Sidebar Filtering

For more advanced filtering, you can use the sidebar filters, which provide a collapsible sidebar with various filter types:

```tsx
import { SidebarFilterConfig } from "@incmix/ui/components/tanstack-table/types";
import { Calendar, UserCircle, Check, Tag, FileText } from "lucide-react";

const sidebarFilters: SidebarFilterConfig<typeof data[0]>[] = [
  {
    type: "text",
    column: "name",
    title: "Name",
    icon: <UserCircle className="h-4 w-4" />,
    initialCollapsed: false
  },
  {
    type: "multiSelect",
    column: "status",
    title: "Status",
    icon: <Tag className="h-4 w-4" />,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" }
    ],
    initialCollapsed: false
  },
  {
    type: "dateRange",
    column: "createdAt",
    title: "Created Date",
    icon: <Calendar className="h-4 w-4" />,
    initialCollapsed: false
  },
  {
    type: "boolean",
    column: "isVerified",
    title: "Verified",
    icon: <Check className="h-4 w-4" />,
    initialCollapsed: false
  }
];

<DataTable
  columns={columns}
  data={data}
  enableSidebarFilters={true}
  sidebarFilters={sidebarFilters}
  initialSidebarOpen={true}
/>
```

#### Sidebar Filter Types

| Type | Description | Configuration |
|------|-------------|---------------|
| `text` | Simple text search | `{ type: "text", column: "fieldName", title: "Display Name" }` |
| `select` | Single-select dropdown | `{ type: "select", column: "fieldName", title: "Display Name", options: [...] }` |
| `multiSelect` | Multi-select options | `{ type: "multiSelect", column: "fieldName", title: "Display Name", options: [...] }` |
| `date` | Single date picker | `{ type: "date", column: "fieldName", title: "Display Name" }` |
| `dateRange` | Date range picker | `{ type: "dateRange", column: "fieldName", title: "Display Name" }` |
| `boolean` | Yes/No filter | `{ type: "boolean", column: "fieldName", title: "Display Name" }` |

## Row Grouping

The DataTable component supports grouping rows by a specific column value, ideal for organizing related data. Each group can be collapsed/expanded to show or hide its rows.

```tsx
import { DataTable } from "@incmix/ui/components/tanstack-table";

// Sample data with a category/status to group by
const tasks = [
  { id: 1, name: "Create Navbar", status: "Todo", priority: "Normal" },
  { id: 2, name: "Update Sidebar", status: "Todo", priority: "Normal" },
  { id: 3, name: "Customize Page", status: "In Design", priority: "Medium" },
  { id: 4, name: "Pricing Card", status: "In Design", priority: "Normal" },
  { id: 5, name: "GitHub Integration", status: "In Review", priority: "High" },
];

// Define columns - note that 'status' is deliberately NOT included as a column
// since we're grouping by it and don't need to show it in each row
const columns = [
  { headingName: "Name", accessorKey: "name", type: "String" },
  { headingName: "Priority", accessorKey: "priority", type: "Status" },
  // The 'status' field exists in the data but isn't included as a visible column
  // because it would be redundant when rows are already grouped by status
];

// Custom renderer for group headers (optional)
const renderGroupHeader = (groupValue, count) => (
  <div className="flex items-center">
    {/* Optional: Icon based on group value */}
    {groupValue === "Todo" && <ClockIcon className="mr-2 h-4 w-4" />}
    {groupValue === "In Design" && <PencilIcon className="mr-2 h-4 w-4" />}
    
    <span className="font-medium">{groupValue}</span>
    <span className="ml-2 text-muted-foreground">({count} items)</span>
  </div>
);

// Use the DataTable with grouping enabled
function GroupedTasksTable() {
  return (
    <DataTable
      columns={columns}
      data={tasks}
      // Enable row grouping
      enableRowGrouping={true}
      // Configure grouping options
      rowGrouping={{
        // Column to group by
        groupByColumn: "status",
        // Optional custom renderer for group headers
        renderGroupHeader: renderGroupHeader,
        // Whether groups start collapsed
        initiallyCollapsed: false,
        // Whether clicking the header toggles the group
        toggleOnClick: true
      }}
    />
  );
}
```

### Row Grouping Options

| Option | Type | Description |
|--------|------|-------------|
| `groupByColumn` | `string \| function` | The column key to group by, or a function that returns a grouping value for each row |
| `renderGroupHeader` | `function` | Optional custom renderer for group headers. Receives group value and row count |
| `initiallyCollapsed` | `boolean` | Whether groups should start in collapsed state (default: false) |
| `toggleOnClick` | `boolean` | Whether clicking the group header toggles the group (default: true) |

## Props Reference

The `DataTable` component accepts the following props:

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `DataTableColumn<TData>[] \| ColumnGroup<TData>[]` | (required) | Column definitions |
| `data` | `TData[]` | (required) | Table data |

### Feature Toggles

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `enableFiltering` | boolean | `true` | Enable/disable filtering |
| `enableSorting` | boolean | `true` | Enable/disable sorting |
| `enablePagination` | boolean | `true` | Enable/disable pagination |
| `enableRowSelection` | boolean | `true` | Enable/disable row selection |
| `enableColumnVisibility` | boolean | `true` | Enable/disable column visibility |
| `enableColumnResizing` | boolean | `false` | Enable/disable column resizing |
| `enableColumnReordering` | boolean | `false` | Enable/disable column reordering |
| `enableSidebarFilters` | boolean | `false` | Enable/disable sidebar filters |

### Display Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showRowCount` | boolean | `true` | Show row count in the footer |
| `showPagination` | boolean | `undefined` | Explicitly control pagination visibility. When undefined, pagination is shown only when there are multiple pages of data (smart pagination) |
| `filterColumn` | keyof TData \| string | undefined | Column to use for global filtering |
| `filterPlaceholder` | string | `"Filter..."` | Placeholder text for the filter input |
| `className` | string | undefined | Additional CSS class for the table |
| `initialSidebarOpen` | boolean | `true` | Whether the sidebar is initially open |

### Advanced Features

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rowActions` | (row: TData) => RowAction[] | undefined | Actions for each row |
| `facets` | DataTableFacet<TData>[] | undefined | Faceted filter definitions |
| `sidebarFilters` | SidebarFilterConfig<TData>[] | `[]` | Sidebar filter definitions |
| `expandableRows` | ExpandableRowOptions<TData> | undefined | Options for expandable rows |
| `export` | ExportOptions | undefined | Export options |

### Server Pagination

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `serverPagination` | boolean | `false` | Use server-side pagination |
| `currentPage` | number | `0` | Current page index |
| `pageSize` | number | `10` | Number of rows per page |
| `totalItems` | number | `0` | Total number of items (server-side) |
| `onPageChange` | (page: number) => void | undefined | Page change handler |
| `onPageSizeChange` | (pageSize: number) => void | undefined | Page size change handler |
| `isPaginationLoading` | boolean | `false` | Show loading state for pagination |

### Event Handlers

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onRowClick` | (row: TData) => void | undefined | Row click handler |
| `onSelectionChange` | (selectedRows: TData[]) => void | undefined | Selection change handler |
| `onColumnReorder` | (newOrder: string[]) => void | undefined | Column reorder handler |

## Smart Pagination

The DataTable component includes smart pagination visibility that automatically determines when to show or hide the pagination controls based on the data:

- When there are multiple pages of data, pagination controls are shown
- When there's only a single page with fewer items than the page size, pagination controls are hidden
- You can override this behavior using the `showPagination` prop:
  - `showPagination={true}` always shows pagination controls regardless of data size
  - `showPagination={false}` always hides pagination controls regardless of data size
  - `showPagination={undefined}` (default) uses the smart pagination behavior

```tsx
// With smart pagination (default)
<DataTable
  columns={columns}
  data={data}
  enablePagination={true}
  // showPagination is undefined, so pagination will only show when there are multiple pages
/>

// Always show pagination controls
<DataTable
  columns={columns}
  data={data}
  enablePagination={true}
  showPagination={true}
/>

// Always hide pagination controls
<DataTable
  columns={columns}
  data={data}
  enablePagination={true}
  showPagination={false}
/>
```

Note: The `showRowCount` feature will still work even when pagination controls are hidden, allowing users to see how many rows are selected when row selection is enabled.

## Custom Cell Renderers

The component includes built-in renderers for common data types, but you can also create custom renderers for specialized needs.

### Built-in Renderers

- **StringCell**: For basic text
- **NumberCell**: For numeric values, with optional formatting
- **CurrencyCell**: For money values, with currency formatting
- **DateCell**: For dates, with optional formatting
- **TagCell**: For arrays of tags, rendered as badges
- **StatusCell**: For status values, with color-coding
- **BooleanCell**: For true/false values, rendered as Yes/No badges

### Creating a Custom Renderer

You can create and register custom cell renderers for specialized column types:

```tsx
import { registerCellRenderer } from "@incmix/ui/components/tanstack-table/cell-renderers";

// Create a custom rating cell renderer
const RatingCell: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= value ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Register the custom cell renderer
registerCellRenderer("Rating", (value) => <RatingCell value={value} />);

// Then use it in your column definitions
const columns = [
  // ...
  {
    headingName: "Rating",
    type: "Rating", // Use your custom type
    accessorKey: "rating"
  }
];
```

### Using `renderer` Property for Individual Columns

If you need a custom rendering for a specific column without creating a new column type:

```tsx
{
  headingName: "Name",
  type: "String",
  accessorKey: "name",
  renderer: (value: string, row: User) => (
    <div className="flex items-center space-x-2">
      <img
        src={row.profileImage}
        alt={value}
        className="h-8 w-8 rounded-full object-cover"
      />
      <span>{value}</span>
    </div>
  )
}
```

## Advanced Usage Examples

### Row Actions

Add actions to each row with the `rowActions` prop:

```tsx
<DataTable
  columns={columns}
  data={data}
  rowActions={(row) => [
    {
      label: "View Profile",
      onClick: () => handleViewProfile(row),
      icon: <span className="mr-2">👤</span>
    },
    {
      label: "Edit User",
      onClick: () => handleEditUser(row),
      icon: <span className="mr-2">✏️</span>
    },
    {
      label: "Delete User",
      onClick: () => handleDeleteUser(row),
      icon: <span className="mr-2">🗑️</span>,
      color: "text-red-500",
      disabled: row.isActive // Disable delete for active users
    }
  ]}
/>
```

### Expandable Rows

Create expandable rows to show additional details:

```tsx
<DataTable
  columns={columns}
  data={data}
  expandableRows={{
    render: (user) => (
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
        <div className="flex items-start">
          <img
            src={user.profileImage}
            alt={user.name}
            className="h-20 w-20 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500">Account Status:</span>
                <p>{user.isActive ? "Active" : "Inactive"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Current Plan:</span>
                <p className="capitalize">{user.plan}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    expandOnClick: true, // Click anywhere on the row to expand
    singleExpand: true // Only one row can be expanded at a time
  }}
/>
```

### Export Options

Enable data export functionality:

```tsx
<DataTable
  columns={columns}
  data={data}
  export={{
    enabled: true,
    formats: ["csv", "excel"],
    filename: "users-data"
  }}
/>
```

### Server-side Pagination

Implement server-side pagination to handle large datasets:

```tsx
function ServerPaginatedTable() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  async function fetchData(page, size) {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // In a real application, this would be an API call
      const response = {
        data: SAMPLE_USERS.slice(page * size, (page + 1) * size),
        totalCount: SAMPLE_USERS.length
      };

      setTableData(response.data);
      setTotalItems(response.totalCount);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DataTable
      columns={columns}
      data={tableData}
      serverPagination={true}
      currentPage={currentPage}
      pageSize={pageSize}
      totalItems={totalItems}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
      isPaginationLoading={loading}
    />
  );
}
```

## Real-World Examples

Here are some complete examples demonstrating different usage scenarios:

### Basic Users Table

```tsx
import React from "react";
import { DataTable } from "@incmix/ui/components/tanstack-table";

const UsersTableDemo = () => {
  // Define columns
  const columns = [
    {
      headingName: "Name",
      type: "String" as const,
      accessorKey: "name",
      enableSorting: true,
    },
    {
      headingName: "Email",
      type: "String" as const,
      accessorKey: "email",
      enableSorting: true,
    },
    {
      headingName: "Joined",
      type: "Date" as const,
      accessorKey: "joinDate",
      enableSorting: true,
    },
    {
      headingName: "Status",
      type: "Boolean" as const,
      accessorKey: "isActive",
    },
    {
      headingName: "Tags",
      type: "Tag" as const,
      accessorKey: "tags",
    },
    {
      headingName: "Plan",
      type: "Status" as const,
      accessorKey: "plan",
    },
    {
      headingName: "Balance",
      type: "Currency" as const,
      accessorKey: "balance",
      enableSorting: true,
    },
  ];

  // Sample data
  const data = [
    {
      id: "user1",
      name: "Alice Smith",
      email: "alice@example.com",
      joinDate: "2023-01-15",
      isActive: true,
      tags: ["admin", "developer"],
      plan: "success",
      balance: 2480,
    },
    // Additional data rows...
  ];

  // Row actions
  const rowActions = (row: any) => [
    {
      label: "View Profile",
      onClick: () => alert(`View profile of ${row.name}`),
    },
    {
      label: "Edit User",
      onClick: () => alert(`Edit user ${row.name}`),
    },
    {
      label: "Delete User",
      onClick: () => alert(`Delete user ${row.name}`),
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      <DataTable
        columns={columns}
        data={data}
        enableRowSelection={true}
        enableSorting={true}
        enablePagination={true}
        enableColumnVisibility={true}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        rowActions={rowActions}
      />
    </div>
  );
};
```

### Advanced Table with Sidebar Filters

For a complete working example of a table with advanced features like sidebar filters, custom renderers, expandable rows, and server pagination, see the demo files:

- `users-demo.tsx`: Basic table implementation
- `tasks-demo.tsx`: Advanced table with custom renderers and expandable rows
- `sidebarfilter-demo.tsx`: Table with sidebar filters

## Troubleshooting

### Common Issues

1. **Table not rendering correctly**
   - Ensure you've provided the required `columns` and `data` props
   - Check that column `accessorKey` values match your data object properties
   - Verify column `type` is supported or you've registered a custom renderer

2. **Filtering not working**
   - For sidebar filters, ensure `enableSidebarFilters` is set to `true`
   - For faceted filters, check that the `column` values in your facets match your column accessorKeys
   - Verify filter options have the correct format with `label` and `value` properties

3. **Custom renderers not displaying**
   - Make sure you're importing from the correct paths
   - Check that you've registered your custom renderer before using it
   - Verify the type in your column definition matches the registered type

4. **Server pagination issues**
   - Ensure all required server pagination props are provided
   - Verify that `onPageChange` and `onPageSizeChange` handlers are updating state
   - Check that `totalItems` is correctly set to enable proper page calculations
