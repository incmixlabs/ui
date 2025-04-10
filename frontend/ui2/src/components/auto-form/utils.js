import { z } from "zod";
/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export function beautifyObjectName(string) {
    // if numbers only return the string
    let output = string.replace(/([A-Z])/g, " $1");
    output = output.charAt(0).toUpperCase() + output.slice(1);
    return output;
}
/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema(schema) {
    if (!schema)
        return null;
    if ("innerType" in schema._def) {
        return getBaseSchema(schema._def.innerType);
    }
    if ("schema" in schema._def) {
        return getBaseSchema(schema._def.schema);
    }
    return schema;
}
/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema) {
    const baseSchema = getBaseSchema(schema);
    return baseSchema ? baseSchema._def.typeName : "";
}
/**
 * Search for a "ZodDefult" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema) {
    const typedSchema = schema;
    if (typedSchema._def.typeName === "ZodDefault") {
        return typedSchema._def.defaultValue();
    }
    if ("innerType" in typedSchema._def) {
        return getDefaultValueInZodStack(typedSchema._def.innerType);
    }
    if ("schema" in typedSchema._def) {
        return getDefaultValueInZodStack(typedSchema._def.schema);
    }
    return undefined;
}
/**
 * Get all default values from a Zod schema.
 */
export function getDefaultValues(schema) {
    if (!schema)
        return null;
    const { shape } = schema;
    const defaultValues = {};
    if (!shape)
        return defaultValues;
    for (const key of Object.keys(shape)) {
        const item = shape[key];
        if (getBaseType(item) === "ZodObject") {
            const defaultItems = getDefaultValues(getBaseSchema(item));
            if (defaultItems !== null) {
                for (const defaultItemKey of Object.keys(defaultItems)) {
                    const pathKey = `${key}.${defaultItemKey}`;
                    defaultValues[pathKey] = defaultItems[defaultItemKey];
                }
            }
        }
        else {
            const defaultValue = getDefaultValueInZodStack(item);
            if (defaultValue !== undefined) {
                defaultValues[key] = defaultValue;
            }
        }
    }
    return defaultValues;
}
export function getObjectFormSchema(schema) {
    if (schema?._def.typeName === "ZodEffects") {
        const typedSchema = schema;
        return getObjectFormSchema(typedSchema._def.schema);
    }
    return schema;
}
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
export function zodToHtmlInputProps(schema) {
    // Initialize props without HTML validation attributes to let Zod handle validation
    const inputProps = {};
    // We can still determine if the field is required for UI/styling purposes
    const _isRequired = !["ZodOptional", "ZodNullable"].includes(schema._def.typeName);
    // But we're not returning HTML validation attributes like 'required', 'minLength', etc.
    // This allows Zod validation to take precedence
    return inputProps;
}
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
export function isMultipleSelectorType(zodItem) {
    if (!(zodItem instanceof z.ZodArray))
        return false;
    const innerType = zodItem._def.type;
    // Check if it's an array of objects that look like options
    try {
        if (innerType instanceof z.ZodObject) {
            const shape = innerType.shape;
            return (shape.label instanceof z.ZodString && shape.value instanceof z.ZodString);
        }
    }
    catch (_e) {
        // If any error in type checking, it's not a MultipleSelector type
        return false;
    }
    return false;
}
//# sourceMappingURL=utils.js.map