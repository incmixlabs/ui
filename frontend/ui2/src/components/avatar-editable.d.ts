import type { ExtendSize } from "@/types";
type AvatarEditableProps = {
    size?: ExtendSize;
    src?: string | undefined;
    name?: string;
    deletable?: boolean;
    onImageChange?: (file: File) => Promise<void>;
    onImageDelete?: () => Promise<void>;
    isDeletingImage?: boolean;
};
export declare const AvatarEditable: React.FC<AvatarEditableProps>;
export {};
//# sourceMappingURL=avatar-editable.d.ts.map