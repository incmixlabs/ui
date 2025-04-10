type Movie = {
    id: number;
    title: string;
    year: number;
};
type Year = {
    year: number;
    movies: Movie[];
};
interface GroupListProps {
    years?: Year[];
    defaultView?: "years" | "movies";
    defaultSelectedYear?: Year | null;
}
export declare const GroupList: ({ years, defaultView, defaultSelectedYear, }: GroupListProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map