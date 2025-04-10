import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FlowCard as Card, Image } from "@/components/radixui/card/flow-card";
export const AuthWrapper = ({ image, title, step = 1, subTitle, children, }) => {
    image = !image ? `step${step}` : image;
    return (_jsxs("div", { className: "mx-auto flex flex-col items-center justify-center px-6", children: [_jsxs("a", { href: "/", className: "mb-8 flex items-center justify-center font-semibold text-2xl lg:mb-10 dark:text-white", children: [_jsx(Image, { imgAlt: "", imgSrc: "/images/logos/app/32x32.svg", width: 43, height: 44, className: "mr-4 h-11" }), _jsx("span", { className: "self-center whitespace-nowrap font-semibold text-2xl dark:text-white", children: title })] }), _jsxs(Card, { horizontal: true, imgSrc: `/images/onboarding/${image}.png`, imgAlt: "", className: "w-full md:max-w-screen-lg", theme: {
                    root: {
                        children: "my-auto w-full gap-0 space-y-8 p-6 sm:p-8 lg:p-16",
                    },
                    img: {
                        horizontal: {
                            on: "hidden rounded-l-lg md:w-96 md:p-0 lg:block",
                        },
                    },
                }, children: [_jsx("h2", { className: "font-bold text-2xl text-gray-900 lg:text-3xl dark:text-white", children: subTitle }), children] })] }));
};
//# sourceMappingURL=auth-wrapper.js.map