import { Card, CardContent, CardTitle } from "@components/card/card"
import { CarouselItem } from "@components/carousel"
import { Box, Flex, Text } from "@radix-ui/themes"
import { cn } from "@utils/cn"

import { getRelativeTime } from "@utils/date"

export type NewsStory = {
  thumbnail?: string
  title: string
  link: string
  source: { icon?: string; name: string; authors?: string[] }
  date: string
}

export type NewsCardProps = {
  position: number
  highlight: NewsStory
  stories?: Array<NewsStory & { position: number }>
}

export function NewsCard({ position, highlight, stories }: NewsCardProps) {
  return (
    <CarouselItem>
      <Card>
        <CardContent className="p-4 pt-4 ">
          <Flex gap="6">
            <Box
              className={cn(
                stories?.length
                  ? "w-fit max-w-64 space-y-4 [&>.thumbnail]:w-full"
                  : "flex gap-4"
              )}
            >
              {highlight.thumbnail?.length && (
                <img
                  className="thumbnail max-h-36 rounded-sm object-cover"
                  src={highlight.thumbnail}
                  alt={highlight.title}
                />
              )}
              <NewsStory story={highlight} isHighlight />
            </Box>
            {stories?.length && (
              <Box>
                <Text className="text-lg">Related Stories:</Text>
                <Box className="mt-3 space-y-4">
                  {stories?.map((story) => (
                    <NewsStory
                      story={story}
                      key={`news-${position}-story-${story.position}`}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Flex>
        </CardContent>
      </Card>
    </CarouselItem>
  )
}

const NewsStory = ({
  story,
  isHighlight = false,
}: { story: NewsStory; isHighlight?: boolean }) => {
  return (
    <Box>
      <a target="_blank" href={story.link} rel="noreferrer">
        <CardTitle
          className={cn("hover:underline", isHighlight ? "text-lg" : "text-md")}
        >
          {story.title}
        </CardTitle>
      </a>
      <Box>
        {story.source.authors && (
          <Text className="opacity-50" weight="medium">
            By: {story.source.authors.join(" • ")}
          </Text>
        )}
      </Box>
      <Flex align="center" className="mt-1" gap="1">
        <div className="font-medium">{story.source.name}</div>
        &bull;
        <div className="text-foreground opacity-50">
          {getRelativeTime(story.date)}
        </div>
      </Flex>
    </Box>
  )
}
