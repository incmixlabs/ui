import AutoFormCheckbox from "./fields/checkbox";
import AutoFormDate from "./fields/date";
import AutoFormEnum from "./fields/enum";
import FieldGroup from "./fields/field-group";
import AutoFormFile from "./fields/file";
import AutoFormInput from "./fields/input";
import AutoFormMCQ from "./fields/mcq";
import AutoFormMultiCheckbox from "./fields/multi-checkbox";
import MultipleSelectorField from "./fields/multiple-selector";
import AutoFormNumber from "./fields/number";
import AutoFormRadioGroup from "./fields/radio-group";
import AutoFormTextarea from "./fields/textarea";
export declare const INPUT_COMPONENTS: {
    readonly checkbox: typeof AutoFormCheckbox;
    readonly date: typeof AutoFormDate;
    readonly select: typeof AutoFormEnum;
    readonly radio: typeof AutoFormRadioGroup;
    readonly textarea: typeof AutoFormTextarea;
    readonly number: typeof AutoFormNumber;
    readonly file: typeof AutoFormFile;
    readonly fallback: typeof AutoFormInput;
    readonly mcq: typeof AutoFormMCQ;
    readonly multiCheckbox: typeof AutoFormMultiCheckbox;
    readonly multipleSelector: typeof MultipleSelectorField;
};
/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export declare const DEFAULT_ZOD_HANDLERS: {
    [key: string]: keyof typeof INPUT_COMPONENTS;
};
export { FieldGroup };
//# sourceMappingURL=config.d.ts.map