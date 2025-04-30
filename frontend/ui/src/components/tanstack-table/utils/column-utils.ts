import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumn, ColumnGroup, RowAction, ColumnType } from "../types";
import { getCellRenderer } from "../cell-renderers";

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
  if (constraints.width) {
    def.size = typeof constraints.width === 'number' 
      ? constraints.width 
      : parseInt(constraints.width);
  }
  
  if (constraints.minWidth) {
    def.minSize = typeof constraints.minWidth === 'number' 
      ? constraints.minWidth 
      : parseInt(constraints.minWidth);
  }
  
  if (constraints.maxWidth) {
    def.maxSize = typeof constraints.maxWidth === 'number' 
      ? constraints.maxWidth 
      : parseInt(constraints.maxWidth);
  }
}
