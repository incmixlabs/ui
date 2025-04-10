import { jsx as _jsx } from "react/jsx-runtime";
import { DateTime } from "luxon";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar } from "./calendar";
const STORAGE_KEY_PREFIX = "calendar_events";
const COLORS = ["blue", "orange", "green", "yellow"];
const getStoredEvents = (key) => {
    const storedEvents = localStorage.getItem(key);
    if (!storedEvents)
        return [];
    return JSON.parse(storedEvents).map((event) => ({
        ...event,
        date: DateTime.fromISO(event.date),
    }));
};
export function CalendarWidget({ storageKey }) {
    const { t } = useTranslation(["calendar"]);
    const key = `${STORAGE_KEY_PREFIX}_${storageKey}`;
    const [events, setEvents] = useState(() => getStoredEvents(key));
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(events));
    }, [events, key]);
    const handleAddEvent = useCallback((date) => {
        const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        const newEvent = {
            id: nanoid(),
            eventName: t("newEvent"),
            calendar: "Default",
            color: randomColor,
            date: date,
        };
        setEvents((prev) => [...prev, newEvent]);
    }, [t]);
    const handleRemoveEvent = useCallback((eventToRemove) => {
        setEvents((prev) => prev.filter((event) => event.id !== eventToRemove.id));
    }, []);
    const handleEditEvent = useCallback((event, newName) => {
        setEvents((prev) => prev.map((e) => (e.id === event.id ? { ...e, eventName: newName } : e)));
    }, []);
    return (_jsx(Calendar, { events: events, onAddEvent: handleAddEvent, onRemoveEvent: handleRemoveEvent, onEditEvent: handleEditEvent }));
}
//# sourceMappingURL=calendar-widget.js.map