import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Card, Flex, Heading, ScrollArea, Text, } from "@/components/radixui";
import { IconButton } from "@/components/radixui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
const defaultYears = [
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
];
export const GroupList = ({ years = defaultYears, defaultView = "years", defaultSelectedYear = null, }) => {
    const [selectedYear, setSelectedYear] = useState(defaultSelectedYear);
    const [listView, setListView] = useState(defaultView);
    const handleYearClick = (year) => {
        setSelectedYear(year);
        setListView("movies");
    };
    const handleBackToYears = () => {
        setListView("years");
    };
    return (_jsx(_Fragment, { children: _jsxs(Card.Root, { className: "relative mx-auto h-96 w-96 max-w-md overflow-hidden rounded bg-white shadow", children: [_jsxs(Box, { className: `absolute top-0 left-0 h-full w-full transition-transform duration-500 ease-in-out ${listView === "years" ? "translate-x-0" : "-translate-x-full"}`, children: [_jsx(Heading, { className: " bg-gray-3 p-3 font-medium text-gray-12 text-xl", children: "Select Year" }), _jsx(ScrollArea, { className: "h-full", children: _jsx(Box, { className: "h-full overflow-y-auto", children: years.map((year) => (_jsx("button", { type: "button", onClick: () => handleYearClick(year), className: "w-full cursor-pointer border-gray-5 border-t p-4 hover:bg-gray-3", children: _jsxs(Flex, { align: "center", justify: "between", children: [_jsxs("span", { children: ["Year ", year.year] }), _jsx(ChevronRight, { size: 20 })] }) }, year.year))) }) })] }), _jsxs(Box, { className: `absolute top-0 left-0 h-full w-full transition-transform duration-500 ease-in-out ${listView === "movies" ? "translate-x-0" : "translate-x-full"}`, children: [_jsx(Flex, { className: "bg-gray-3 p-2 ", justify: "start", children: _jsxs(IconButton, { onClick: handleBackToYears, className: " w-fit gap-1 bg-transparent font-semibold text-gray-12 ", children: [_jsx(ChevronLeft, { size: 20 }), _jsxs(Text, { as: "span", children: ["Year ", selectedYear?.year] })] }) }), _jsx(Box, { className: "h-full overflow-y-auto", children: selectedYear?.movies.map((movie) => (_jsxs(Flex, { align: "center", justify: "start", className: "group relative w-full cursor-pointer border-gray-5 border-t p-4 text-left hover:bg-gray-3", children: [_jsx(Box, { className: "absolute left-0 h-full w-1 bg-blue-700 opacity-0 group-hover:opacity-100" }), _jsxs(Text, { as: "span", children: [movie.id, ". ", movie.title] })] }, movie.id))) })] })] }) }));
};
//# sourceMappingURL=index.js.map