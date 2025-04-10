"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, } from "react";
import { iconSize } from "./icons/icon";
export { Autoplay };
const CarouselContext = createContext(null);
function useCarousel() {
    const context = useContext(CarouselContext);
    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />");
    }
    return context;
}
function Carousel({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }) {
    const ref = useRef(null);
    const [carouselRef, api] = useEmblaCarousel({
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
    }, plugins);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const onSelect = useCallback((api) => {
        if (!api) {
            return;
        }
        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);
    const scrollPrev = useCallback(() => {
        api?.scrollPrev();
    }, [api]);
    const scrollNext = useCallback(() => {
        api?.scrollNext();
    }, [api]);
    const handleKeyDown = useCallback((event) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollPrev();
        }
        else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollNext();
        }
    }, [scrollPrev, scrollNext]);
    useEffect(() => {
        if (!api || !setApi) {
            return;
        }
        setApi(api);
    }, [api, setApi]);
    useEffect(() => {
        if (!api) {
            return;
        }
        onSelect(api);
        api.on("reInit", onSelect);
        api.on("select", onSelect);
        return () => {
            api?.off("select", onSelect);
        };
    }, [api, onSelect]);
    return (_jsx("div", { className: "px-12", children: _jsx(CarouselContext.Provider, { value: {
                carouselRef,
                api: api,
                opts,
                orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }, children: _jsx("div", { ref: ref, onKeyDownCapture: handleKeyDown, className: cn("relative", className), "aria-roledescription": "carousel", ...props, children: children }) }) }));
}
Carousel.displayName = "Carousel";
function CarouselContent({ className, ...props }) {
    const ref = useRef(null);
    const { carouselRef, orientation } = useCarousel();
    return (_jsx("div", { ref: carouselRef, className: "overflow-hidden", children: _jsx("div", { ref: ref, className: cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className), ...props }) }));
}
CarouselContent.displayName = "CarouselContent";
function CarouselItem({ className, ...props }) {
    const ref = useRef(null);
    const { orientation } = useCarousel();
    return (_jsx("div", { ref: ref, role: "group", "aria-roledescription": "slide", className: cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className), ...props }));
}
CarouselItem.displayName = "CarouselItem";
function CarouselPrevious({ className, variant = "outline", size = "icon", ...props }) {
    const ref = useRef(null);
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return (_jsxs(Button, { ref: ref, variant: variant, size: size, className: cn("absolute h-8 w-8 rounded-full", orientation === "horizontal"
            ? "-left-12 -translate-y-1/2 top-1/2"
            : "-top-12 -translate-x-1/2 left-1/2 rotate-90", className), disabled: !canScrollPrev, onClick: scrollPrev, ...props, children: [_jsx(ArrowLeft, { className: iconSize }), _jsx("span", { className: "sr-only", children: "Previous slide" })] }));
}
CarouselPrevious.displayName = "CarouselPrevious";
function CarouselNext({ className, variant = "outline", size = "icon", ...props }) {
    const ref = useRef(null);
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return (_jsxs(Button, { ref: ref, variant: variant, size: size, className: cn("absolute h-8 w-8 rounded-full", orientation === "horizontal"
            ? "-right-12 -translate-y-1/2 top-1/2"
            : "-bottom-12 -translate-x-1/2 left-1/2 rotate-90", className), disabled: !canScrollNext, onClick: scrollNext, ...props, children: [_jsx(ArrowRight, { className: iconSize }), _jsx("span", { className: "sr-only", children: "Next slide" })] }));
}
CarouselNext.displayName = "CarouselNext";
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, };
//# sourceMappingURL=carousel.js.map