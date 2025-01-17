import { useThemeStore } from "@incmix-fe/store"
import { Carousel, CarouselContent } from "@incmix-fe/ui"
import { NewsCard, type NewsStory } from "@incmix-fe/ui/widgets"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof NewsCard> = {
  title: "Molecules/NewsCard",
  component: NewsCard,
  decorators: [
    (Story) => (
      <Carousel>
        <CarouselContent>
          <Story />
        </CarouselContent>
      </Carousel>
    ),
  ],
  parameters: {
    toolbar: {
      items: [
        {
          title: "Theme",
          icon: "circlehollow",
          onClick: () => {
            const { toggleTheme } = useThemeStore()
            toggleTheme()
          },
        },
      ],
    },
  },
}

export default meta
type Story = StoryObj<typeof NewsCard>

const mockHighlight: NewsStory = {
  thumbnail: "https://picsum.photos/800/400",
  title: "Breaking News: Major Scientific Discovery Announced",
  link: "https://example.com/news/1",
  source: {
    name: "Science Daily",
    icon: "https://picsum.photos/32/32",
    authors: ["Dr. Jane Smith", "Dr. John Doe"],
  },
  date: new Date().toISOString(),
}

const mockRelatedStories: Array<NewsStory & { position: number }> = [
  {
    position: 1,
    title: "Related: Previous Research Laid Groundwork for Discovery",
    link: "https://example.com/news/2",
    source: {
      name: "Tech News",
      authors: ["Sarah Johnson"],
    },
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    position: 2,
    title: "Impact of Discovery on Future Research",
    link: "https://example.com/news/3",
    source: {
      name: "Research Weekly",
    },
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
]

export const SingleStory: Story = {
  args: {
    position: 0,
    highlight: mockHighlight,
  },
}

export const WithRelatedStories: Story = {
  args: {
    position: 0,
    highlight: mockHighlight,
    stories: mockRelatedStories,
  },
}

export const NoThumbnail: Story = {
  args: {
    position: 0,
    highlight: {
      ...mockHighlight,
      thumbnail: undefined,
    },
    stories: mockRelatedStories,
  },
}
