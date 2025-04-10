export declare const useFileManager: () => {
    folderId: string;
    fileId: string;
    viewMode: "grid" | "list";
    page: number;
    search: string;
    handleOpenFolder: (id: string) => Promise<void>;
    handleGoBack: () => Promise<void>;
    handleSelectFile: (id: string) => Promise<void>;
    handleCloseFileDetails: () => Promise<void>;
    handleChangeViewMode: (mode: "grid" | "list") => Promise<void>;
    handleChangePage: (newPage: number) => Promise<void>;
    handleSearch: (query: string) => Promise<void>;
};
//# sourceMappingURL=use-file-manager.d.ts.map