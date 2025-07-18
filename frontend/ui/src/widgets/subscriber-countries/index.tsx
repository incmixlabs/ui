import {
  Box,
  Button,
  Card,
  CardContainer,
  Flex,
  Grid,
  Heading,
  ScrollArea,
  Text,
} from "@incmix/ui";
import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { flagsImg } from "./assets";
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
    name: "USA",
    flag: flagsImg.usaflag,
    subscribers: "22,450",
    change: "+22.5%",
    isPositive: true,
  },
  {
    name: "India",
    flag: flagsImg.inflag,
    subscribers: "18,568",
    change: "+18.5%",
    isPositive: true,
  },
  {
    name: "Brazil",
    flag: flagsImg.brflag,
    subscribers: "8,457",
    change: "-8.3%",
    isPositive: false,
  },
  {
    name: "Australia",
    flag: flagsImg.auflag,
    subscribers: "2,850",
    change: "+15.2%",
    isPositive: true,
  },
  {
    name: "France",
    flag: flagsImg.frflag,
    subscribers: "1,930",
    change: "-12.6%",
    isPositive: false,
  },
  {
    name: "China",
    flag: flagsImg.chflag,
    subscribers: "852",
    change: "-2.4%",
    isPositive: false,
  },
];

export function SubscribersByCountries({
  countries = defaultCountries,
}: SubscribersByCountriesProps) {
  return (
    <CardContainer className="min-h-72 h-full flex flex-col overflow-hidden">
      <Box className="pb-4 flex-shrink-0">
        <Flex align="center" justify="between">
          <Heading size="6" className="font-medium">
            Subscriber by Countries
          </Heading>
          <Button variant="ghost" size="2">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </Flex>
      </Box>
      <ScrollArea className="flex-1 overflow-hidden">
        <Box className="pr-2 space-y-1">
          <Grid columns="3" gap="4" className="pb-2 border-b border-gray-6">
            <Text size="2" className="font-medium text-gray-12">
              Countries
            </Text>
            <Text size="2" className="font-medium text-gray-12 text-center">
              Subscriber
            </Text>
            <Text size="2" className="font-medium text-gray-12 text-right">
              Percent
            </Text>
          </Grid>

          {countries.map((country) => (
            <Grid columns="3" gap="4" key={country.name} className="py-3">
              <Flex align="center" gap="2">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-5 h-5"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <Text size="2" className="font-medium text-gray-12">
                  {country.name}
                </Text>
              </Flex>

              <Text size="2" className="text-sm text-gray-12 text-center">
                {country.subscribers}
              </Text>

              <Flex align="center" justify="end" gap="1">
                {country.isPositive ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <Text
                  size="2"
                  className={`font-medium ${country.isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {country.change}
                </Text>
              </Flex>
            </Grid>
          ))}
        </Box>
      </ScrollArea>
    </CardContainer>
  );
}
