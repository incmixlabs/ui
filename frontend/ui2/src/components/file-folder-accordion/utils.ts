import { createId as cuid } from "@paralleldrive/cuid2"
import type {
  BuildingEnvironmentVariable,
  BuildingEnvironmentVariableRoot,
  EnvironmentVariable,
  EnvironmentVariableFolder,
  EnvironmentVariableLeaf,
  EnvironmentVariableRoot,
  Id,
  Label,
} from "./types"

export const getEnvironmentVariablePath = (
  root: EnvironmentVariableRoot,
  environmentVariable: EnvironmentVariable | EnvironmentVariableRoot
): string[] => {
  if (environmentVariable.type === "root") {
    return []
  }

  if (root.id === environmentVariable.parent) {
    return [environmentVariable.label]
  }

  const parent = root.variables.get(environmentVariable.parent)

  if (!parent) {
    throw new Error(
      `Could not find parent of environment variable ${environmentVariable.label}`
    )
  }

  return [
    ...getEnvironmentVariablePath(root, parent),
    environmentVariable.label,
  ]
}

export const mapEnvironmentVariable = <L, F>({
  root,
  environmentVariable,
  path,
  leafMap,
  folderMap,
}: {
  root: EnvironmentVariableRoot
  environmentVariable: EnvironmentVariable
  path: string[]
  leafMap: (leaf: EnvironmentVariableLeaf, path: string[]) => L
  folderMap: (
    folder: EnvironmentVariableFolder,
    transformedChildren: Map<string, L | F>,
    path: string[]
  ) => F
}): L | F => {
  if (environmentVariable.type === "leaf") {
    return leafMap(environmentVariable, path)
  }

  const transformedChildren: Map<string, L | F> = new Map(
    Array.from(environmentVariable.children).map(([key, childId]) => {
      const child = root.variables.get(childId)

      if (!child) {
        throw new Error(
          `Could not find child of environment variable ${environmentVariable.label}`
        )
      }

      return [
        key,
        mapEnvironmentVariable({
          root,
          environmentVariable: child,
          path: [...path, environmentVariable.label],
          leafMap,
          folderMap,
        }),
      ]
    })
  )

  return folderMap(environmentVariable, transformedChildren, path)
}

export const buildEnvironmentVariable = (
  root: BuildingEnvironmentVariableRoot
): EnvironmentVariableRoot => {
  const newRoot: EnvironmentVariableRoot = {
    type: "root",
    label: "root",
    id: cuid(),
    children: new Map(),
    variables: new Map(),
  }

  const _buildEnvironmentVariable = (
    current: BuildingEnvironmentVariable,
    parent: EnvironmentVariableFolder | EnvironmentVariableRoot
  ): EnvironmentVariable => {
    if (current.type === "leaf") {
      const node: EnvironmentVariableLeaf = {
        type: "leaf",
        label: current.label,
        id: cuid(),
        value: current.value,
        parent: parent.id,
      }

      newRoot.variables.set(node.id, node)

      return node
    }

    const node: EnvironmentVariableFolder = {
      type: "folder",
      label: current.label,
      id: cuid(),
      children: new Map(),
      parent: parent.id,
    }

    const children = current.children.map((child) =>
      _buildEnvironmentVariable(child, node)
    )

    node.children = new Map(children.map((child) => [child.label, child.id]))

    newRoot.variables.set(node.id, node)

    return node
  }

  const children = root.children.map((child) =>
    _buildEnvironmentVariable(child, newRoot)
  )

  newRoot.children = new Map(children.map((child) => [child.label, child.id]))

  return newRoot
}

export const findEnvironmentVariable = (
  root: EnvironmentVariableRoot,
  path: string[]
): EnvironmentVariable | EnvironmentVariableRoot | null => {
  const _findEnvironmentVariable = (
    root: EnvironmentVariableRoot,
    node: EnvironmentVariableRoot | EnvironmentVariable,
    path: string[]
  ): EnvironmentVariable | EnvironmentVariableRoot | null => {
    if (node.type === "leaf") {
      return null
    }

    const [pathHead, ...pathTail] = path

    if (pathHead === undefined) {
      return node
    }

    const childId = node.children.get(pathHead)

    if (!childId) {
      return null
    }

    const child = root.variables.get(childId)

    if (!child) {
      return null
    }

    if (pathTail.length === 0) {
      return child
    }

    return _findEnvironmentVariable(root, child, pathTail)
  }

  return _findEnvironmentVariable(root, root, path)
}

export const addEnvironmentVariable = (
  root: EnvironmentVariableRoot,
  path: string[],
  args:
    | {
        type: "leaf"
        label: string
        value: string
      }
    | {
        type: "folder"
        label: string
        children: Map<Label, Id>
      }
): void => {
  const parent = findEnvironmentVariable(root, path)

  if (!parent) {
    throw new Error(`No node found on path ${path}`)
  }

  if (parent.type === "leaf") {
    throw new Error(`Node on path ${path} is a leaf`)
  }

  if (parent.children.has(args.label)) {
    throw new Error(
      `Node on path ${path} already has a child with label ${args.label}`
    )
  }

  if (args.type === "folder") {
    const newChildren: Map<string, Id> = new Map(
      Array.from(args.children).map(([label, childId]) => {
        const child = root.variables.get(childId)

        if (!child) {
          throw new Error(
            `Could not find child of environment variable ${parent.label}`
          )
        }

        return [label, childId]
      })
    )

    const newVariable: EnvironmentVariableFolder = {
      type: "folder",
      label: args.label,
      id: cuid(),
      children: newChildren,
      parent: parent.id,
    }

    parent.children.set(args.label, newVariable.id)
    root.variables.set(newVariable.id, newVariable)
  } else {
    const newVariable: EnvironmentVariableLeaf = {
      type: "leaf",
      label: args.label,
      id: cuid(),
      value: args.value,
      parent: parent.id,
    }

    parent.children.set(args.label, newVariable.id)
    root.variables.set(newVariable.id, newVariable)
  }
}

export const deleteEnvironmentVariable = (
  root: EnvironmentVariableRoot,
  path: string[]
): void => {
  const node = findEnvironmentVariable(root, path)

  if (!node) {
    throw new Error(`No node found on path ${path.join("/")}`)
  }

  if (node.type === "root") {
    throw new Error("Cannot delete root node")
  }

  const parent =
    root.id === node.parent ? root : root.variables.get(node.parent)

  if (!parent) {
    throw new Error(
      `Could not find parent of environment variable ${node.label}`
    )
  }

  if (parent.type === "leaf") {
    throw new Error("Parent of node is a leaf")
  }

  parent.children.delete(node.label)
  root.variables.delete(node.id)
}

export const updateEnvironmentVariable = (
  root: EnvironmentVariableRoot,
  path: string[],
  args:
    | {
        type: "leaf"
        label?: string
        value?: string
      }
    | {
        type: "folder"
        label?: string
      }
): void => {
  const node = findEnvironmentVariable(root, path)

  if (!node) {
    throw new Error(`No node found on path ${path}`)
  }

  if (args.type !== node.type) {
    throw new Error(
      `Node on path ${path} is of type ${node.type}, while trying to update it to ${args.type}`
    )
  }

  const swapLabel = (label: string) => {
    const parent =
      node.parent === root.id ? root : root.variables.get(node.parent)

    if (!parent) {
      throw new Error(
        `Could not find parent of environment variable ${node.label}`
      )
    }

    if (parent.type === "leaf") {
      throw new Error("Parent of node is a leaf")
    }

    parent.children.delete(node.label)
    parent.children.set(label, node.id)

    node.label = label
  }

  if (args.type === "folder") {
    if (node.type === "leaf") {
      throw new Error(
        `Node on path ${path} is a folder, while trying to update it as a leaf`
      )
    }

    if (args.label) {
      swapLabel(args.label)
    }
  } else {
    if (node.type === "folder") {
      throw new Error(
        `Node on path ${path} is a folder, while trying to update a folder`
      )
    }

    if (args.label) {
      swapLabel(args.label)
    }

    if (args.value) {
      node.value = args.value
    }
  }
}
