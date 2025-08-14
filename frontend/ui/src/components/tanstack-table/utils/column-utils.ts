import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumn, ColumnGroup, RowAction, ColumnType } from "../types";
import { getCellRenderer } from "../cell-renderers";
export const flattenPermissions = (permissions: any[]): any[] => {
  const flattenedPermissions: any[] = [];
  
  const flattenPermission = (permission: any) => {
    const { subRows, subject, action, ...rest } = permission;
    const mergedPermission = {
      ...rest,
      resource: `${action} ${subject.toLowerCase()}`,
      subject,
      action
    };
    flattenedPermissions.push(mergedPermission);
    
    if (subRows && subRows.length > 0) {
      subRows.forEach((subRow: any) => {
        flattenPermission(subRow);
      });
    }
  };
  
  permissions.forEach(flattenPermission);
  return flattenedPermissions;
};
// Type guard for column group
export function isColumnGroup<TData>(obj: any): obj is ColumnGroup<TData> {
  return obj && typeof obj === 'object' && 'title' in obj && 'columns' in obj;
}

// Flatten column groups into a flat array of columns
export function flattenColumns<TData>(
  columns: (DataTableColumn<TData> | ColumnGroup<TData>)[]
): DataTableColumn<TData>[] {
  return columns.flatMap(col => {
    if (isColumnGroup<TData>(col)) {
      return col.columns;
    }
    return col;
  });
}

// Non-JSX column definition helpers that will be used by the React column renderer
export interface ColumnSizeConstraints {
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
}

export function applyColumnSizeConstraints<TData>(
  def: ColumnDef<TData>,
  constraints: ColumnSizeConstraints
): void {
  if (typeof constraints.width === "number") {
    def.size = constraints.width;
  } else if (constraints.width && /^\d+$/.test(constraints.width)) {
    def.size = Number(constraints.width); // pixels
  } // otherwise leave undefined – let CSS handle %, rem, etc.
  
  if (typeof constraints.minWidth === "number") {
    def.minSize = constraints.minWidth;
  } else if (constraints.minWidth && /^\d+$/.test(constraints.minWidth)) {
    def.minSize = Number(constraints.minWidth); // pixels
  } // otherwise leave undefined – let CSS handle %, rem, etc.
  
  if (typeof constraints.maxWidth === "number") {
    def.maxSize = constraints.maxWidth;
  } else if (constraints.maxWidth && /^\d+$/.test(constraints.maxWidth)) {
    def.maxSize = Number(constraints.maxWidth); // pixels
  } // otherwise leave undefined – let CSS handle %, rem, etc.
}
