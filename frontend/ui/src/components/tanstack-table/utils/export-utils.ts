import { DataTableColumn } from "../types";

// Export utilities
export const exportTableData = <TData extends object>(
  data: TData[],
  columns: DataTableColumn<TData>[],
  format: string,
  filename: string = "table-export"
) => {
  switch (format) {
    case "csv":
      exportCSV(data, columns, filename);
      break;
    case "excel":
      alert("Excel export not implemented in this demo - would use a library like xlsx");
      break;
    case "pdf":
      alert("PDF export not implemented in this demo - would use a library like jsPDF");
      break;
    default:
      console.warn(`Unsupported export format: ${format}`);
  }
};

export const exportCSV = <TData extends object>(
  data: TData[],
  columns: DataTableColumn<TData>[],
  filename: string
) => {
  // Get column headers
  const headers = columns.map(col => col.headingName);

  // Get data rows
  const rows = data.map(item =>
    columns.map(col => {
      const key = col.accessorKey;
      const value = item[key as keyof TData];

      // Handle different data types
      if (Array.isArray(value)) {
        return value.join(', ');
      } else if (value instanceof Date) {
        return value.toISOString();
      } else {
        return String(value);
      }
    })
  );

  // Combine headers and rows
  const escape = (v: string) =>
    `"${v.replace(/"/g, '""').replace(/\n/g, '\\n')}"`;
  const csvContent = [
    headers.map(escape).join(','),
    ...rows.map(r => r.map(v => escape(String(v))).join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
