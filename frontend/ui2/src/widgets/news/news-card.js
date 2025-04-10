import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Card, Flex, Text } from "@/components/base";
import { CarouselItem } from "@/components/carousel";
import { cn } from "@/lib/utils";
import { getRelativeTime } from "@/lib/utils/date";
export function NewsCard({ position, highlight, stories }) {
    return (_jsx(CarouselItem, { children: _jsx(Card.Root, { children: _jsx(Card.Content, { className: "p-4 pt-4 ", children: _jsxs(Flex, { gap: "6", children: [_jsxs(Box, { className: cn(stories?.length
                                ? "w-fit max-w-64 space-y-4 [&>.thumbnail]:w-full"
                                : "flex gap-4"), children: [highlight.thumbnail?.length && (_jsx("img", { className: "thumbnail max-h-36 rounded object-cover", src: highlight.thumbnail, alt: highlight.title })), _jsx(NewsStory, { story: highlight, isHighlight: true })] }), stories?.length && (_jsxs(Box, { children: [_jsx(Text, { className: "text-lg", children: "Related Stories:" }), _jsx(Box, { className: "mt-3 space-y-4", children: stories?.map((story) => (_jsx(NewsStory, { story: story }, `news-${position}-story-${story.position}`))) })] }))] }) }) }) }));
}
const NewsStory = ({ story, isHighlight = false, }) => {
    return (_jsxs(Box, { children: [_jsx("a", { target: "_blank", href: story.link, rel: "noreferrer", children: _jsx(Card.Title, { className: cn("hover:underline", isHighlight ? "text-lg" : "text-md"), children: story.title }) }), _jsx(Box, { children: story.source.authors && (_jsxs(Text, { className: "opacity-50", weight: "medium", children: ["By: ", story.source.authors.join(" • ")] })) }), _jsxs(Flex, { align: "center", className: "mt-1", gap: "1", children: [_jsx("div", { className: "font-medium", children: story.source.name }), "\u2022", _jsx("div", { className: "text-foreground opacity-50", children: getRelativeTime(story.date) })] })] }));
};
//# sourceMappingURL=news-card.js.map