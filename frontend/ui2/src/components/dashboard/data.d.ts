interface TaskStat {
    count: number;
    label: string;
    icon: React.ReactNode;
    backgroundColorClass: string;
}
interface ActivityItem {
    id: string;
    time: string;
    user: string;
    action: string;
    projectNumber: string;
    color: string;
}
interface ActivityGroup {
    date: string;
    activities: ActivityItem[];
}
export declare const taskStats: TaskStat[];
export declare const revisionData: {
    id: string;
    type: string;
    projectNumber: string;
    recipient: string;
    checked: boolean;
    color: string;
}[];
export declare const activityGroups: ActivityGroup[];
export {};
//# sourceMappingURL=data.d.ts.map