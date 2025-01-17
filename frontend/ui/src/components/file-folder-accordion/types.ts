export type Id = string
export type Label = string

export type EnvironmentVariable =
  | EnvironmentVariableFolder
  | EnvironmentVariableLeaf

export type EnvironmentVariableRoot = {
  type: "root"
  label: "root"
  id: Id
  variables: Map<Id, EnvironmentVariable>
  children: Map<Label, Id>
}

export type EnvironmentVariableFolder = {
  type: "folder"
  label: Label
  id: Id
  parent: Id
  children: Map<Label, Id>
}

export type EnvironmentVariableLeaf = {
  type: "leaf"
  label: Label
  id: Id
  parent: Id
  value: string
}

export type BuildingEnvironmentVariableRoot = {
  children: BuildingEnvironmentVariable[]
}

export type BuildingEnvironmentVariableFolder = {
  type: "folder"
  label: string
  children: BuildingEnvironmentVariable[]
}

export type BuildingEnvironmentVariableLeaf = {
  type: "leaf"
  label: string
  value: string
}

export type BuildingEnvironmentVariable =
  | BuildingEnvironmentVariableFolder
  | BuildingEnvironmentVariableLeaf
