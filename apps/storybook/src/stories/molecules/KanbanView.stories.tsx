import { KanbanView } from "@incmix/ui/kanban-view"
import type { Meta, StoryObj } from "@storybook/react"
import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { CleanupFn } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { unsafeOverflowAutoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/unsafe-overflow/element';
import invariant from 'tiny-invariant';

import data from "../../data/kanban"
import { KanbanBoard } from "@incmix/ui";



const meta: Meta<typeof KanbanView> = {
  title: "Pages/KanbanView",
  component: KanbanView,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof KanbanView>
const tasks = data[0].tasks

export const All: Story = {
  render: () => {
    return (
      <>
        {/* <KanbanView task={tasks[0]} />
        <KanbanView task={tasks[1]} /> */}
        <KanbanBoard/>
      </>
    )
  },
}