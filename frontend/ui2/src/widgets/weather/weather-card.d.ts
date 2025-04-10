import { type IconProps } from "./icons";
import "./weather.css";
export type WeatherCardProps = {
    location?: string;
    temperatureUnit?: "C" | "F";
    days: {
        time: string;
        temperatureAvg: number;
        temperatureMax: number;
        temperatureMin: number;
        weatherCode: number;
    }[];
};
export declare const WeatherCodes: Record<number, {
    name: string;
    Icon: (props: IconProps) => React.ReactNode;
}>;
export declare function WeatherCard({ days, location }: WeatherCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=weather-card.d.ts.map