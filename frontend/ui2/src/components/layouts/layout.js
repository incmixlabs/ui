import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "./sidebar";
export default function Layout({ children }) {
    return (_jsxs(SidebarProvider, { children: [_jsx(AppSidebar, {}), _jsxs("main", { children: [_jsx(SidebarTrigger, {}), children] })] }));
}
//# sourceMappingURL=layout.js.map