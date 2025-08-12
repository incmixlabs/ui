import { Spinner, Text } from "@incmix/ui"
import { useQuery } from "@tanstack/react-query"
import { LOCATION_API_URL } from "@utils/constants"
import { WeatherCard, type WeatherCardProps } from "./weather-card"
import "./weather.css"

const locationApiUrl = `${LOCATION_API_URL}/weather?lat=40.730610&lon=-73.935242`

export function WeatherWidget({
  location,
}: { location?: { lat: string; lon: string } }) {
  const { data, error, isPending } = useQuery<WeatherCardProps>({
    queryKey: ["weather", location],
    queryFn: async () => {
      // const searchParams = new URLSearchParams()
      // if (location) {
      //   searchParams.append("lat", location.lat)
      //   searchParams.append("lon", location.lon)
      // }
      const res = await fetch(`${locationApiUrl}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) throw new Error("Error fetching weather data")
      return res.json()
    },
  })

  if (error) return <Text color="red">{error.message}</Text>

  if (isPending) return <Spinner />

  return (
    <WeatherCard
      location={data?.location}
      temperatureUnit={data?.temperatureUnit}
      days={data?.days ?? []}
    />
  )
}
