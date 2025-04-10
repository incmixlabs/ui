export type NewsStory = {
    thumbnail?: string;
    title: string;
    link: string;
    source: {
        icon?: string;
        name: string;
        authors?: string[];
    };
    date: string;
};
export type NewsCardProps = {
    position: number;
    highlight: NewsStory;
    stories?: Array<NewsStory & {
        position: number;
    }>;
};
export declare function NewsCard({ position, highlight, stories }: NewsCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=news-card.d.ts.map