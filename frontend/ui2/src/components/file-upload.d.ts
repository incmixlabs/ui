import { type Dispatch, type SetStateAction } from "react";
import { type DropzoneOptions, type DropzoneState } from "react-dropzone";
type DirectionOptions = "rtl" | "ltr" | undefined;
type FileUploaderContextType = {
    dropzoneState: DropzoneState;
    isLOF: boolean;
    isFileTooBig: boolean;
    removeFileFromSet: (index: number) => void;
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
    orientation: "horizontal" | "vertical";
    direction: DirectionOptions;
};
export declare const useFileUpload: () => FileUploaderContextType;
type FileUploaderProps = {
    value: File[] | null;
    reSelect?: boolean;
    onValueChange: (value: File[] | null) => void;
    dropzoneOptions: DropzoneOptions;
    orientation?: "horizontal" | "vertical";
};
/**
 * File upload Docs: {@link: https://localhost:3000/docs/file-upload}
 */
export declare const FileUploader: import("react").ForwardRefExoticComponent<FileUploaderProps & import("react").HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const FileUploaderContent: import("react").ForwardRefExoticComponent<import("react").HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
export declare const FileUploaderItem: import("react").ForwardRefExoticComponent<{
    index: number;
} & import("react").HTMLAttributes<HTMLDivElement> & import("react").RefAttributes<HTMLDivElement>>;
interface FileInputProps extends React.HTMLAttributes<HTMLDivElement> {
    parentclass?: string;
    dropmsg?: string;
}
export declare const FileInput: import("react").ForwardRefExoticComponent<FileInputProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=file-upload.d.ts.map