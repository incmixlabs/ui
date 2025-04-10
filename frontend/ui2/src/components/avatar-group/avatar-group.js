import { jsx as _jsx } from "react/jsx-runtime";
import { SpreadLayout } from "./layouts/spread";
import { StackLayout } from "./layouts/stack";
const AvatarGroup = (props) => {
    const { layout = "spread" } = props;
    if (layout === "stack") {
        return _jsx(StackLayout, { ...props });
    }
    return _jsx(SpreadLayout, { ...props });
};
export default AvatarGroup;
//# sourceMappingURL=avatar-group.js.map