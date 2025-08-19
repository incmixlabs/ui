import type { Meta, StoryObj } from "@storybook/react-vite"
import { Theme } from "../../src/1base"
import { GroupList } from "../../src/2elements/group-list"

// Sample data for stories
const movieData = [
  {
    year: 2023,
    movies: [
      { id: 301, title: "Oppenheimer", year: 2023 },
      { id: 302, title: "Barbie", year: 2023 },
      { id: 303, title: "Spider-Man: Across the Spider-Verse", year: 2023 },
      { id: 304, title: "Guardians of the Galaxy Vol. 3", year: 2023 },
      { id: 305, title: "The Super Mario Bros. Movie", year: 2023 },
    ],
  },
  {
    year: 2022,
    movies: [
      { id: 201, title: "Top Gun: Maverick", year: 2022 },
      { id: 202, title: "Avatar: The Way of Water", year: 2022 },
      { id: 203, title: "Black Panther: Wakanda Forever", year: 2022 },
      { id: 204, title: "Doctor Strange in the Multiverse of Madness", year: 2022 },
    ],
  },
  {
    year: 2021,
    movies: [
      { id: 101, title: "Spider-Man: No Way Home", year: 2021 },
      { id: 102, title: "Eternals", year: 2021 },
      { id: 103, title: "Dune", year: 2021 },
      { id: 104, title: "No Time to Die", year: 2021 },
    ],
  },
]

const sportsData = [
  {
    year: 2023,
    movies: [
      { id: 401, title: "FIFA World Cup Final Recap", year: 2023 },
      { id: 402, title: "Super Bowl LVII", year: 2023 },
      { id: 403, title: "NBA Finals 2023", year: 2023 },
    ],
  },
  {
    year: 2022,
    movies: [
      { id: 301, title: "Winter Olympics Beijing", year: 2022 },
      { id: 302, title: "FIFA World Cup Qatar", year: 2022 },
      { id: 303, title: "Commonwealth Games", year: 2022 },
    ],
  },
]

const techData = [
  {
    year: 2024,
    movies: [
      { id: 501, title: "AI Revolution", year: 2024 },
      { id: 502, title: "Quantum Computing Breakthrough", year: 2024 },
      { id: 503, title: "Sustainable Energy Solutions", year: 2024 },
    ],
  },
  {
    year: 2023,
    movies: [
      { id: 401, title: "ChatGPT and Large Language Models", year: 2023 },
      { id: 402, title: "Metaverse Development", year: 2023 },
      { id: 403, title: "Web3 and Blockchain", year: 2023 },
    ],
  },
]

const meta: Meta<typeof GroupList> = {
  title: "2 Elements/GroupList",
  component: GroupList,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "20px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    years: {
      control: "object",
      description: "Array of year objects with nested items",
    },
    defaultView: {
      control: "select",
      options: ["years", "movies"],
      description: "Initial view to display",
    },
    defaultSelectedYear: {
      control: "object",
      description: "Pre-selected year object (only used if defaultView is 'movies')",
    },
  },
  args: {
    defaultView: "years",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story with movie data
export const Default: Story = {
  args: {
    years: movieData,
  },
}

// Starting with years view
export const YearsView: Story = {
  args: {
    years: movieData,
    defaultView: "years",
  },
}

// Starting with movies view (pre-selected year)
export const MoviesView: Story = {
  args: {
    years: movieData,
    defaultView: "movies",
    defaultSelectedYear: movieData[0], // 2023
  },
}

// Sports themed data
export const SportsContent: Story = {
  args: {
    years: sportsData,
    defaultView: "years",
  },
}

// Tech themed data
export const TechContent: Story = {
  args: {
    years: techData,
    defaultView: "years",
  },
}

// Single year with many items
export const SingleYearManyItems: Story = {
  args: {
    years: [
      {
        year: 2023,
        movies: [
          { id: 1, title: "Oppenheimer", year: 2023 },
          { id: 2, title: "Barbie", year: 2023 },
          { id: 3, title: "Spider-Man: Across the Spider-Verse", year: 2023 },
          { id: 4, title: "Guardians of the Galaxy Vol. 3", year: 2023 },
          { id: 5, title: "The Super Mario Bros. Movie", year: 2023 },
          { id: 6, title: "Fast X", year: 2023 },
          { id: 7, title: "Indiana Jones and the Dial of Destiny", year: 2023 },
          { id: 8, title: "Transformers: Rise of the Beasts", year: 2023 },
          { id: 9, title: "The Little Mermaid", year: 2023 },
          { id: 10, title: "John Wick: Chapter 4", year: 2023 },
          { id: 11, title: "Scream VI", year: 2023 },
          { id: 12, title: "Evil Dead Rise", year: 2023 },
        ],
      },
    ],
    defaultView: "years",
  },
}

// Many years with few items each
export const ManyYears: Story = {
  args: {
    years: [
      {
        year: 2024,
        movies: [
          { id: 2401, title: "Latest Release 1", year: 2024 },
          { id: 2402, title: "Latest Release 2", year: 2024 },
        ],
      },
      {
        year: 2023,
        movies: [
          { id: 2301, title: "2023 Hit 1", year: 2023 },
          { id: 2302, title: "2023 Hit 2", year: 2023 },
        ],
      },
      {
        year: 2022,
        movies: [
          { id: 2201, title: "2022 Classic 1", year: 2022 },
          { id: 2202, title: "2022 Classic 2", year: 2022 },
        ],
      },
      {
        year: 2021,
        movies: [
          { id: 2101, title: "2021 Favorite 1", year: 2021 },
          { id: 2102, title: "2021 Favorite 2", year: 2021 },
        ],
      },
      {
        year: 2020,
        movies: [
          { id: 2001, title: "2020 Selection 1", year: 2020 },
          { id: 2002, title: "2020 Selection 2", year: 2020 },
        ],
      },
      {
        year: 2019,
        movies: [
          { id: 1901, title: "2019 Pick 1", year: 2019 },
          { id: 1902, title: "2019 Pick 2", year: 2019 },
        ],
      },
      {
        year: 2018,
        movies: [
          { id: 1801, title: "2018 Choice 1", year: 2018 },
          { id: 1802, title: "2018 Choice 2", year: 2018 },
        ],
      },
      {
        year: 2017,
        movies: [
          { id: 1701, title: "2017 Option 1", year: 2017 },
          { id: 1702, title: "2017 Option 2", year: 2017 },
        ],
      },
    ],
    defaultView: "years",
  },
}

// Empty year scenario
export const YearWithNoItems: Story = {
  args: {
    years: [
      {
        year: 2024,
        movies: [],
      },
      {
        year: 2023,
        movies: [
          { id: 301, title: "Single Item", year: 2023 },
        ],
      },
    ],
    defaultView: "years",
  },
}

// Single item scenarios
export const SingleItemPerYear: Story = {
  args: {
    years: [
      {
        year: 2023,
        movies: [
          { id: 1, title: "The Only Movie of 2023", year: 2023 },
        ],
      },
      {
        year: 2022,
        movies: [
          { id: 2, title: "The Only Movie of 2022", year: 2022 },
        ],
      },
      {
        year: 2021,
        movies: [
          { id: 3, title: "The Only Movie of 2021", year: 2021 },
        ],
      },
    ],
    defaultView: "years",
  },
}

// Long titles scenario
export const LongTitles: Story = {
  args: {
    years: [
      {
        year: 2023,
        movies: [
          { id: 1, title: "This is a Very Long Movie Title That Should Test How the Component Handles Text Overflow", year: 2023 },
          { id: 2, title: "Another Extremely Long Title for Testing Purposes", year: 2023 },
          { id: 3, title: "Short Title", year: 2023 },
          { id: 4, title: "Medium Length Movie Title", year: 2023 },
        ],
      },
    ],
    defaultView: "years",
  },
}

// Different data types (not just movies)
export const BooksList: Story = {
  args: {
    years: [
      {
        year: 2023,
        movies: [
          { id: 101, title: "Fourth Wing", year: 2023 },
          { id: 102, title: "Tomorrow, and Tomorrow, and Tomorrow", year: 2023 },
          { id: 103, title: "The Seven Husbands of Evelyn Hugo", year: 2023 },
        ],
      },
      {
        year: 2022,
        movies: [
          { id: 201, title: "Project Hail Mary", year: 2022 },
          { id: 202, title: "The Thursday Murder Club", year: 2022 },
          { id: 203, title: "Klara and the Sun", year: 2022 },
        ],
      },
    ],
    defaultView: "years",
  },
}
