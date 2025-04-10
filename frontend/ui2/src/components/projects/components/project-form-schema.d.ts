import type { FieldConfig } from "@/components/auto-form/types";
import type { ZodObjectOrWrapped } from "@/components/auto-form/utils";
import type { z } from "zod";
export interface ProjectFormSchema<SchemaType extends ZodObjectOrWrapped = ZodObjectOrWrapped> {
    formSchema: {
        type: string;
        properties: {
            [key: string]: {
                type: string;
                title?: string;
                minLength?: number;
                format?: string;
                items?: {
                    type: string;
                    properties?: {
                        [key: string]: {
                            type: string;
                        };
                    };
                };
            };
        };
        required: string[];
    };
    fieldConfig: FieldConfig<z.infer<SchemaType>>;
}
export declare const projectFormSchema: ProjectFormSchema;
//# sourceMappingURL=project-form-schema.d.ts.map