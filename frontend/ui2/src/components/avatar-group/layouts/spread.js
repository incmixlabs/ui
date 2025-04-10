import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from "@/components/radixui/avatar";
import { Flex } from "@/components/radixui/flex";
import { gaps } from "../constants";
import { getVisibleCount } from "../utils";
export const SpreadLayout = ({ users, maxVisible = 5, size = "3", direction = "left", }) => {
    const { visibleCount, remainingCount } = getVisibleCount(users, maxVisible);
    const visibleUsers = users.slice(0, visibleCount);
    const sortedUsers = direction === "right" ? [...visibleUsers].reverse() : visibleUsers;
    return (_jsxs(Flex, { align: "center", gap: gaps[size], direction: direction === "right" ? "row-reverse" : "row", children: [sortedUsers.map((user) => (_jsx(Avatar, { id: user.id, size: size, src: user.src, name: user.name }, user.id))), remainingCount > 0 && _jsx(Avatar, { size: size, name: `+${remainingCount}` })] }));
};
//# sourceMappingURL=spread.js.map