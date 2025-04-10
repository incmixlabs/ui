"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AudioWaveform, BookOpen, Bot, Command, Frame, GalleryVerticalEnd, 
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
Map, PieChart, Settings2, SquareTerminal, } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from "./sidebar";
import { TeamSwitcher } from "./team-switcher";
// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};
export function AppSidebar({ ...props }) {
    return (_jsxs(Sidebar, { collapsible: "icon", ...props, children: [_jsx(SidebarHeader, { children: _jsx(TeamSwitcher, { teams: data.teams }) }), _jsxs(SidebarContent, { children: [_jsx(NavMain, { items: data.navMain }), _jsx(NavProjects, { projects: data.projects })] }), _jsx(SidebarFooter, { children: _jsx(NavUser, { user: data.user }) }), _jsx(SidebarRail, {})] }));
}
//# sourceMappingURL=app-sidebar.js.map