import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from "@/components/radixui/avatar";
import { Flex } from "@radix-ui/themes";
import { stackBorderWidths, stackOffsets } from "../constants";
import { getVisibleCount } from "../utils";
export const StackLayout = ({ users, maxVisible = 5, size = "3", direction = "left", stackOrder = "descending", }) => {
    const { visibleCount, remainingCount } = getVisibleCount(users, maxVisible);
    const visibleUsers = users.slice(0, visibleCount);
    const flipOrder = (direction === "left" && stackOrder === "descending") ||
        (direction === "right" && stackOrder === "ascending");
    const getStackStyles = (index) => ({
        marginLeft: direction === "left" ? (index === 0 ? "0" : stackOffsets[size]) : "0",
        marginRight: direction === "right" ? (index === 0 ? "0" : stackOffsets[size]) : "0",
        zIndex: flipOrder ? visibleCount - index : index + 1,
        boxShadow: `0 0 0 ${stackBorderWidths[size]} var(--color-background)`,
    });
    const sortedUsers = direction === "right" ? [...visibleUsers].reverse() : visibleUsers;
    return (_jsxs(Flex, { align: "center", direction: direction === "right" ? "row-reverse" : "row", children: [sortedUsers.map((user, index) => (_jsx(Avatar, { id: user.id, size: size, src: user.src, name: user.name, style: getStackStyles(index) }, user.id))), remainingCount > 0 && (_jsx(Avatar, { size: size, name: `+${remainingCount}`, style: getStackStyles(visibleCount) }))] }));
};
//# sourceMappingURL=stack.js.map