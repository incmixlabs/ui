import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Reorder, motion, useDragControls, useMotionValue } from "motion/react";
import { Box, Checkbox, Flex, Heading, IconButton, Progress, Text, } from "@/components/base";
const Item = ({ children, item, setChecklistData, checkListData, }) => {
    const y = useMotionValue(0);
    //   const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();
    return (_jsxs(Reorder.Item, { value: item, style: { y }, dragListener: false, dragControls: dragControls, className: "group flex w-full items-center justify-between rounded-md bg-gray-3 p-3 dark:bg-gray-4", children: [children, _jsxs(Flex, { className: "gap-3", align: "center", children: [_jsx(ReorderIcon, { dragControls: dragControls }), _jsx(IconButton, { onClick: () => {
                            setChecklistData(checkListData.filter((i) => i.id !== item.id));
                        }, className: "bg-transparent opacity-0 group-hover:opacity-100", children: _jsx(Trash2, { className: "h-5 w-5 text-gray-12" }) })] })] }));
};
export function ReorderIcon({ dragControls }) {
    return (_jsx(motion.div, { whileTap: { scale: 0.85 }, onPointerDown: (e) => {
            e.preventDefault();
            dragControls.start(e);
        }, children: _jsx(GripVertical, { className: " h-7 w-7 cursor-grab text-gray-12 opacity-0 active:cursor-grabbing group-hover:opacity-100" }) }));
}
export function ProjectChecklist() {
    const [checkListData, setChecklistData] = useState([
        {
            id: 1,
            title: "Inbox Template",
            date: "28.8.2024",
            checked: false,
        },
        {
            id: 2,
            title: "Chat Template",
            date: "29.8.2024",
            checked: false,
        },
        {
            id: 3,
            title: "Tasks Template",
            date: "32.8.2024",
            checked: false,
        },
        {
            id: 4,
            title: "Projects Template",
            date: "31.8.2024",
            checked: false,
        },
    ]);
    const checkedCount = checkListData.filter((item) => item.checked).length;
    const totalCount = checkListData.length;
    const completionPercentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
    return (_jsx(_Fragment, { children: _jsxs(Box, { children: [_jsxs(Box, { className: "gap-2 space-y-2 py-2", children: [_jsxs(Heading, { size: "3", className: "flex w-full items-center gap-1 font-medium text-gray-11 uppercase", children: [_jsx(Text, { children: "CheckList" }), _jsxs(Text, { children: ["(", completionPercentage, "%)"] })] }), _jsx(Progress, { value: completionPercentage })] }), _jsx(Reorder.Group, { axis: "y", values: checkListData, onReorder: setChecklistData, className: "w-full space-y-1 ", children: checkListData.map((item) => (_jsx(Item, { item: item, setChecklistData: setChecklistData, checkListData: checkListData, children: _jsxs(Flex, { className: "gap-2", children: [_jsx(Checkbox, { size: "3", checked: item.checked, onCheckedChange: (checked) => {
                                        setChecklistData(checkListData.map((i) => i.id === item.id ? { ...i, checked: !!checked } : i));
                                    }, className: "h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white " }), _jsx(Heading, { size: "2", children: item.title })] }) }, item.id))) }), _jsxs(IconButton, { onClick: () => {
                        const newItem = {
                            id: Date.now(),
                            title: "New Item",
                            date: new Date().toLocaleDateString(),
                            checked: false,
                        };
                        setChecklistData([...checkListData, newItem]);
                    }, className: "mt-4 w-fit gap-2 bg-transparent p-1 font-semibold text-secondary ", children: [_jsx(Plus, {}), _jsx(Text, { children: "Add Checklist Item" })] })] }) }));
}
export default ProjectChecklist;
//# sourceMappingURL=project-checklist.js.map