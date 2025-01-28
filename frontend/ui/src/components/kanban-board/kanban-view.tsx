import { FC, Fragment } from 'react';
import { Clock } from 'lucide-react';

import { AvatarGroup } from "@components/avatar-group"
import { Image } from "@components/card/flow-card"
import { KanbanBoardTask } from './types';

export type KanbanViewProps = {
  task: KanbanBoardTask
}
export const KanbanView: FC = ({task}:KanbanViewProps ) => {
  debugger;
  console.log("members", task.members)
  console.log("description", task.description)
  const daysLeft = `\u00A0 ${task.daysLeft} days left`
  return (
  <div
    key={task.id}
    className="mb-4 w-[28rem] cursor-grab rounded-lg bg-white p-5 shadow dark:bg-gray-800"
  >
    <div className="flex items-center justify-between pb-4">
      <div className="text-base font-semibold text-gray-900 dark:text-white">
        {task.name}
      </div>
    </div>
    <div className="flex flex-col">
      {!!task.attachment && (
        <div className="relative mb-3 aspect-video w-full">
          <Image
            imgAlt=""
            fill
            imgSrc={task.attachment}
            className="rounded-lg"
          />
        </div>
      )}
      <div className="pb-4 text-sm font-normal text-gray-700 dark:text-gray-400">
        {task.description}
      </div>
      <div className="flex justify-between">
        <div className="flex items-center justify-start">
          <AvatarGroup size="2" layout="stack" users={task.members} maxVisible={3}/>
        </div>
        <div className="flex items-center justify-center rounded-lg bg-purple-100 px-3 text-sm font-medium text-purple-800 dark:bg-purple-200">
          <Clock width="12px" height='12px' /> {daysLeft}
        </div>
      </div>
    </div>
  </div>
  )
}


