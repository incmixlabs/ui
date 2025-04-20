import {
  Fragment,
  type FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react"

import { Box, Button, Flex, Text, TextField } from "@incmix/ui"
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import {
  type Row,
  type TreeNode,
  TreeState,
  TreeTable,
} from "cp-react-tree-table"
import { generateData } from "./demo-data-gen"
import type { DemoDataItem } from "./demo-data-static"

import "./table.css"

const GENERATED_CONTENT = generateData()
const Demo: FunctionComponent = () => {
  const [treeState, setTreeState] = useState<Readonly<TreeState<DemoDataItem>>>(
    TreeState.create<DemoDataItem>(GENERATED_CONTENT.data)
  )
  const treeTableRef = useRef<TreeTable<DemoDataItem>>(null)

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
        onClick={row.toggleChildren}
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
        <Flex style={{ paddingLeft: `${row.metadata.depth * 15}px` }}>
          <Text className={"font-bold"}>{row.data.name}</Text>
        </Flex>
      </Flex>
    )
  }

  const renderEdiTableCell = (row: Row<DemoDataItem>) => {
    return (
      <TextField.Root
        type="text"
        value={row.data.contact}
        variant="soft"
        color="gray"
        className="h-6"
        onChange={(event) => {
          // .updateData will notify the TreeTable instance to dispatch an onChange call with
          // with a new value which includes the patched row data. The change will be visible
          // if the new value is picked up and passed through TreeTable's value prop.
          row.updateData({
            ...row.data,
            contact: event.target.value,
          })
        }}
      />
    )
  }

  // Action handlers
  const handleOnExpandAll = () => {
    setTreeState((prev) => TreeState.expandAll(prev))
  }

  const handleOnCollapseAll = () => {
    setTreeState((prev) => TreeState.collapseAll(prev))
  }

  // Scrolling to a specific node

  const [nodeScheduledForFocus, setNodeScheduledForFocus] = useState<
    { node: TreeNode<DemoDataItem>; hasRendered: boolean } | undefined
  >()
  useEffect(() => {
    if (nodeScheduledForFocus != null) {
      if (nodeScheduledForFocus.hasRendered) {
        const currentRowModel = treeState.findRowModel(
          nodeScheduledForFocus.node
        )
        if (currentRowModel != null) {
          treeTableRef.current?.scrollTo(currentRowModel.$state.top)
        }
        setNodeScheduledForFocus(undefined)
      } else {
        setNodeScheduledForFocus((_) => ({
          node: nodeScheduledForFocus.node,
          hasRendered: true,
        }))
      }
    }
  }, [nodeScheduledForFocus, treeState])

  return (
    <Fragment>
      <Flex className="gap-2">
        <Button color="gray" onClick={handleOnExpandAll} className="flex-3">
          Expand all
        </Button>
        <Button color="gray" onClick={handleOnCollapseAll}>
          Collapse all
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
          renderCell={renderEdiTableCell}
          renderHeaderCell={renderHeaderCell("Contact person")}
        />
      </TreeTable>
    </Fragment>
  )
}

export default Demo
