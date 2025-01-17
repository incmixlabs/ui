import { createId as cuid } from "@paralleldrive/cuid2"
import type { TreeNode } from "cp-react-tree-table"

import type { DemoDataItem } from "./demo-data-static"

const COMPANY_MAX = 10
const DEPARTMENT_MAX = 10
const GROUP_MAX = 5

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomBool = (): boolean => {
  return Math.random() >= 0.5
}

const fNameList = [
  "Aiden",
  "Makenzie",
  "Florence",
  "Doug",
  "Camila",
  "Violet",
  "Selena",
  "Dani",
  "Jacob",
  "Louise",
  "Owen",
  "Anais",
  "Fred",
  "Teagan",
  "Caleb",
  "William",
  "Helen",
  "Livia",
  "Ron",
  "George",
  "Michael",
  "Ethan",
  "Barry",
  "Shelby",
  "Stephanie",
  "Michael",
  "Percy",
  "Nina",
  "Daphne",
  "Aileen",
  "Margaret",
  "Sabrina",
  "Lana",
  "Evelynn",
  "Makena",
  "Jade",
  "Bob",
  "Benny",
]
const lNameList = [
  "Porter",
  "Higgs",
  "Carter",
  "Moss",
  "Devonport",
  "Curtis",
  "Rycroft",
  "Hopkinson",
  "Ellery",
  "Fall",
  "Thompson",
  "Payne",
  "Wilton",
  "Dempsey",
  "Butler",
  "Dallas",
  "Thatcher",
  "Bowen",
  "Douglas",
  "Tobin",
  "Jacobs",
  "Harvey",
  "Ryan",
  "Morris",
  "Mooney",
  "Egerton",
  "Williams",
  "Leslie",
  "Buckley",
  "Wellington",
  "Saunders",
  "Rowlands",
  "Watt",
  "Calderwood",
  "Eastwood",
  "Morley",
  "Ross",
  "Weatcroft",
]

const getRandomName = (): string => {
  return `${fNameList[getRandomInt(0, fNameList.length - 1)]} ${lNameList[getRandomInt(0, lNameList.length - 1)]}`
}

const gNameList = ["alpha", "beta", "gamma", "delta", "epsilon"]
const cNameList = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]

const getRandomCompanyName = () => {
  return `Company ${cNameList[getRandomInt(0, cNameList.length - 1)]}${cNameList[getRandomInt(0, cNameList.length - 1)]}${cNameList[getRandomInt(0, cNameList.length - 1)]}${cNameList[getRandomInt(0, cNameList.length - 1)]}`
}

const getRandomGroupName = () => {
  return `Group ${gNameList[getRandomInt(0, gNameList.length - 1)]}`
}

// Data item generators

// Data item generators

const generateGroups = (): {
  data: TreeNode<DemoDataItem>[]
  count: number
} => {
  const data: TreeNode<DemoDataItem>[] = []
  let count = 0

  for (let i = 0; i < GROUP_MAX; i++) {
    data.push({
      data: {
        id: cuid(),
        name: getRandomGroupName(),
        contact: getRandomName(),
      },
    })

    count++
  }

  return {
    data: data,
    count: count,
  }
}

const generateDepartments = (): {
  data: TreeNode<DemoDataItem>[]
  count: number
} => {
  const data: TreeNode<DemoDataItem>[] = []
  let count = 0

  for (let i = 0; i < DEPARTMENT_MAX; i++) {
    const groups = generateGroups()
    data.push({
      data: {
        id: cuid(),
        name: `Department ${i + 1}`,
        contact: getRandomName(),
      },
      children: groups.data,
    })

    count += groups.count
    count++
  }

  return {
    data: data,
    count: count,
  }
}

// Tree data generator

export const generateData = (): {
  data: TreeNode<DemoDataItem>[]
  count: number
} => {
  const data: TreeNode<DemoDataItem>[] = []
  let count = 0

  for (let i = 0; i < COMPANY_MAX; i++) {
    if (getRandomBool()) {
      const departments = generateDepartments()

      data.push({
        data: {
          id: cuid(),
          name: getRandomCompanyName(),
          contact: getRandomName(),
        },
        children: departments.data,
        height: 32,
      })

      count += departments.count
    } else {
      data.push({
        data: {
          id: cuid(),
          name: getRandomCompanyName(),
          contact: getRandomName(),
        },
        height: 32,
      })
    }

    count++
  }

  // Add a static record to showcase findRowModel & expandAncestors features
  data.push({
    data: {
      id: cuid(),
      name: "Company TEST",
      contact: "Dani Hopkinson",
    },
    height: 32,
    children: [
      {
        data: {
          id: cuid(),
          name: "Department 1",
          contact: "Livia Wilton",
        },
        children: [
          {
            data: {
              id: cuid(),
              name: "Group alpha",
              contact: "Michael Dempsey",
            },
          },
          {
            data: {
              id: cuid(),
              name: "Group beta",
              contact: "Nina Harvey",
            },
          },
          {
            data: {
              id: cuid(),
              name: "Group gamma",
              contact: "Teagan Tobin",
            },
          },
          {
            data: {
              id: cuid(),
              name: "Group delta",
              contact: "Aileen Payne",
            },
          },
          {
            data: {
              id: cuid(),
              name: "Group zeta",
              contact: "Fred Moss",
            },
          },
          {
            data: {
              id: cuid(),
              name: "Group epsilon",
              contact: "Daphne Thatcher",
            },
          },
          {
            data: {
              id: cuid(),
              name: "Group Waldo",
              contact: "Owen Ryan",
            },
          },
        ],
      },
      {
        data: {
          id: cuid(),
          name: "Department 2",
          contact: "Aileen Morley",
        },
        height: 32,
      },
    ],
  })
  count += 10

  return {
    data: data,
    count: count,
  }
}

type Root = {
  data: TreeNode<DemoDataItem>[]
  count: number
}

export function findNode(
  id: string | null,
  root: Root
): TreeNode<DemoDataItem> | undefined {
  if (id === null) return undefined
  for (const node of root.data) {
    if (node.data.id === id) {
      return node
    }
    if (node.children) {
      const found = findNode(id, { data: node.children, count: root.count })
      if (found) {
        return found
      }
    }
  }
  return undefined
}

export function findNodeParent(
  id: string,
  root: Root
): TreeNode<DemoDataItem> | "root" | undefined {
  for (const node of root.data) {
    if (node.data.id === id) {
      return "root"
    }

    if (node.children) {
      for (const child of node.children) {
        if (child.data.id === id) {
          return node
        }

        if (child.children) {
          const found = findNodeParent(id, {
            data: child.children,
            count: root.count,
          })
          if (found) {
            return found
          }
        }
      }
    }
  }

  return undefined
}

export function addChild(
  parentId: string | null,
  data: Root,
  setData: (newData: Root) => void,
  siblingId?: string
): string {
  const newData = { ...data }
  const newNode = {
    data: {
      id: cuid(),
      name: getRandomName(),
      contact: getRandomName(),
    },
  }
  const newId = newNode.data.id

  if (parentId === null) {
    if (siblingId) {
      const index = newData.data.findIndex((node) => node.data.id === siblingId)
      newData.data.splice(index + 1, 0, newNode)
    } else {
      newData.data.push(newNode)
    }
    newData.count += 1
    setData(newData)
    return newId
  }

  const node = findNode(parentId, newData)
  if (!node) return newId

  if (node.children) {
    if (siblingId) {
      const index = node.children.findIndex(
        (child) => child.data.id === siblingId
      )
      node.children.splice(index + 1, 0, newNode)
    } else {
      node.children.push(newNode)
    }
  } else {
    node.children = [newNode]
  }
  newData.count += 1
  setData(newData)
  return newId
}

export function removeChild(
  id: string,
  data: Root,
  setData: (newData: Root) => void
): void {
  const newData = { ...data }

  // Recursive function to count nodes in a subtree
  const countSubtree = (node: TreeNode<DemoDataItem>): number => {
    let count = 1
    if (node.children) {
      count += node.children.reduce(
        (acc, child) => acc + countSubtree(child),
        0
      )
    }
    return count
  }

  // Recursive function to remove node by ID at any depth
  const removeNodeById = (nodes: TreeNode<DemoDataItem>[]): boolean => {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].data.id === id) {
        const removedCount = countSubtree(nodes[i])
        nodes.splice(i, 1)
        newData.count -= removedCount
        return true
      }
      const children = nodes[i].children
      if (children?.length) {
        if (removeNodeById(children)) {
          return true
        }
      }
    }
    return false
  }

  removeNodeById(newData.data)
  setData(newData)
}

export function addChildToTree(
  parentId: string | null,
  content: { data: TreeNode<DemoDataItem>[] },
  setContent: (content: { data: TreeNode<DemoDataItem>[] }) => void
): string {
  const newId = cuid()
  const newNode: TreeNode<DemoDataItem> = {
    data: {
      id: newId,
      name: `New Item ${newId}`,
      contact: "",
    },
    children: [],
  }

  if (parentId === null) {
    setContent({
      data: [...content.data, newNode],
    })
    return newId
  }

  const newContent = { ...content }
  const parentNode = findNode(parentId, { data: newContent.data, count: 0 })

  if (!parentNode) {
    return newId
  }

  if (parentNode.children) {
    parentNode.children.push(newNode)
  } else {
    parentNode.children = [newNode]
  }

  setContent(newContent)
  return newId
}
