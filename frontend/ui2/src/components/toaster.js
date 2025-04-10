import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import { Toaster as SonnerToaster } from "sonner";
export { toast } from "sonner";
export const Toaster = ({ position = "bottom-right", }) => {
    return (_jsx(SonnerToaster, { position: position, closeButton: true, duration: 3000, visibleToasts: 5, toastOptions: {
            classNames: {
                toast: "text-gray-50 border-none",
                error: "bg-red-6",
                success: "bg-green-6",
                warning: "bg-yellow-6",
                info: "bg-blue-6",
            },
        } }));
};
//# sourceMappingURL=toaster.js.map