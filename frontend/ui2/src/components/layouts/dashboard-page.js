import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator } from "@/components/radixui";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./sidebar";
export function DashboardPage() {
    return (_jsxs(SidebarProvider, { children: [_jsx(AppSidebar, {}), _jsxs(SidebarInset, { children: [_jsx("header", { className: "flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12", children: _jsxs("div", { className: "flex items-center gap-2 px-4", children: [_jsx(SidebarTrigger, { className: "-ml-1" }), _jsx(Separator, { orientation: "vertical", className: "mr-2 h-4" })] }) }), _jsxs("div", { className: "flex flex-1 flex-col gap-4 p-4 pt-0", children: [_jsxs("div", { className: "grid auto-rows-min gap-4 md:grid-cols-3", children: [_jsx("div", { className: "aspect-video rounded-xl bg-muted/50" }), _jsx("div", { className: "aspect-video rounded-xl bg-muted/50" }), _jsx("div", { className: "aspect-video rounded-xl bg-muted/50" })] }), _jsx("div", { className: "min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" })] })] })] }));
}
export default DashboardPage;
//# sourceMappingURL=dashboard-page.js.map