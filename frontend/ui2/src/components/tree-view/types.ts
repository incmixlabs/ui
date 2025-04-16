/* eslint-disable @typescript-eslint/no-explicit-any */
export type FormFieldConfig = {
  name: string
  label: string
  type: "text" | "textarea"
  placeholder?: string
  required?: boolean
}

export type TreeItemFile<T = Record<string, string>> = {
  type: "file"
  id: string
  name: string
  icon?: any
  selectedIcon?: any
  openIcon?: any
  actions?: React.ReactNode
  onClick?: () => void
  expanded?: boolean
  data?: T
}

export type TreeItemFolder<
  T = Record<string, string>,
  U = Record<string, string>,
> = {
  type: "folder"
  id: string
  name: string
  children: TreeDataItem<T, U>[]
  icon?: any
  selectedIcon?: any
  openIcon?: any
  actions?: React.ReactNode
  onClick?: () => void
  expanded?: boolean
  data?: U
}

export type TreeDataItem<
  T = Record<string, string>,
  U = Record<string, string>,
> = TreeItemFile<T> | TreeItemFolder<T, U>

export type TreeViewDescriptions = {
  above: string
  below: string
  inside: string
  edit: string
  delete: string
  name: string
  value: string
  notes: string
  createFileContextMenu: string
  createFolderContextMenu: string
  newFileTitle: string
  newFolderTitle: string
  editFileTitle: string
  editFolderTitle: string
}

export type TreeViewContextType = {
  fileFields: FormFieldConfig[]
  folderFields: FormFieldConfig[]
  descriptions: TreeViewDescriptions
}
