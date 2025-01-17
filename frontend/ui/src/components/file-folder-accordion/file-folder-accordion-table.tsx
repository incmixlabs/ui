import { type FunctionComponent, useEffect, useRef, useState } from "react"

import {
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
} from "@radix-ui/react-icons"
import { Box, Flex, Text, TextField } from "@radix-ui/themes"
import {
  type Row,
  type TreeNode,
  TreeState,
  TreeTable,
} from "cp-react-tree-table"
import {
  addChild as addChildToTree,
  generateData,
  removeChild as removeChildFromTree,
} from "./demo-data-gen"
import type { DemoDataItem } from "./demo-data-static"

import "./table.css"
import { Button } from "../button/button"

const GENERATED_CONTENT = generateData()
const Demo: FunctionComponent = () => {
  const [content, setContent] = useState(GENERATED_CONTENT)

  const [treeState, setTreeState] = useState<Readonly<TreeState<DemoDataItem>>>(
    TreeState.create<DemoDataItem>(content.data)
  )
  const treeTableRef = useRef<TreeTable<DemoDataItem>>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [expandedNodeIds, setExpandedNodeIds] = useState<Set<string>>(new Set())
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(
    null
  )

  useEffect(() => {
    let newTreeState = TreeState.create<DemoDataItem>(content.data)

    // Expand all previously expanded nodes that still exist.
    expandedNodeIds.forEach((id) => {
      const node = findNodeById(content.data, id)
      if (node) {
        const rowModel = newTreeState.findRowModel(node)
        if (rowModel) {
          // First expand ancestors
          newTreeState = TreeState.expandAncestors(newTreeState, rowModel)
          // Then expand the node itself using TreeState.toggleChildren
          newTreeState = TreeState.toggleChildren(newTreeState, rowModel)
        }
      }
    })

    setTreeState(newTreeState)
  }, [content, expandedNodeIds])

  const findNodeById = (
    nodes: TreeNode<DemoDataItem>[],
    id: string
  ): TreeNode<DemoDataItem> | null => {
    for (const node of nodes) {
      if (node.data.id === id) return node
      if (node.children) {
        const found = findNodeById(node.children, id)
        if (found) return found
      }
    }
    return null
  }

  const renderHeaderCell = (name: string, alignLeft = true) => {
    return () => {
      return (
        <Text className={alignLeft ? "align-left" : "align-right"}>{name}</Text>
      )
    }
  }

  const renderIndexCell = (row: Row<DemoDataItem>) => {
    return (
      <Flex
        align="center"
        onClick={() => {
          // Track expanded state before toggling
          if (row.$state.isExpanded) {
            setExpandedNodeIds((prev) => {
              const next = new Set(prev)
              next.delete(row.data.id)
              return next
            })
          } else {
            setExpandedNodeIds((prev) => {
              const next = new Set(prev)
              next.add(row.data.id)
              return next
            })
          }
          row.toggleChildren()
        }}
        className="cursor-pointer gap-2 text-gray-12"
      >
        {row.metadata.hasChildren ? (
          row.$state.isExpanded ? (
            <ChevronDownIcon className="size-4" />
          ) : (
            <ChevronRightIcon className="size-4" />
          )
        ) : (
          <Box className="size-4" />
        )}
        <Flex
          style={{
            paddingLeft: `${row.metadata.depth * 10}px`,
            animation:
              row.data.id === highlightedNodeId
                ? "blink-highlight 1s ease-in-out 2"
                : "none",
          }}
          className="text-gray-12"
        >
          <Text className="truncate font-bold">{row.data.name}</Text>
        </Flex>
      </Flex>
    )
  }

  const renderEditableCell = (row: Row<DemoDataItem>) => {
    return (
      <TextField.Root
        type="text"
        value={row.data.contact}
        variant="soft"
        color="gray"
        className="h-6 truncate"
        onChange={(event) => {
          row.updateData({
            ...row.data,
            contact: event.target.value,
          })
        }}
      />
    )
  }

  const renderActionsCell = (row: Row<DemoDataItem>) => {
    return (
      <Flex gap="2">
        <Button
          color="green"
          variant="ghost"
          radius="full"
          className="size-3"
          onClick={() => {
            const parentId = findParentId(content.data, row.data.id)
            const newNodeId = addChildToTree(
              parentId,
              content,
              setContent,
              row.data.id
            )
            if (newNodeId) scrollToNode(newNodeId)
          }}
          title="Add sibling"
        >
          <PlusIcon className="size-3" />
        </Button>

        <Button
          color="green"
          variant="ghost"
          radius="full"
          className="size-3"
          onClick={() => {
            if (!row.$state.isExpanded) {
              setExpandedNodeIds((prev) => {
                const next = new Set(prev)
                next.add(row.data.id)
                return next
              })
            }
            const newNodeId = addChildToTree(row.data.id, content, setContent)
            if (newNodeId) scrollToNode(newNodeId)
          }}
          title="Add child"
        >
          <ArrowRightIcon className="size-3" />
        </Button>

        <Button
          color="red"
          variant="ghost"
          radius="full"
          className="size-3"
          onClick={() => removeChildFromTree(row.data.id, content, setContent)}
          title="Remove"
        >
          <MinusIcon className="size-3" />
        </Button>
      </Flex>
    )
  }

  const findParentId = (
    nodes: TreeNode<DemoDataItem>[],
    targetId: string,
    parentId: string | null = null
  ): string | null => {
    for (const node of nodes) {
      if (node.data.id === targetId) return parentId
      if (node.children) {
        const found = findParentId(node.children, targetId, node.data.id)
        if (found !== null) return found
      }
    }
    return null
  }

  const [nodeScheduledForFocus, setNodeScheduledForFocus] = useState<
    { node: TreeNode<DemoDataItem>; hasRendered: boolean } | undefined
  >()

  // Smooth scroll to the node when it is scheduled for focus.
  useEffect(() => {
    if (nodeScheduledForFocus != null) {
      if (nodeScheduledForFocus.hasRendered) {
        const currentRowModel = treeState.findRowModel(
          nodeScheduledForFocus.node
        )
        if (currentRowModel != null && viewportRef.current) {
          const viewport = viewportRef.current.querySelector(
            ".cp_tree-table_viewport"
          ) as HTMLElement

          if (viewport) {
            // Calculate the center position
            const viewportHeight = viewport.clientHeight
            const rowPosition = currentRowModel.$state.top
            const scrollPosition = rowPosition - viewportHeight / 2

            // Scroll to the node
            viewport.scrollTo({
              top: Math.max(0, scrollPosition),
              behavior: "smooth",
            })

            // Start the highlight animation after scrolling completes
            setTimeout(() => {
              setHighlightedNodeId(nodeScheduledForFocus.node.data.id)
              setTimeout(() => {
                setHighlightedNodeId(null)
              }, 2000) // Full animation duration
            }, 250) // Approximate scroll duration
          }
        }
        setNodeScheduledForFocus(undefined)
      } else {
        setNodeScheduledForFocus((prev) => {
          if (!prev) return undefined
          return {
            node: prev.node,
            hasRendered: true,
          }
        })
      }
    }
  }, [nodeScheduledForFocus, treeState])

  const scrollToNode = (nodeId: string) => {
    const node = findNodeById(content.data, nodeId)
    if (node) {
      setNodeScheduledForFocus({ node, hasRendered: false })
    }
  }

  return (
    <Box ref={viewportRef}>
      <Flex justify="end" mb="3">
        <Button
          color="green"
          variant="soft"
          onClick={() => {
            const newNodeId = addChildToTree(null, content, setContent)
            if (newNodeId) scrollToNode(newNodeId)
          }}
        >
          <PlusIcon className="size-4" />
          <Text ml="2">New Entry</Text>
        </Button>
      </Flex>

      <TreeTable<DemoDataItem>
        className="demo-tree-table w-10/12"
        height={360}
        headerHeight={32}
        ref={treeTableRef}
        value={treeState}
        onChange={(newVal: TreeState<DemoDataItem>) => {
          setTreeState(newVal)
        }}
      >
        <TreeTable.Column
          renderCell={renderIndexCell}
          renderHeaderCell={renderHeaderCell("Name")}
          basis="180px"
          grow={0}
        />
        <TreeTable.Column
          renderCell={renderEditableCell}
          renderHeaderCell={renderHeaderCell("Contact person")}
        />
        <TreeTable.Column
          renderCell={renderActionsCell}
          renderHeaderCell={renderHeaderCell("Actions")}
        />
      </TreeTable>
    </Box>
  )
}

export default Demo
