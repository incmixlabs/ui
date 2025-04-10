import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion } from "motion/react";
import { DateTime, Info } from "luxon";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Flex, Heading, Text, TextField } from "@/components/radixui";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth, }) => (_jsxs(Flex, { justify: "between", align: "center", className: "select-none rounded-t-md bg-gray-3 px-4 py-3", children: [_jsx(ChevronLeft, { className: "h-5 w-5 cursor-pointer text-gray-11 hover:text-gray-12", onClick: onPrevMonth }), _jsx(Heading, { size: "3", children: capitalizeFirstLetter(currentDate.toFormat("MMMM yyyy")) }), _jsx(ChevronRight, { className: "h-5 w-5 cursor-pointer text-gray-11 hover:text-gray-12", onClick: onNextMonth })] }));
const CalendarDay = ({ day, events, isCurrentMonth, isSelected, isToday, onSelectDay, }) => {
    const dayEvents = events.filter((event) => event.date?.hasSame(day, "day"));
    const hasMoreEvents = dayEvents.length > 6;
    // Show 5 events + ellipsis if there are more than 6 events
    // Otherwise show all events up to 6
    const eventsToShow = hasMoreEvents ? dayEvents.slice(0, 5) : dayEvents;
    const totalDots = 6;
    const placeholderDots = Math.max(0, totalDots - (hasMoreEvents ? 6 : dayEvents.length));
    return (_jsxs(Flex, { direction: "column", align: "center", className: cn("flex-1 px-2 py-1", "w-12 cursor-pointer rounded-md transition-colors hover:bg-gray-3", "relative", {
            "rounded-b-none bg-gray-3": isSelected,
            "bg-gray-3": isSelected && dayEvents.length === 0,
            "text-gray-8": !isCurrentMonth,
            "font-medium": isToday,
        }), onClick: () => onSelectDay(day), children: [_jsx(Text, { size: "5", className: cn("select-none font-semibold", {
                    "text-gray-10": !isCurrentMonth,
                    "text-gray-12": isCurrentMonth,
                }), children: day.toFormat("dd") }), _jsxs(Flex, { align: "center", justify: "center", gap: "1", wrap: "wrap", className: "my-1", children: [eventsToShow.map((event) => (_jsx(Box, { className: cn("h-1.5 w-1.5 rounded-full", {
                            "bg-blue-9": event.color === "blue",
                            "bg-orange-9": event.color === "orange",
                            "bg-green-9": event.color === "green",
                            "bg-yellow-9": event.color === "yellow",
                        }) }, event.id))), hasMoreEvents && (_jsx(Flex, { align: "center", justify: "center", className: "h-1.5 w-1.5 rounded-full", title: `${dayEvents.length - 5} more events`, children: _jsx(Plus, { className: "absolute h-2.5 w-2.5 text-bold" }) })), Array.from({ length: placeholderDots }).map((_, index) => (_jsx(Box, { className: "invisible h-1.5 w-1.5 rounded-full" }, `placeholder-${day.toFormat("yyyy-MM-dd")}-${index}`)))] }), _jsx(AnimatePresence, { children: isSelected && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeInOut" }, className: "absolute top-full right-0 left-0", children: _jsx(Box, { className: "h-2 bg-gray-3" }) })) })] }));
};
const CalendarDays = ({ currentDate, events, selectedDay, today, onSelectDay, direction, onAddEvent, onRemoveEvent, onEditEvent, }) => {
    const monthStart = currentDate.startOf("month");
    const monthEnd = currentDate.endOf("month");
    const startDate = monthStart.startOf("week");
    const endDate = monthEnd.endOf("week");
    const rows = [];
    let days = [];
    let day = startDate;
    let selectedWeekIndex = null;
    const dayNames = Info.weekdays("short", {
        locale: currentDate.toLocal().locale || undefined,
    }).map((dayName) => (_jsx(Box, { className: "flex-1 text-center", children: _jsx(Text, { size: "1", className: "text-gray-11 uppercase", children: dayName.substring(0, 3) }) }, dayName)));
    rows.push(_jsx(Flex, { className: "mt-2 mb-6", gap: "1", children: dayNames }, "day-names"));
    let weekIndex = 0;
    while (day <= endDate) {
        const weekStart = day;
        for (let i = 0; i < 7; i++) {
            const cloneDay = day;
            const isCurrentMonth = day.hasSame(currentDate, "month");
            if (selectedDay?.hasSame(cloneDay, "day")) {
                selectedWeekIndex = weekIndex;
            }
            days.push(_jsx(CalendarDay, { day: cloneDay, events: events, isCurrentMonth: isCurrentMonth, isSelected: selectedDay ? day.hasSame(selectedDay, "day") : false, isToday: day.hasSame(today, "day"), onSelectDay: onSelectDay }, day.toFormat("yyyy-MM-dd")));
            day = day.plus({ days: 1 });
        }
        rows.push(_jsxs(Box, { className: "mb-2", children: [_jsx(Flex, { className: "", gap: "1", children: days }), _jsx(AnimatePresence, { mode: "wait", children: selectedDay && selectedWeekIndex === weekIndex && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: {
                            height: "auto",
                            opacity: 1,
                            transition: { duration: 0.2, ease: "easeInOut" },
                        }, exit: {
                            height: 0,
                            opacity: 0,
                            transition: { duration: 0.2, ease: "easeInOut" },
                        }, className: "overflow-hidden", children: _jsx(SelectedDayEvents, { selectedDay: selectedDay, events: events, onAddEvent: onAddEvent, onRemoveEvent: onRemoveEvent, onEditEvent: onEditEvent }) }, selectedDay.toFormat("yyyy-MM-dd"))) })] }, `week-${weekStart.toFormat("yyyy-MM-dd")}`));
        days = [];
        weekIndex++;
    }
    return (_jsx(AnimatePresence, { initial: false, mode: "wait", custom: direction, children: _jsx(motion.div, { custom: direction, variants: {
                enter: (direction) => ({
                    x: direction * 30,
                    opacity: 0,
                }),
                center: {
                    x: 0,
                    opacity: 1,
                },
                exit: (direction) => ({
                    x: direction * -30,
                    opacity: 0,
                }),
            }, initial: "enter", animate: "center", exit: "exit", transition: { duration: 0.3 }, children: rows }, currentDate.toFormat("yyyy-MM")) }));
};
const SelectedDayEvents = ({ selectedDay, events, onAddEvent, onRemoveEvent, onEditEvent, }) => {
    const [editingEvent, setEditingEvent] = useState(null);
    const [editText, setEditText] = useState("");
    const { t } = useTranslation(["calendar"]);
    const handleStartEdit = (event) => {
        setEditingEvent(event);
        setEditText(event.eventName);
    };
    const handleSaveEdit = () => {
        if (editingEvent && editText.trim() !== "") {
            onEditEvent?.(editingEvent, editText.trim());
            setEditingEvent(null);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSaveEdit();
        }
        else if (e.key === "Escape") {
            setEditingEvent(null);
        }
    };
    const dayEvents = events.filter((event) => event.date?.hasSame(selectedDay, "day"));
    return (_jsxs(Box, { className: "relative mt-2 mb-2 rounded-md rounded-t-none bg-gray-3 p-3", children: [_jsxs(Heading, { size: "2", className: "mb-2 select-none", children: [t("eventsFor"), " ", selectedDay.toLocaleString(DateTime.DATE_FULL)] }), _jsx(Box, { className: "max-h-28 overflow-y-auto", children: _jsxs(Flex, { direction: "column", gap: "2", children: [dayEvents.map((event) => (_jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2 }, children: _jsxs(Flex, { align: "center", gap: "2", className: "group", children: [_jsx(Box, { className: cn("relative h-3 w-3 flex-shrink-0 rounded-full", {
                                            "bg-blue-9": event.color === "blue",
                                            "bg-orange-9": event.color === "orange",
                                            "bg-green-9": event.color === "green",
                                            "bg-yellow-9": event.color === "yellow",
                                            "cursor-pointer": onRemoveEvent,
                                        }), onClick: () => onRemoveEvent?.(event), children: onRemoveEvent && (_jsx(Box, { className: "absolute inset-0 hidden items-center justify-center font-bold text-white text-xs group-hover:flex", children: _jsx(Minus, { className: "h-3 w-3" }) })) }), editingEvent === event ? (_jsx(TextField.Root, { value: editText, onChange: (e) => setEditText(e.target.value), onBlur: handleSaveEdit, onKeyDown: handleKeyDown, className: "flex-1 rounded border border-gray-7 bg-gray-2 text-sm focus:border-blue-8 focus:outline-none", autoFocus: true })) : (_jsx(Text, { className: "flex-1 cursor-pointer hover:text-gray-12", onClick: () => onEditEvent && handleStartEdit(event), children: event.eventName }))] }) }, event.id))), onAddEvent && (_jsxs(Flex, { align: "center", gap: "2", className: "cursor-pointer text-gray-11 hover:text-gray-12", onClick: () => onAddEvent(selectedDay), children: [_jsx(Box, { className: "relative size-3", children: _jsx(Plus, { className: "-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 size-4" }) }), _jsx(Text, { children: t("addEvent") })] }))] }) })] }));
};
export function Calendar({ className, events = [], onAddEvent, onRemoveEvent, onEditEvent, }) {
    const today = DateTime.now();
    const [currentDate, setCurrentDate] = useState(today.startOf("month"));
    const [selectedDay, setSelectedDay] = useState(null);
    const [direction, setDirection] = useState(0);
    const nextMonth = useCallback(() => {
        setDirection(1);
        setCurrentDate((prev) => prev.plus({ months: 1 }));
    }, []);
    const prevMonth = useCallback(() => {
        setDirection(-1);
        setCurrentDate((prev) => prev.minus({ months: 1 }));
    }, []);
    const handleDaySelect = useCallback((day) => {
        setSelectedDay((prev) => (prev?.hasSame(day, "day") ? null : day));
    }, []);
    return (_jsxs(Box, { className: cn("rounded-md bg-gray-1 shadow-md", className), children: [_jsx(CalendarHeader, { currentDate: currentDate, onPrevMonth: prevMonth, onNextMonth: nextMonth }), _jsx(Box, { className: "overflow-hidden p-2", children: _jsx(CalendarDays, { currentDate: currentDate, events: events, selectedDay: selectedDay, today: today, onSelectDay: handleDaySelect, direction: direction, onAddEvent: onAddEvent, onRemoveEvent: onRemoveEvent, onEditEvent: onEditEvent }) })] }));
}
//# sourceMappingURL=calendar.js.map