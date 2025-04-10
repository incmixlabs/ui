import type { Option } from "../multiple-selector/multiple-selector";
import type { AvatarProps } from "@/components/radixui/avatar";
export type Member = Option & AvatarProps & {
    avatar?: string;
    color?: string;
    label?: string;
    value?: string;
};
export interface Project {
    id: string;
    title: string;
    company: string;
    logo: string;
    description: string;
    progress: number;
    timeLeft: string;
    timeType: "week" | "days";
    members: Member[];
    status: "all" | "started" | "on-hold" | "completed";
    startDate?: number;
    endDate?: number;
    budget?: number;
    fileData?: File | null;
}
//# sourceMappingURL=types.d.ts.map