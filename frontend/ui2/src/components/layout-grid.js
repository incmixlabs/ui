"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
// import Image from "next/image"
import { useState } from "react";
import { cn } from "@/lib/utils";
import { clx } from "@/lib/utils/clx/clx-merge";
const LayoutGridContainer = clx.div("mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-3");
const LayoutGridCardContainer = clx.div("max-h-80");
export function GridLayoutCard() {
    const Card = clx.div();
    const CardTitle = clx.p("text-4xl font-bold text-white");
    const CardDescription = clx.p("my-4 max-w-lg text-base font-normal text-neutral-200");
    return (_jsxs(Card, { children: [_jsx(CardTitle, { children: "Lorem ipsum" }), _jsx(CardDescription, { children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." })] }));
}
/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        FUNCTIONS                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
export function LayoutGrid({ cards }) {
    const [selected, setSelected] = useState(null);
    const [lastSelected, setLastSelected] = useState(null);
    const handleClick = (card) => {
        setLastSelected(selected);
        setSelected(card);
    };
    const handleOutsideClick = () => {
        setLastSelected(selected);
        setSelected(null);
    };
    return (_jsxs(LayoutGridContainer, { children: [cards.map((card) => (_jsx(LayoutGridCardContainer, { children: _jsxs(motion.div, { onClick: () => handleClick(card), className: cn(card.className, "relative overflow-hidden", selected?.id === card.id
                        ? "absolute inset-0 z-50 m-auto flex h-1/2 w-full cursor-pointer flex-col flex-wrap items-center justify-center rounded-lg md:w-1/2"
                        : lastSelected?.id === card.id
                            ? "z-40 h-full w-full rounded-xl bg-white"
                            : "h-full w-full rounded-xl bg-white"), layout: true, children: [selected?.id === card.id && (_jsx(GridLayoutSelectedCard, { selected: selected })), _jsx(GridLayoutBlurImage, { card: card })] }) }, card.id))), _jsx(motion.div, { onClick: handleOutsideClick, className: cn("absolute top-0 left-0 z-10 h-full w-full bg-black opacity-0", selected?.id ? "pointer-events-auto" : "pointer-events-none"), animate: { opacity: selected?.id ? 0.3 : 0 } })] }));
}
function GridLayoutBlurImage({ card }) {
    const [loaded, setLoaded] = useState(false);
    return (_jsx("img", { src: card.thumbnail, height: "500", width: "500", onLoad: () => setLoaded(true), className: cn("absolute inset-0 h-full w-full object-cover object-top transition duration-200", loaded ? "blur-none" : "blur-md"), alt: "thumbnail" }));
}
function GridLayoutSelectedCard({ selected, }) {
    return (_jsxs("div", { className: "relative z-[60] flex h-full w-full flex-col justify-end rounded-lg bg-transparent shadow-2xl", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 0.6 }, className: "absolute inset-0 z-10 h-full w-full bg-black opacity-60" }), _jsx(motion.div, { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease: "easeInOut" }, className: "relative z-[70] px-8 pb-4", children: selected?.content })] }));
}
//# sourceMappingURL=layout-grid.js.map