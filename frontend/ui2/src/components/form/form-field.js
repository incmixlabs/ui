import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
export { TextField };
export const FormButton = ({ onClick, disabled, className, children }) => (_jsx(Button, { onClick: onClick, className: `${className}`, disabled: disabled, children: children }));
export const FormField = ({ name, label, type = "text", className = "", disabled, field, }) => {
    return (_jsxs(Flex, { direction: "column", className: `${className}`, gap: "1", children: [_jsx(Text, { as: "label", size: "2", htmlFor: name, children: label }), type === "textarea" ? (_jsx(TextArea, { id: name, placeholder: label, value: field.state.value, onBlur: field.handleBlur, onChange: (e) => field.handleChange(e.target.value), disabled: disabled })) : (_jsx(TextField.Root, { type: type, value: field.state.value, onChange: (e) => field.handleChange(e.target.value), onBlur: field.handleBlur, placeholder: label, disabled: disabled })), field.state.meta.errors && (_jsx(Text, { color: "red", size: "1", children: field.state.meta.errors }))] }));
};
//# sourceMappingURL=form-field.js.map