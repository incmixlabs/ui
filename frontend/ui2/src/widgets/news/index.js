import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { Autoplay, Carousel, CarouselContent, CarouselNext, CarouselPrevious, } from "@/components/carousel";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import { Spinner, Tabs, Text } from "@/components/base";
import { LOCATION_API_URL } from "@/lib/utils/constants";
import { useRateLimitStore } from "@incmix/store";
import { NewsCard } from "./news-card";
export { NewsCard };
const NEWS_TOPIC_KEY = "news_widget_topic";
const NEWS_STORIES_KEY = "news_widget_stories";
function getLocalStorageNews() {
    const storiesJson = localStorage.getItem(NEWS_STORIES_KEY);
    if (storiesJson) {
        return JSON.parse(storiesJson);
    }
    return {};
}
const newsApiUrl = `${LOCATION_API_URL}/news`;
export default function NewsWidget({ country }) {
    const [api, setApi] = useState();
    const [_current, setCurrent] = useState(0);
    const [_count, setCount] = useState(0);
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
    useEffect(() => {
        if (!api) {
            return;
        }
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);
    const [selectedTopic, setSelectedTopic] = useState();
    const { rateLimits } = useRateLimitStore();
    const frequency = useMemo(() => {
        if (rateLimits.location)
            return rateLimits.location?.time / rateLimits.location?.limit;
        return 0;
    }, [rateLimits.location]);
    const { data: topicData, isPending: isTopicPending, error: topicError, } = useQuery({
        queryKey: ["news-topics", country],
        queryFn: async () => {
            const topicsJson = localStorage.getItem(NEWS_TOPIC_KEY);
            if (topicsJson) {
                const topicsResponse = JSON.parse(topicsJson);
                if (topicsResponse.topics.length)
                    return topicsResponse;
            }
            const searchParams = new URLSearchParams();
            if (country?.length)
                searchParams.append("country", country);
            const res = await fetch(`${newsApiUrl}/topics?${searchParams}`).then(async (res) => (await res.json()));
            const jsonString = JSON.stringify(res);
            localStorage.setItem(NEWS_TOPIC_KEY, jsonString);
            return res;
        },
    });
    useEffect(() => {
        if (topicData?.topics?.length) {
            setSelectedTopic(topicData.topics[0].topic_token);
        }
    }, [topicData]);
    const { data: newsData, isPending: isNewsPending, error: newsError, } = useQuery({
        queryKey: ["news", country, selectedTopic],
        enabled: !!selectedTopic,
        queryFn: async () => {
            const localStorageNews = getLocalStorageNews();
            const topicExists = selectedTopic
                ? localStorageNews[selectedTopic]
                : undefined;
            if (topicExists?.data.length) {
                const now = DateTime.now().toSeconds();
                const expired = now - topicExists.updatedAt > frequency;
                if (!expired)
                    return topicExists.data;
            }
            const searchParams = new URLSearchParams();
            if (selectedTopic)
                searchParams.append("topicToken", selectedTopic);
            if (country?.length)
                searchParams.append("country", country);
            else if (topicData?.country?.length)
                searchParams.append("country", topicData.country);
            const res = await fetch(`${newsApiUrl}?${searchParams}`).then(async (res) => (await res.json()));
            if (selectedTopic) {
                localStorageNews[selectedTopic] = {
                    data: res,
                    updatedAt: DateTime.now().toSeconds(),
                };
                const jsonString = JSON.stringify(localStorageNews);
                localStorage.setItem(NEWS_STORIES_KEY, jsonString);
            }
            return res;
        },
    });
    const newsCards = useMemo(() => {
        if (newsData && Array.isArray(newsData))
            return newsData?.map((news) => {
                return _createElement(NewsCard, { ...news, key: news.position });
            });
        return [];
    }, [newsData]);
    const tabs = useMemo(() => {
        if (topicData?.topics && Array.isArray(topicData.topics))
            return topicData.topics.map(({ topic_token, title }) => {
                return (_jsx(Tabs.Trigger, { value: topic_token, children: title }, `cat_${topic_token}`));
            });
    }, [topicData?.topics]);
    if (isTopicPending)
        return _jsx(Spinner, {});
    if (topicError || newsError)
        return _jsx(Text, { color: "red", children: "Failed to fetch News" });
    return (_jsxs("div", { children: [_jsx(Tabs.Root, { value: selectedTopic, onValueChange: setSelectedTopic, className: "mb-2 px-12", children: _jsx(Tabs.List, { className: "w-full", children: tabs }) }), isNewsPending ? (_jsx(Spinner, { className: "mx-auto" })) : (_jsxs(Carousel, { setApi: setApi, className: "w-full max-w-3xl", plugins: [plugin.current], onMouseEnter: plugin.current.stop, onMouseLeave: plugin.current.reset, opts: {
                    align: "start",
                    loop: true,
                }, children: [_jsx(CarouselContent, { children: newsCards }), _jsx(CarouselPrevious, {}), _jsx(CarouselNext, {})] }))] }));
}
export { NewsWidget };
//# sourceMappingURL=index.js.map