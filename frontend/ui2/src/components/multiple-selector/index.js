import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import MSelector from "./multiple-selector";
const OPTIONS = [
    { label: "Next.js", value: "nextjs" },
    { label: "React", value: "react" },
    { label: "Remix", value: "remix" },
    { label: "Vite", value: "vite" },
    { label: "Nuxt", value: "nuxt" },
    { label: "Vue", value: "vue" },
    { label: "Svelte", value: "svelte" },
    { label: "Angular", value: "angular", disable: true },
    { label: "Ember", value: "ember", disable: true },
    { label: "Gatsby", value: "gatsby" },
    { label: "Astro", value: "astro" },
];
export const MultipleSelectorControlled = () => {
    const [value, setValue] = React.useState([]);
    return (_jsx("div", { className: "flex w-[30rem] flex-col gap-5 px-10 ", children: _jsx(MSelector, { value: value, onChange: setValue, 
            // Removed defaultColor={themeColor} as it's not defined in the component props
            defaultOptions: OPTIONS, placeholder: "Select frameworks you like...", creatable: true, emptyIndicator: _jsx("p", { className: "text-center text-gray-600 text-lg leading-10 dark:text-gray-400", children: "No results found." }) }) }));
};
export { MSelector as MultipleSelector };
//# sourceMappingURL=index.js.map