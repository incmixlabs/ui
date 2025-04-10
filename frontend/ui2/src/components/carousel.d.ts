import { Button } from "@/components/shadcn/button";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
export { Autoplay };
type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
};
declare function Carousel({ orientation, opts, setApi, plugins, className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & CarouselProps): import("react/jsx-runtime").JSX.Element;
declare namespace Carousel {
    var displayName: string;
}
declare function CarouselContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare namespace CarouselContent {
    var displayName: string;
}
declare function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
declare namespace CarouselItem {
    var displayName: string;
}
declare function CarouselPrevious({ className, variant, size, ...props }: React.ComponentProps<typeof Button>): import("react/jsx-runtime").JSX.Element;
declare namespace CarouselPrevious {
    var displayName: string;
}
declare function CarouselNext({ className, variant, size, ...props }: React.ComponentProps<typeof Button>): import("react/jsx-runtime").JSX.Element;
declare namespace CarouselNext {
    var displayName: string;
}
export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, };
//# sourceMappingURL=carousel.d.ts.map