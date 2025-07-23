import { useAppearanceStore } from "@incmix/store/use-settings-store";

import {
    ActiveTask,
    NewTasks,
    PostingTask,
    TotalProject,
    TotalTasksChart,
    TotalTasks,
    ProjectListWidgets,
    ProjectTimelineWidgets,
    NewTasksChart,
    UserProfile,
    CalendarWidget,
    RecentActivity,
    ActivityTimeline,
    SubscribersByCountries,
    MonthlyBudget,
    LiveVisitors,
    InProgressTask,
    DoneTasks,
    ProjectWidgets,
    StatisticWidgets,
    BarStatisticWidgets,
    ClockWidget,
    BatteryWidget,
    WeatherWidget,
    NewsWidget,
    PropertySheet,
  } from "@incmix/ui/widgets";


export  const rootDir = '/images/dashboard/'

export const getWidgets = () => {
  const isDark =  useAppearanceStore.getState().getIsDarkAppearance();
  const dir = isDark ? `${rootDir}/dark` : `${rootDir}/light`

  return {
    "new-tasks": {
      slotId: "i",
      component: <NewTasks />,
      componentName: "new-tasks",
      image: `${dir}/new-task.svg`,
      dragPreviewSize: "w-16 h-16 text-xs",
      title: "New Tasks",
      tags: ["task", "new", "todo"],
      layouts: {
        lg: { w: 3, h: 14 },
        md: { w: 3, h: 14 },
        sm: { w: 3, h: 14 },
        xs: { w: 3, h: 14 },
        xxs: { w: 3, h: 14 },
      },
      className: "col-span-3",
    },
    "new-tasks-chart": {
      slotId: "p",
      component: <NewTasksChart />,
      componentName: "new-tasks-chart",
      image: `${dir}/new-task-chart.svg`,
      title: "New Tasks Chart",
      tags: ["task", "new", "todo"],
      layouts: {
        lg: { w: 3, h: 14 },
        md: { w: 3, h: 14 },
        sm: { w: 3, h: 14 },
        xs: { w: 3, h: 14 },
        xxs: { w: 3, h: 14 },
      },
      className: "col-span-3",
    },
    "total-tasks": {
      slotId: "h",
      component: <TotalTasks />,
      componentName: "total-tasks",
      image: `${dir}/total-tasks.svg`,
      title: "Total Tasks",
      tags: ["task", "total", "summary"],
      layouts: {
        lg: { w: 3, h: 14 },
        md: { w: 3, h: 14 },
        sm: { w: 3, h: 14 },
        xs: { w: 3, h: 14 },
        xxs: { w: 3, h: 14 },
      },
      className: "col-span-3",
    },
    "total-tasks-chart": {
      slotId: "q",
      component: <TotalTasksChart />,
      componentName: "total-tasks-chart",
      image:  `${dir}/total-task-chart.svg`,
      title: "Total Tasks Chart",
      tags: ["task", "total", "summary"],
      layouts: {
        lg: { w: 3, h: 14 },
        md: { w: 3, h: 14 },
        sm: { w: 3, h: 14 },
        xs: { w: 3, h: 14 },
        xxs: { w: 3, h: 14 },
      },
      className: "col-span-3",
    },
    "tasks-in-progress": {
      slotId: "tp",
      component: <InProgressTask />,
      componentName: "tasks-in-progress",
      image: `${dir}/in-progress-tasks.svg`,
      title: "Tasks In Progress",
      tags: ["task", "total", "in-progress"],
      layouts: {
        lg: { w: 3, h: 14 },
        md: { w: 3, h: 14 },
        sm: { w: 3, h: 14 },
        xs: { w: 3, h: 14 },
        xxs: { w: 3, h: 14 },
      },
      className: "col-span-3",
    },
    "tasks-done": {
      slotId: "s",
      component: <DoneTasks />,
      componentName: "tasks-done",
      image: `${dir}/done-tasks.svg`,
      title: "Tasks Done",
      tags: ["task", "task-done", "done"],
      layouts: {
        lg: { w: 3, h: 14 },
        md: { w: 3, h: 14 },
        sm: { w: 3, h: 14 },
        xs: { w: 3, h: 14 },
        xxs: { w: 3, h: 14 },
      },
      className: "col-span-3",
    },
    "user-profile": {
      slotId: "usp",
      component: <UserProfile />,
      componentName: "user-profile",
      image: `${dir}/profile.svg`,
      title: "Profile",
      tags: ["profile","user-profile"],
      layouts: {
        lg: { w: 4, h: 6 },
        md: { w: 4, h: 6 },
        sm: { w: 4, h: 6 },
        xs: { w: 4, h: 6 },
        xxs: { w: 4, h: 6 },
      },
      className: "col-span-6",
    },
    "total-project": {
      slotId: "m",
      component: <TotalProject />,
      componentName: "total-project",
      image: `${dir}/total-project.svg`,
      title: "Total Project",
      tags: ["project", "total", "summary"],
      layouts: {
        lg: { w: 4, h: 22 },
        md: { w: 4, h: 22 },
        sm: { w: 4, h: 22 },
        xs: { w: 4, h: 22 },
        xxs: { w: 4, h: 22 },
      },
      className:"col-span-6"
    },
    "statistic-widget": {
      slotId: "k",
      component: <StatisticWidgets />,
      componentName: "statistic-widget",
      image: `${dir}/statistic.svg`,
      title: "Statistic Widgets",
      tags: ["statistics", "analytics", "data"],
      layouts: {
        lg: { w: 4, h: 22 },
        md: { w: 4, h: 22 },
        sm: { w: 4, h: 22 },
        xs: { w: 4, h: 22 },
        xxs: { w: 4, h: 22 },
      },
      className:"col-span-6"
    },
    "active-task": {
      slotId: "l",
      component: <ActiveTask />,
      componentName: "active-task",
      image: `${dir}/active-tasks.svg`,
      title: "Active Tasks",
      tags: ["task", "active", "ongoing"],
      layouts: {
        lg: { w: 4, h: 22 },
        md: { w: 4, h: 22 },
        sm: { w: 4, h: 22 },
        xs: { w: 4, h: 22 },
        xxs: { w: 4, h: 22 },
      },
      className:"col-span-6"
    },
    "project-widget": {
      slotId: "j",
      component: <ProjectWidgets />,
      componentName: "project-widget",
      image: `${dir}/project-chart.svg`,
      title: "Project Widgets",
      tags: ["project", "widget", "summary"],
      layouts: {
        lg: { w: 5, h: 24 },
        md: { w: 5, h: 24 },
        sm: { w: 5, h: 24 },
        xs: { w: 5, h: 24 },
        xxs: { w: 5, h: 24 },
      },
      className:"col-span-6"
    },
    "posting-task": {
      slotId: "n",
      component: <PostingTask />,
      componentName: "posting-task",
      image: `${dir}/posting-task.svg`,
      title: "Posting Task",
      tags: ["task", "posting", "create"],
      layouts: {
        lg: { w: 12, h: 25 },
        md: { w: 12, h: 25 },
        sm: { w: 12, h: 25 },
        xs: { w: 12, h: 25 },
        xxs: { w: 12, h: 25 },
      },
      className:"col-span-12"
    },
    "project-timeline": {
      slotId: "o",
      component: <ProjectTimelineWidgets />,
      componentName: "project-timeline",
      image: `${dir}/project-timeline.svg`,
      title: "Project Timeline",
      tags: ["project", "timeline", "summary", "project-timeline"],
      layouts: {
        lg: { w: 6, h: 20 },
        md: { w: 6, h: 20 },
        sm: { w: 6, h: 20 },
        xs: { w: 6, h: 20 },
        xxs: { w: 6, h: 20 },
      },
      className:"col-span-8"
    },
  "project-list":{
    slotId: "r",
    component: <ProjectListWidgets />,
    componentName: "project-list",
    image: `${dir}/project-list.svg`,
    title: "Project List",
    tags: ["project", "list", "project-list"],
    layouts: {
      lg: { w: 3, h: 20 },
      md: { w: 3, h: 20 },
      sm: { w: 3, h: 20 },
      xs: { w: 3, h: 20 },
      xxs: { w: 3, h: 20 },
    },
    className:"col-span-4"
  },

  "calendar": {
    slotId: "cld",
    component: <CalendarWidget storageKey="calendar" />,
    componentName: "calendar",
    image: `${dir}/calendar.svg`,
    title: "Calendar",
    tags: ["calendar"],
    layouts: {
      lg: { w: 4, h: 28 },
      md: { w: 4, h: 28 },
      sm: { w: 4, h: 28 },
      xs: { w: 4, h: 28 },
      xxs: { w: 4, h: 28 },
    },
    className:"col-span-6"
  },
  "statistics2": {
    slotId: "st2",
    component: <BarStatisticWidgets />,
    componentName: "statistics2",
    image: `${dir}/statistic-2.svg`,
    title: "Statistics 2",
    tags: ["statistics2"],
    layouts: {
      lg: { w: 8, h: 20 },
      md: { w: 8, h: 20 },
      sm: { w: 8, h: 20 },
      xs: { w: 8, h: 20 },
      xxs: { w: 8, h: 20 },
    },
    className:"col-span-6"
  },
  "recent-activity": {
    slotId: "rc",
    component: <RecentActivity />,
    image: `${dir}/recent-activity.svg`,
    componentName: "recent-activity",
    title: "Recent Activity",
    tags: ["activity", "recent", "recent-activity"],
    layouts: {
      lg: { w: 4, h: 38 },
      md: { w: 4, h: 38 },
      sm: { w: 4, h: 38 },
      xs: { w: 4, h: 38 },
      xxs: { w: 4, h: 38 },
    },
    className:"col-span-4"
  },
  "countries-subscriber": {
    slotId: "csbr",
    component: <SubscribersByCountries />,
    componentName: "countries-subscriber",
    image: `${dir}/subscriber-by-countries.svg`,
    title: "Countries Subscriber",
    tags: ["subscriber","countries-subscriber"],
    layouts: {
      lg: { w: 5, h: 24 },
      md: { w: 5, h: 24 },
      sm: { w: 5, h: 24 },
      xs: { w: 5, h: 24 },
      xxs: { w: 5, h: 24 },
    },
    className:"col-span-8"
  },
  "live-visitor": {
    slotId: "lv",
    component: <LiveVisitors />,
    componentName: "live-visitor",
    image: `${dir}/live-visitor.svg`,
    title: "Live Visitor",
    tags: ["live-visitor"],
    layouts: {
      lg: { w: 5, h: 14 },
      md: { w: 5, h: 14 },
      sm: { w: 5, h: 14 },
      xs: { w: 5, h: 14 },
      xxs: { w: 5, h: 14 },
    },
    className:"col-span-6"
  },
  "monthly-budget": {
    slotId: "mb",
    component: <MonthlyBudget />,
    componentName: "monthly-budget",
    image: `${dir}/monthly-budget.svg`,
    title: "Monthly Budget",
    tags: ["monthly-budget"],
    layouts: {
      lg: { w: 5, h: 15 },
      md: { w: 5, h: 15 },
      sm: { w: 5, h: 15 },
      xs: { w: 5, h: 15 },
      xxs: { w: 5, h: 15 },
    },
    className:"col-span-6"
  },
  "activity-timeline": {
    slotId: "act",
    component: <ActivityTimeline />,
    componentName: "activity-timeline",
    image: `${dir}/activity-timeline.svg`,
    title: "Activity Timeline",
    tags: ["activity","activity-timeline"],
    layouts: {
      lg: { w: 5, h: 16 },
      md: { w: 5, h: 16 },
      sm: { w: 5, h: 16 },
      xs: { w: 5, h: 16 },
      xxs: { w: 5, h: 16 },
    },
    className:"col-span-7"
  },
  "clock": {
    slotId: "clk",
    component: <ClockWidget />,
    componentName: "clock",
    image: `${dir}/clock.svg`,
    title: "Clock",
    tags: ["clock"],
    layouts: {
      lg: { w: 2, h: 12 },
      md: { w: 2, h: 12 },
      sm: { w: 2, h: 12 },
      xs: { w: 2, h: 12 },
      xxs: { w: 2, h: 12 },
    },
    className:"col-span-5"
  },
  "battery": {
    slotId: "bat",
    component: <BatteryWidget />,
    componentName: "battery",
    image: `${dir}/activity-timeline.svg`,
    title: "Battery",
    tags: ["battery"],
    layouts: {
      lg: { w: 1, h: 4 },
      md: { w: 1, h: 4 },
      sm: { w: 1, h: 4 },
      xs: { w: 1, h: 4 },
      xxs: { w: 1, h: 4 },
    },
    className:"col-span-2"
  },
  "weather": {
    slotId: "wthr",
    component: <WeatherWidget />,
    componentName: "weather",
    image: `${dir}/activity-timeline.svg`,
    title: "Weather",
    tags: ["weather"],
    layouts: {
      lg: { w: 2, h: 12 },
      md: { w: 2, h: 12 },
      sm: { w: 2, h: 12 },
      xs: { w: 2, h: 12 },
      xxs: { w: 2, h: 12 },
    },
    className:"col-span-5"
  },
  "news": {
    slotId: "nws",
    component: <NewsWidget />,
    componentName: "news",
    image: `${dir}/activity-timeline.svg`,
    title: "News",
    tags: ["news"],
    layouts: {
      lg: { w: 5, h: 24 },
      md: { w: 5, h: 24 },
      sm: { w: 5, h: 24 },
      xs: { w: 5, h: 24 },
      xxs: { w: 5, h: 24 },
    },
    className:"col-span-5"
  },
  "property-sheet": {
    slotId: "prts",
    component: <PropertySheet />,
    componentName: "property-sheet",
    image: `${dir}/property-sheet.svg`,
    title: "Property Sheet",
    tags: ["property-sheet"],
    layouts: {
      lg: { w: 5, h: 24 },
      md: { w: 5, h: 24 },
      sm: { w: 5, h: 24 },
      xs: { w: 5, h: 24 },
      xxs: { w: 5, h: 24 },
    },
    className:"col-span-5"
  },
  }
}

export const getPresets = () => {
  const isDark =  useAppearanceStore.getState().getIsDarkAppearance();
  const dir = isDark ? `${rootDir}/dark` : `${rootDir}/light`
  return {
    default: `${rootDir}/default-presets.png`,
    presets2: `${rootDir}/presets2.png`,
    layout: `${dir}/default-layout.svg`,
    "group-template": `${dir}/group-template.svg`
  }
};
