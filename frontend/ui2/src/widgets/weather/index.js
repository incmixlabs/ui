import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { LOCATION_API_URL } from "@/lib/utils/constants";
import { Spinner, Text } from "@/components/base";
import { WeatherCard } from "./weather-card";
import "./weather.css";
const locationApiUrl = `${LOCATION_API_URL}/weather`;
export function WeatherWidget({ location, }) {
    const { data, error, isPending } = useQuery({
        queryKey: ["weather", location],
        queryFn: async () => {
            const searchParams = new URLSearchParams();
            if (location) {
                searchParams.append("lat", location.lat);
                searchParams.append("lon", location.lon);
            }
            const res = await fetch(`${locationApiUrl}?${searchParams.toString()}`, {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok)
                throw new Error("Error fetching weather data");
            return res.json();
        },
    });
    if (error)
        return _jsx(Text, { color: "red", children: error.message });
    if (isPending)
        return _jsx(Spinner, {});
    return (_jsx(WeatherCard, { location: data?.location, temperatureUnit: data?.temperatureUnit, days: data?.days ?? [] }));
}
//# sourceMappingURL=index.js.map