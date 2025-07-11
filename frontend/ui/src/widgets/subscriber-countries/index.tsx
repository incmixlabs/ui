import { Box, Button,Card, CardContainer, Flex, Grid, Heading, Text } from "@base"
import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react"

import {countries} from "@incmix/utils/countries"
interface Country {
  name: string;
  flag: string;
  subscribers: string;
  change: string;
  isPositive: boolean;
}

interface SubscribersByCountriesProps {
  countries?: Country[];
}

const defaultCountries: Country[] = [
  {
    code: "US",
    subscribers: "22,450",
    change: "+22.5%",
    isPositive: true,
  },
  {
    code: "IN",
    subscribers: "18,568",
    change: "+18.5%",
    isPositive: true,
  },
  {
    code: "BR",
    subscribers: "8,457",
    change: "-8.3%",
    isPositive: false,
  },
  {
    code: "AU",
    subscribers: "2,850",
    change: "+15.2%",
    isPositive: true,
  },
  {
    code: "FR",
    subscribers: "1,930",
    change: "-12.6%",
    isPositive: false,
  },
  {
    code: "CN",
    subscribers: "852",
    change: "-2.4%",
    isPositive: false,
  },
].map(country => {
  const c = countries[country.code]
  const flag = c?.flag || `🇺🇸` // Fallback to US flag if not found
  const name = c?.short || c?.name || country.code // Use short name or full name if available
  return {
    flag,
    name,
    change: country.change,
    subscribers: country.subscribers,
    isPositive: country.isPositive,
  }
})

/**
 * Displays a card with subscriber statistics by country, including flag, name, subscriber count, and percentage change.
 *
 * If no `countries` prop is provided, a default list of countries is shown. Each row displays the country's flag emoji, name, subscriber count, and a colored indicator for percentage change.
 */
export function SubscribersByCountries({
  countries = defaultCountries,
}: SubscribersByCountriesProps) {
  return (
    <CardContainer>
      <Box className="pb-4">
        <Flex align={"center"} justify={"between"}>
          <Heading size="6" className="font-medium">Subscriber by Countries</Heading>
          <Button variant="ghost" size="2">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </Flex>
      </Box>
        <Box className="space-y-1">
          {/* Header */}
          <Grid columns={"3"} gap={"4"}  className="pb-2 border-b border-gray-6">
            <Text size="2" className="font-medium text-gray-12">Countries</Text>
            <Text size="2" className="font-medium text-gray-12 text-center">Subscriber</Text>
            <Text size="2" className="font-medium text-gray-12 text-right">Percent</Text>
          </Grid>

          {/* Data rows */}
          {countries.map((country) => (
           <Grid columns={"3"} gap={"4"} key={country.name} className="py-3">
              <Flex align={"center"} gap={"2"}>
                <span>{country.flag}</span>
                <Text size="2" className="font-medium text-gray-12">{country.name}</Text>
              </Flex>
              <Text size="2" className="text-sm text-gray-12 text-center">{country.subscribers}</Text>
              <Flex align={"center"} justify={"end"} gap={"1"}>
                {country.isPositive ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <Text size="2" className={`font-medium ${country.isPositive ? "text-green-500" : "text-red-500"}`}>
                  {country.change}
                </Text>
              </Flex>
            </Grid>
          ))}
        </Box>
    </CardContainer>
  )
}
