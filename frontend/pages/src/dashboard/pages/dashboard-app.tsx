import { Box, CardContainer, cn, ComponentSlot, dashboardImg, initialLayouts } from "@incmix/ui";
import { useState, useMemo, useEffect } from "react";
import RGL, { WidthProvider, Layout } from "react-grid-layout";
import {
  ActiveTask,
  NewTasks,
  PostingTask,
  ProjectWidgets2,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
  UserPanelOverview,
} from "@incmix/ui/widgets"
const ReactGridLayout = WidthProvider(RGL);


export default function DashboardApp({isEditing}: {isEditing: boolean}) {

  const [count, setCount] = useState(0);
 const [layout, setLayout] = useState<Layout[]>(
    initialLayouts.lg.map((item) => ({
      ...item,
      static: true, // default everything is static: true
    }))
  );

  const [nestedLayouts, setNestedLayouts] = useState<Record<string, Layout[]>>({
    "grid-1": [
      { w: 12, h: 6, x: 0, y: 0, i: "0|grid-a", moved: false, static: true  },
      { w: 12, h: 5, x: 0, y: 6, i: "1|grid-b", moved: false, static: true  },
    ],
  });


  useEffect(() => {
    setLayout((prev) =>
      prev.map((item) => ({
        ...item,
        static: !isEditing, // if editing → static false, otherwise true
      }))
    );
    setNestedLayouts((prev) => {
      const updated: Record<string, Layout[]> = {};
      for (const key in prev) {
        updated[key] = prev[key].map((item) => ({
          ...item,
          static: !isEditing,
        }));
      }
      return updated;
    });
  }, [isEditing]);
    const [gridComponents, setGridComponents] = useState<ComponentSlot[]>([
      {
        slotId: "c",
        component: <ProjectWidgets2 />,
        title: "Project Widgets",
        compImage: dashboardImg?.ProjectImg,
      },
      {
        slotId: "d",
        component: <StatisticWidgets2 />,
        title: "Statistic Widgets",
        compImage: dashboardImg?.statisticsImg,
      },
      {
        slotId: "e",
        component: <ActiveTask />,
        compImage: dashboardImg?.activeTaskImg,
        title: "Active Task",
      },
      {
        slotId: "f",
        component: <TotalProject />,
        compImage: dashboardImg?.totalProjectImg,
        title: "Total Project",
      },
      {
        slotId: "g",
        component: <PostingTask />,
        title: "Posting Task",
        compImage: dashboardImg?.postingTaskImg,
      },
      {
        slotId: "h",
        component: <UserPanelOverview />,
        title: "User Panel Overview",
        compImage: dashboardImg?.postingTaskImg,
      },
      // Adding nested components for the first two grid items
      {
        slotId: "0|grid-a",
        component: <NewTasks />,
        title: "Nested New Tasks 1",
        compImage: dashboardImg?.newTaskImg,
      },
      {
        slotId: "1|grid-b",
        component: <TotalTasks />,
        title: "Nested New Tasks 2",
        compImage: dashboardImg?.newTaskImg,
      },
    
    ])
  
  // for nested layouts, handle the layout change manually
  const onLayoutChange = (newLayout: Layout[],itemKey: string) => {
    setLayout(newLayout);
    if (onNestedLayoutChange) {
      onNestedLayoutChange(newLayout, itemKey);
    }
  };

  const onNestedLayoutChange = (nestedLayout: Layout[], itemKey: string) => {
    const index = layout.findIndex((item) => item.i === itemKey);
    if (index !== -1) {
      const updatedItem = {
        ...layout[index],
        layout: nestedLayout,
      };
      const updatedLayout = [...layout];
      updatedLayout[index] = updatedItem;
      setLayout(updatedLayout);
    }
    console.log("Nested layout changed for", itemKey, nestedLayout);
  };

  // const addItem = () => {
  //   setCount(count + 1);
  //   setLayout([
  //     ...layout,
  //     {
  //       i: `${count}${itemKey ? `|${itemKey}` : ""}`,
  //       x: (layout.length * 2) % 12,
  //       y: Infinity,
  //       w: 2,
  //       h: 2,
  //     },
  //   ]);
  // };

  // const addGridItem = () => {
  //   setCount(count + 1);
  //   setLayout([
  //     ...layout,
  //     {
  //       i: `grid-${count}${itemKey ? `|${itemKey}` : ""}`,
  //       x: (layout.length * 2) % 12,
  //       y: Infinity,
  //       w: 5,
  //       h: 5,
  //       layout: [],
  //     },
  //   ]);
  // };

  const generateDOM = () => {
    return layout.map((item) => {
      const gridComponent = gridComponents.find((comp) => comp.slotId === item.i);
      if (item.i.startsWith("grid-")) {
        const nested = nestedLayouts[item.i] || [];
        // console.log("Nested for", item.i, nested);
  
        return (
          <Box key={item.i} className={cn("",isEditing && "rounded-lg bg-gray-8 p-0 shadow")}>
            <ReactGridLayout
              className="nested-layout"
              layout={nested}
              cols={12}
              rowHeight={30}
              width={800}
              onDragStart={(a, b, c, d, e) => {
                e.stopPropagation();
              }}
              onResizeStart={(a, b, c, d, e) => {
                e.stopPropagation();
              }}
              onLayoutChange={(nestedLayout) =>
                onNestedLayoutChange(nestedLayout, item.i)
              }
              resizeHandles={['n', 's', 'e', 'w']}
            >
             {nested.map((nestedItem) => {
              const nestedComponent = gridComponents.find(
                (comp) => comp.slotId === nestedItem.i
              );

              return (
                <Box key={nestedItem.i} className={cn("",isEditing && "rounded-lg bg-gray-2 p-0 shadow")}>
                  {nestedComponent ? nestedComponent.component : <span>{nestedItem.i}</span>}
                </Box>
              );
            })}
            </ReactGridLayout>
          </Box>
        );
      } else {
        return (
          <Box key={item.i} className={cn("",isEditing && "rounded-lg bg-gray-5 p-0 shadow")}>
              {gridComponent ? gridComponent.component : <span>{item.i}</span>}
          </Box>
        );
      }
    });
  };

console.log(layout);

  return (
    <>
  
      {/* {!props.nested && (
        <>
          <button onClick={addItem}>Add Item</button>
          <button onClick={addGridItem}>Add Grid Item</button>
        </>
      )} */}
      <ReactGridLayout
        onDragStart={(a, b, c, d, e) => e.stopPropagation()}
        layout={layout}
        onLayoutChange={onLayoutChange}
        className="layout"
        rowHeight={30}
        cols={12}
        resizeHandles={['n', 's', 'e', 'w']}

      >
        {generateDOM()}
      </ReactGridLayout>
    </>
  );
}
