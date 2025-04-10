import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Flex, Popover, ScrollArea, Text } from "@radix-ui/themes";
import { Avatar } from "@/components/radixui/avatar";
export const UsersDropdown = ({ users, size, }) => {
    return (_jsx(Popover.Content, { children: _jsx(ScrollArea, { type: "hover", scrollbars: "vertical", style: { height: "300px" }, children: _jsx(Flex, { direction: "column", gap: "2", children: users.map((user) => (_jsxs(Flex, { align: "center", gap: "2", children: [_jsx(Avatar, { size: size, src: user.src, name: user.name }), _jsx(Text, { size: size, children: user.name })] }, user.name))) }) }) }));
};
//# sourceMappingURL=users-dropdown.js.map