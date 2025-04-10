import type { TCustomBoard } from "./types";
export declare const attachments: ({
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    size: string;
    thumbnailUrl?: undefined;
} | {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    size: string;
    thumbnailUrl: string;
})[];
export declare const assignData: {
    value: string;
    label: string;
    avatar: string;
    color: string;
}[];
export declare const labelsData: {
    value: string;
    label: string;
    color: string;
}[];
export declare const commentsData: ({
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    text: string;
    timestamp: string;
    images?: undefined;
} | {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    text: string;
    timestamp: string;
    images: string[];
})[];
export declare const initialData: TCustomBoard;
//# sourceMappingURL=data.d.ts.map