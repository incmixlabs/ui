"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Check, Trash2 } from "lucide-react";
import { Button, Input } from "@base";
import { ColumnType, DataTableColumn, DropdownOption } from "../types";

// Column configuration interface
export interface ColumnConfiguration {
  name: string;
  type: string;
  dropdownOptions?: DropdownOption[];
}

interface ColumnConfigDialogProps<TData> {
  isOpen: boolean;
  onClose: () => void;
  column: DataTableColumn<TData> | null;
  onSave: (columnId: string, config: ColumnConfiguration) => void;
}

const COLUMN_TYPE_OPTIONS = [
  { label: "Text", value: "String" },
  { label: "Number", value: "Number" },
  { label: "Currency", value: "Currency" },
  { label: "Date", value: "Date" },
  { label: "Boolean", value: "Boolean" },
  { label: "Tag", value: "Tag" },
  { label: "Status", value: "Status" },
  { label: "Dropdown", value: "Dropdown" },
  { label: "Rating", value: "Rating" }
];

function ColumnConfigDialog<TData>({
  isOpen,
  onClose,
  column,
  onSave
}: ColumnConfigDialogProps<TData>) {
  const [columnName, setColumnName] = useState("");
  const [columnType, setColumnType] = useState<ColumnType>("String");
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);
  const [newOptionValue, setNewOptionValue] = useState("");
  const [newOptionColor, setNewOptionColor] = useState("#3B82F6"); // Default blue color

  // Initialize form state when column changes
  useEffect(() => {
    if (column) {
      setColumnName(column.header || column.headingName || "");
      setColumnType(column.type);
      
      // Make sure existing options have the isUserAdded flag set correctly
      const initialOptions = (column.dropdownOptions || []).map(option => ({
        ...option,
        isUserAdded: option.isUserAdded || false
      }));
      setDropdownOptions(initialOptions);
    }
  }, [column]);

  // Reset form when dialog opens
  useEffect(() => {
    if (!isOpen) {
      setNewOptionValue("");
      setNewOptionColor("#3B82F6");
    }
  }, [isOpen]);

  // Handle adding a new dropdown option
  const handleAddOption = () => {
    if (!newOptionValue) return;

    const newOption: DropdownOption = {
      value: newOptionValue,
      label: newOptionValue, // Use value as label for simplicity
      color: newOptionColor,
      isUserAdded: true // Mark as user-added
    };

    setDropdownOptions([...dropdownOptions, newOption]);
    setNewOptionValue("");
    setNewOptionColor("#3B82F6");
  };
  
  // Handle editing an existing option
  const handleEditOption = (index: number, newValue: string, newColor: string) => {
    const updatedOptions = [...dropdownOptions];
    updatedOptions[index] = {
      ...updatedOptions[index],
      value: newValue,
      label: newValue, // Update label to match value
      color: newColor
    };
    setDropdownOptions(updatedOptions);
  };

  // Handle removing a dropdown option
  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...dropdownOptions];
    updatedOptions.splice(index, 1);
    setDropdownOptions(updatedOptions);
  };

  // Handle save
  const handleSave = () => {
    if (!column || !columnName) return;

    const config: ColumnConfiguration = {
      name: columnName,
      type: columnType,
      dropdownOptions: ["Dropdown", "Status"].includes(columnType) ? dropdownOptions : undefined
    };

    onSave(column.id || String(column.accessorKey), config);
  };

  if (!column) return null;

  // If dialog is not open, don't render anything
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      {/* Modal content */}
      <div className="relative max-h-[85vh] w-[90vw] max-w-[500px] rounded-md bg-white p-6 shadow-lg focus:outline-none dark:bg-gray-800 overflow-auto">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Configure Column
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Customize the column's display name, type, and options.
        </p>

        <div className="mt-4 space-y-4">
          {/* Column Name */}
          <div className="space-y-2">
            <label htmlFor="column-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Column Name
            </label>
            <Input
              id="column-name"
              value={columnName}
              onChange={e => setColumnName(e.target.value)}
              placeholder="Enter column name"
              className="w-full"
            />
          </div>

          {/* Column Type */}
          <div className="space-y-2">
            <label htmlFor="column-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Column Type
            </label>
            <select
              id="column-type"
              value={columnType}
              onChange={(e) => setColumnType(e.target.value as ColumnType)}
              className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
            >
              {COLUMN_TYPE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown Options (only shown for Dropdown and Status types) */}
          {["Dropdown", "Status"].includes(columnType) && (
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Dropdown Options</h4>
                            {/* Current Options */}
                <div className="max-h-[200px] overflow-y-auto space-y-2 mb-4">
                  {dropdownOptions.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No options defined</p>
                  ) : (
                    dropdownOptions.map((option, index) => {
                      return (
                        <div key={index} className={`flex items-center gap-2 p-2 ${option.isUserAdded ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-700'} rounded-md`}>
                          <input
                            type="color"
                            value={option.color || '#3B82F6'}
                            onChange={(e) => handleEditOption(index, option.value, e.target.value)}
                            className="w-6 h-6 p-0 cursor-pointer rounded-md border-0"
                          />
                          <input
                            type="text"
                            value={option.value}
                            onChange={(e) => handleEditOption(index, e.target.value, option.color || '#3B82F6')}
                            className="flex-1 text-sm px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md"
                          />
                          {/* Visual indication through background color, but no label */}
                          <Button
                            variant="ghost"
                            onClick={() => handleRemoveOption(index)}
                            className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    })
                  )}
                </div>

              {/* Add New Option */}
              <div className="space-y-2 border-t pt-2">
                <h5 className="text-xs font-medium text-gray-500">Add New Option</h5>
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label htmlFor="option-value" className="block text-xs text-gray-500 mb-1">New Value</label>
                      <Input
                        id="option-value"
                        value={newOptionValue}
                        onChange={e => setNewOptionValue(e.target.value)}
                        placeholder="Enter new option..."
                        className="w-full h-8 text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="option-color" className="block text-xs text-gray-500 mb-1">Color</label>
                      <input
                        id="option-color"
                        type="color"
                        value={newOptionColor}
                        onChange={(e) => setNewOptionColor(e.target.value)}
                        className="w-8 h-8 p-0 cursor-pointer rounded-md"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="h-8 flex-shrink-0"
                      onClick={handleAddOption}
                      disabled={!newOptionValue}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!columnName}>
            <Check className="h-4 w-4 mr-1" />
            Save Changes
          </Button>
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          className="absolute right-4 top-4 h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default ColumnConfigDialog;
