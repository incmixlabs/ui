type UseUploadFileProps = {
    types?: FilePickerAcceptType[];
    opfs?: {
        enabled: boolean;
        saveDirectory: string;
    };
    autoUpload?: boolean;
    multiple?: boolean;
    onSuccess?: (files: FileSystemFileHandle[]) => void;
    onError?: (error: Error) => void;
};
export declare const useUploadFile: ({ types, autoUpload, multiple, opfs, onError, onSuccess, }: UseUploadFileProps) => {
    uploadedFiles: FileSystemFileHandle[];
    startUpload: () => void;
    error: Error | null;
    openFilePicker: () => Promise<File[]>;
    isDragging: boolean;
    isDropActive: boolean;
    dropzoneProps: {
        onDrop: (ev: React.DragEvent<HTMLDivElement>) => void;
        onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
        onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    };
};
export {};
//# sourceMappingURL=use-upload-file.d.ts.map