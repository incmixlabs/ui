"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "../../../utils";
import { useEditableCellKeyboard } from "../hooks/useEditableCellKeyboard";
import { Search, Check } from "lucide-react";
import { User, AvatarGroup } from "../cell-renderers";

interface EditablePeopleCellProps {
  value: User[];
  rowData: any;
  columnId: string;
  onSave: (rowData: any, columnId: string, newValue: User[]) => void;
  isEditing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  className?: string;
  availableUsers?: User[];
  maxDisplay?: number;
  maxSelections?: number;
}

/**
 * Editable people cell component that supports inline user assignment editing
 * with keyboard navigation support
 */
export const EditablePeopleCell: React.FC<EditablePeopleCellProps> = ({
  value,
  rowData,
  columnId,
  onSave,
  isEditing,
  isSelected,
  onSelect,
  onStartEdit,
  onCancelEdit,
  className = "",
  availableUsers = [],
  maxDisplay = 3,
  maxSelections = 10,
}) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // State for the people editor
  const [selectedUsers, setSelectedUsers] = useState<User[]>(value || []);
  const [searchQuery, setSearchQuery] = useState("");

  // Reset selected users when value changes or editing starts
  useEffect(() => {
    console.log('EditablePeopleCell state change:', { isEditing, isSelected, value });
    setSelectedUsers(value || []);
    setSearchQuery("");
  }, [value, isEditing, isSelected]);

  // Focus search input when editing starts and position dropdown
  useEffect(() => {
    if (isEditing && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }

    // Position dropdown when editing
    if (isEditing && dropdownRef.current && cellRef.current) {
      const cellRect = cellRef.current.getBoundingClientRect();
      const dropdown = dropdownRef.current;

      // Position dropdown below the cell
      dropdown.style.top = `${cellRect.bottom + window.scrollY + 5}px`;
      dropdown.style.left = `${cellRect.left + window.scrollX}px`;

      // Make sure dropdown is within viewport bounds
      setTimeout(() => {
        const dropdownRect = dropdown.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Adjust if extends beyond bottom
        if (dropdownRect.bottom > viewportHeight) {
          dropdown.style.top = `${cellRect.top + window.scrollY - dropdownRect.height - 5}px`;
        }

        // Adjust if extends beyond right edge
        if (dropdownRect.right > viewportWidth) {
          dropdown.style.left = `${viewportWidth - dropdownRect.width - 10}px`;
        }
      }, 10);
    }
  }, [isEditing]);

  // Filter users based on search query
  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle user selection/deselection
  const handleUserToggle = (user: User) => {
    const isSelected = selectedUsers.some(u => u.id === user.id);

    if (isSelected) {
      // Remove user from selection
      setSelectedUsers(prev => prev.filter(u => u.id !== user.id));
    } else {
      // Add user to selection (check max limit)
      if (!maxSelections || selectedUsers.length < maxSelections) {
        setSelectedUsers(prev => [...prev, user]);
      }
    }
  };

  // Handle saving the selected users
  const handleSave = () => {
    console.log('EditablePeopleCell handleSave called:', {
      rowData: rowData.id,
      columnId,
      selectedUsers,
      originalValue: value
    });
    // Force update the selected users state before saving
    console.log('Calling onSave with:', selectedUsers);
    onSave(rowData, columnId, selectedUsers);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search input key down
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCancelEdit();
    }
  };

  // Removed handleBlur to prevent premature dropdown closing

  // Use our enhanced keyboard handler hook
  const { handleKeyDown, handleCellClick, cellRef: keyboardCellRef, getAriaAttributes } = useEditableCellKeyboard({
    rowId: rowData.id || 'row',
    columnId,
    isEditing,
    isSelected,
    selectCell: () => onSelect(),
    startEditing: () => onStartEdit(),
    cancelEditing: () => onCancelEdit(),
    saveEdit: () => handleSave(),
    autoFocus: true,
  });

  // Get accessibility attributes
  const ariaAttributes = getAriaAttributes();

  // Handle document-wide click to deselect or save
  useEffect(() => {
    if (!isSelected && !isEditing) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      
      // Check if click is outside both the cell and the dropdown
      const isOutsideCell = cellRef.current && !cellRef.current.contains(target);
      const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(target);
      
      if (isOutsideCell && isOutsideDropdown) {
        if (isEditing) {
          // Save when clicking outside during editing
          handleSave();
        } else {
          // Cancel selection when clicking outside
          onCancelEdit();
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSelected, isEditing, selectedUsers]);



  // Avatar component for showing a user
  const Avatar: React.FC<{ user: User; size?: number }> = ({ user, size = 24 }) => {
    const getInitials = (name: string): string => {
      const parts = name.split(' ');
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      }
      return name[0].toUpperCase();
    };

    return (
      <div
        className="rounded-full flex items-center justify-center text-xs font-medium text-white bg-blue-500 flex-shrink-0"
        style={{ width: size, height: size }}
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          getInitials(user.name)
        )}
      </div>
    );
  };

  if (isEditing) {
    return (
      <>
        {/* Cell container */}
        <div
          ref={cellRef}
          className="w-full h-full flex items-center p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <AvatarGroup users={selectedUsers} maxDisplay={maxDisplay} />
          </div>
        </div>

        {/* Dropdown overlay - positioned outside the table */}
        <div
          ref={dropdownRef}
          className="fixed z-[9999] bg-white dark:bg-gray-800 rounded-md shadow-xl ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
          style={{
            minWidth: '280px',
            maxWidth: '350px',
            maxHeight: '400px',
            position: 'fixed',
            top: '0px',
            left: '0px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="p-3 border-b border-gray-100 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Search users..."
              />
            </div>

            {/* Selected count */}
            {selectedUsers.length > 0 && (
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                {maxSelections && ` (max ${maxSelections})`}
              </div>
            )}
          </div>

          {/* User list */}
          <div className="max-h-64 overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {searchQuery ? 'No users found matching your search' : 'No users available'}
              </div>
            ) : (
              filteredUsers.map((user) => {
                const isUserSelected = selectedUsers.some(u => u.id === user.id);
                const isDisabled = !isUserSelected && maxSelections && selectedUsers.length >= maxSelections;

                return (
                  <div
                    key={user.id}
                    onClick={() => !isDisabled && handleUserToggle(user)}
                    className={`
                      px-4 py-3 text-sm cursor-pointer flex items-center gap-3
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}
                      ${isUserSelected ? 'bg-blue-50 dark:bg-blue-900/30' : ''}
                    `}
                  >
                    {/* Checkbox */}
                    <div className={`
                      w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0
                      ${isUserSelected
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300 dark:border-gray-600'
                      }
                    `}>
                      {isUserSelected && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>

                    {/* User avatar */}
                    <Avatar user={user} size={32} />

                    {/* User info */}
                    <div className="flex-grow min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Action buttons */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
            <button
              onClick={onCancelEdit}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Save button clicked');
                handleSave();
              }}
              className="px-3 py-1.5 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              Save ({selectedUsers.length})
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      ref={(el) => {
        // Connect both refs to ensure proper functionality
        cellRef.current = el;
        if (keyboardCellRef) keyboardCellRef.current = el;
      }}
      onClick={(e) => {
        console.log('EditablePeopleCell clicked');
        handleCellClick(e);
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        className,
        "cursor-pointer w-full h-full p-1 transition-colors duration-150",
        isSelected && "bg-blue-100 dark:bg-blue-900/30 rounded"
      )}
      {...ariaAttributes}
      aria-label={`${columnId}: ${value?.length || 0} users assigned`}
    >
      <AvatarGroup users={value || []} maxDisplay={maxDisplay} />
    </div>
  );
};