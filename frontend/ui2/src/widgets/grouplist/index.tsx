import {
  Box,
  Card,
  Flex,
  Heading,
  ScrollArea,
  Text,
} from "@/components/radixui"
import { IconButton } from "@/components/radixui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState } from "react"

type Movie = {
  id: number
  title: string
  year: number
}

type Year = {
  year: number
  movies: Movie[]
}

interface GroupListProps {
  years?: Year[]
  defaultView?: "years" | "movies"
  defaultSelectedYear?: Year | null
}

const defaultYears: Year[] = [
  {
    year: 2011,
    movies: [
      {
        id: 203,
        title: "Hugo",
        year: 2011,
      },
      {
        id: 189,
        title: "Harry Potter and the Deathly Hallows",
        year: 2011,
      },
      {
        id: 184,
        title: "Warrior",
        year: 2011,
      },
      {
        id: 169,
        title: "Drive",
        year: 2011,
      },
      {
        id: 125,
        title: "A Separation",
        year: 2011,
      },
    ],
  },
  {
    year: 2010,
    movies: [
      {
        id: 101,
        title: "Inception",
        year: 2010,
      },
      {
        id: 102,
        title: "The Social Network",
        year: 2010,
      },
    ],
  },
  {
    year: 2009,
    movies: [
      {
        id: 90,
        title: "Avatar",
        year: 2009,
      },
      {
        id: 91,
        title: "Inglourious Basterds",
        year: 2009,
      },
    ],
  },
  {
    year: 2008,
    movies: [
      {
        id: 80,
        title: "The Dark Knight",
        year: 2008,
      },
      {
        id: 81,
        title: "Slumdog Millionaire",
        year: 2008,
      },
    ],
  },
  {
    year: 2007,
    movies: [
      {
        id: 70,
        title: "No Country for Old Men",
        year: 2007,
      },
      {
        id: 71,
        title: "There Will Be Blood",
        year: 2007,
      },
    ],
  },
  {
    year: 2006,
    movies: [
      {
        id: 60,
        title: "The Departed",
        year: 2006,
      },
      {
        id: 61,
        title: "Pan's Labyrinth",
        year: 2006,
      },
    ],
  },
  {
    year: 2005,
    movies: [
      {
        id: 50,
        title: "Batman Begins",
        year: 2005,
      },
      {
        id: 51,
        title: "Brokeback Mountain",
        year: 2005,
      },
    ],
  },
  {
    year: 2004,
    movies: [
      {
        id: 40,
        title: "Eternal Sunshine of the Spotless Mind",
        year: 2004,
      },
      {
        id: 41,
        title: "The Incredibles",
        year: 2004,
      },
    ],
  },
  {
    year: 2003,
    movies: [
      {
        id: 30,
        title: "The Lord of the Rings: The Return of the King",
        year: 2003,
      },
    ],
  },
  {
    year: 2002,
    movies: [
      {
        id: 20,
        title: "The Pianist",
        year: 2002,
      },
      {
        id: 21,
        title: "City of God",
        year: 2002,
      },
    ],
  },
]

export const GroupList = ({
  years = defaultYears,
  defaultView = "years",
  defaultSelectedYear = null,
}: GroupListProps) => {
  const [selectedYear, setSelectedYear] = useState<Year | null>(
    defaultSelectedYear
  )
  const [listView, setListView] = useState(defaultView)

  const handleYearClick = (year: Year) => {
    setSelectedYear(year)
    setListView("movies")
  }

  const handleBackToYears = () => {
    setListView("years")
  }

  return (
    <>
      <Card.Root className="relative mx-auto h-96 w-96 max-w-md overflow-hidden rounded bg-white shadow">
        <Box
          className={`absolute top-0 left-0 h-full w-full transition-transform duration-500 ease-in-out ${listView === "years" ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Heading className=" bg-gray-3 p-3 font-medium text-gray-12 text-xl">
            Select Year
          </Heading>
          <ScrollArea className="h-full">
            <Box className="h-full overflow-y-auto">
              {years.map((year) => (
                <button
                  key={year.year}
                  type="button"
                  onClick={() => handleYearClick(year)}
                  className="w-full cursor-pointer border-gray-5 border-t p-4 hover:bg-gray-3"
                >
                  <Flex align={"center"} justify={"between"}>
                    <span>Year {year.year}</span>
                    <ChevronRight size={20} />
                  </Flex>
                </button>
              ))}
            </Box>
          </ScrollArea>
        </Box>

        <Box
          className={`absolute top-0 left-0 h-full w-full transition-transform duration-500 ease-in-out ${listView === "movies" ? "translate-x-0" : "translate-x-full"}`}
        >
          <Flex className="bg-gray-3 p-2 " justify={"start"}>
            <IconButton
              onClick={handleBackToYears}
              className=" w-fit gap-1 bg-transparent font-semibold text-gray-12 "
            >
              <ChevronLeft size={20} />
              <Text as="span">Year {selectedYear?.year}</Text>
            </IconButton>
          </Flex>

          <Box className="h-full overflow-y-auto">
            {selectedYear?.movies.map((movie) => (
              <Flex
                align={"center"}
                justify={"start"}
                key={movie.id}
                className="group relative w-full cursor-pointer border-gray-5 border-t p-4 text-left hover:bg-gray-3"
              >
                <Box className="absolute left-0 h-full w-1 bg-blue-700 opacity-0 group-hover:opacity-100" />
                <Text as="span">
                  {movie.id}. {movie.title}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      </Card.Root>
    </>
  )
}
