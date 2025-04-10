import type { DefaultValues } from "react-hook-form";
import { z } from "zod";
export type ZodObjectOrWrapped = z.ZodObject<any, any> | z.ZodEffects<z.ZodObject<any, any>>;
/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export declare function beautifyObjectName(string: string): string;
/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export declare function getBaseSchema<ChildType extends z.ZodAny | z.AnyZodObject = z.ZodAny>(schema: ChildType | z.ZodEffects<ChildType>): ChildType | null;
/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export declare function getBaseType(schema: z.ZodAny): string;
/**
 * Search for a "ZodDefult" in the Zod stack and return its value.
 */
export declare function getDefaultValueInZodStack(schema: z.ZodAny): any;
/**
 * Get all default values from a Zod schema.
 */
export declare function getDefaultValues<Schema extends z.ZodObject<any, any>>(schema: Schema): DefaultValues<Partial<z.TypeOf<Schema>>> | null;
export declare function getObjectFormSchema(schema: ZodObjectOrWrapped): z.ZodObject<any, any>;
/**
 * Converts a Zod schema into HTML input properties for React components.
 *
 * This function processes a Zod schema representing a number or string field (or their optional variants)
 * and returns an object of input attributes. It determines whether the field is required for UI styling,
 * but it deliberately omits native HTML validation attributes (e.g., "required", "minLength"),
 * allowing Zod to perform the full validation upon form submission.
 *
 * @param schema - A Zod schema defining the field's type.
 * @returns An object containing HTML input properties.
 */
export declare function zodToHtmlInputProps(schema: z.ZodNumber | z.ZodString | z.ZodOptional<z.ZodNumber | z.ZodString> | any): React.InputHTMLAttributes<HTMLInputElement>;
/**
 * Checks if a Zod schema represents an array of objects suitable for a multiple selector component.
 *
 * The function confirms that the provided schema is a ZodArray whose items are ZodObjects that include both
 * "label" and "value" properties of string type. The function returns false if the schema does not match these
 * conditions or if any error occurs during the validation process.
 *
 * @param zodItem - The Zod schema to evaluate.
 * @returns True if the schema represents an array of selectable option objects, false otherwise.
 */
export declare function isMultipleSelectorType(zodItem: z.ZodTypeAny): boolean;
//# sourceMappingURL=utils.d.ts.map