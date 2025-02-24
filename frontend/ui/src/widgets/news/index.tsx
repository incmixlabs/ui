import { useEffect, useMemo, useRef, useState } from "react";

import {
  Autoplay,
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@components/carousel";
import { Tabs, TabsList, TabsTrigger } from "@components/tabs";
import { useRateLimitStore } from "@incmix/store";
import { Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { LOCATION_API_URL } from "@utils/constants";
import { DateTime } from "luxon";
import { NewsCard, type NewsCardProps } from "./news-card";
export { NewsCard, type NewsCardProps };

const NEWS_TOPIC_KEY = "news_widget_topic";
const NEWS_STORIES_KEY = "news_widget_stories";

export type NewsProps = {
  country?: string;
};

type TopicsResponse = {
  topics: { topic_token: string; title: string }[];
  country: string;
};

type LocalStorageNews = Record<
  string,
  { data: NewsCardProps[]; updatedAt: number }
>;
function getLocalStorageNews() {
  const storiesJson = localStorage.getItem(NEWS_STORIES_KEY);
  if (storiesJson) {
    return JSON.parse(storiesJson) as LocalStorageNews;
  }
  return {};
}

const newsApiUrl = `${LOCATION_API_URL}/news`;
export default function NewsWidget({ country }: NewsProps) {
  const [api, setApi] = useState<CarouselApi>();
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

  const [selectedTopic, setSelectedTopic] = useState<string | undefined>();

  const { rateLimits } = useRateLimitStore();

  const frequency = useMemo(() => {
    if (rateLimits.location)
      return rateLimits.location?.time / rateLimits.location?.limit;

    return 0;
  }, [rateLimits.location]);

  const {
    data: topicData,
    isPending: isTopicPending,
    error: topicError,
  } = useQuery<TopicsResponse>({
    queryKey: ["news-topics", country],
    queryFn: async () => {
      const topicsJson = localStorage.getItem(NEWS_TOPIC_KEY);

      if (topicsJson) {
        const topicsResponse = JSON.parse(topicsJson) as TopicsResponse;
        if (topicsResponse.topics.length) return topicsResponse;
      }

      const searchParams = new URLSearchParams();
      if (country?.length) searchParams.append("country", country);
      const res = await fetch(`${newsApiUrl}/topics?${searchParams}`).then(
        async (res) => (await res.json()) as TopicsResponse,
      );
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

  const {
    data: newsData,
    isPending: isNewsPending,
    error: newsError,
  } = useQuery<NewsCardProps[]>({
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
        if (!expired) return topicExists.data;
      }

      const searchParams = new URLSearchParams();
      if (selectedTopic) searchParams.append("topicToken", selectedTopic);

      if (country?.length) searchParams.append("country", country);
      else if (topicData?.country?.length)
        searchParams.append("country", topicData.country);

      const res = await fetch(`${newsApiUrl}?${searchParams}`).then(
        async (res) => (await res.json()) as NewsCardProps[],
      );
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
        return <NewsCard {...news} key={news.position} />;
      });
    return [];
  }, [newsData]);

  const tabs = useMemo(() => {
    if (topicData?.topics)
      return topicData.topics.map(({ topic_token, title }) => {
        return (
          <TabsTrigger key={`cat_${topic_token}`} value={topic_token}>
            {title}
          </TabsTrigger>
        );
      });
  }, [topicData?.topics]);

  if (isTopicPending) return <Spinner />;

  if (topicError || newsError)
    return <Text color="red">Failed to fetch News</Text>;

  return (
    <div>
      <Tabs
        value={selectedTopic}
        onValueChange={setSelectedTopic}
        className="mb-2 px-12"
      >
        <TabsList className="w-full">{tabs}</TabsList>
      </Tabs>
      {isNewsPending ? (
        <Spinner className="mx-auto" />
      ) : (
        <Carousel
          setApi={setApi}
          className="w-full max-w-3xl"
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>{newsCards}</CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
}

export { NewsWidget };
