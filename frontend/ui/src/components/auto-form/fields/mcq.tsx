import { FormControl, FormItem, FormLabel, FormMessage } from "@base";
import { cn } from "@utils/cn";
import type {
  AutoFormInputComponentProps,
  MCQLayoutType,
  MCQOption,
  MCQSizeType,
} from "../types";

const sizeStyles: Record<MCQSizeType, string> = {
  sm: "min-h-[36px] text-sm px-3",
  md: "min-h-[42px] text-base px-4",
  lg: "min-h-[50px] text-lg px-5",
};

const getLayoutClass = (layout: MCQLayoutType, gridCols = 2): string => {
  // Add w-full to base classes
  const baseClasses = "gap-2 w-full";
  switch (layout) {
    case "grid":
      return cn(
        baseClasses,
        gridCols === 2
          ? // Force grid items to take equal width with fr units
            "grid grid-cols-1 sm:grid-cols-2"
          : gridCols === 3
            ? "grid grid-cols-1 sm:grid-cols-3"
            : gridCols === 4
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid grid-cols-1 sm:grid-cols-2",
      );
    case "row":
      return cn(baseClasses, "flex flex-row flex-wrap justify-between");
    case "column":
      return cn(baseClasses, "flex flex-col");
    default:
      return cn(
        baseClasses,
        "grid grid-cols-1 sm:grid-cols-2",
      );
  }
};

const getOptionWidthClass = (layout: MCQLayoutType): string => {
  switch (layout) {
    case "grid":
      return "w-full";
    case "row":
      // For row layout, ensure items take up appropriate space
      return "flex-grow-0 w-[48%]"; // Use percentage width instead of min-width
    case "column":
      return "w-full";
    default:
      return "w-full";
  }
};

export default function AutoFormMCQ({
  label,
  isRequired,
  field,
  fieldConfigItem,
}: AutoFormInputComponentProps) {
  const options = (fieldConfigItem.inputProps?.options || []) as MCQOption[];
  const layout = (fieldConfigItem.inputProps?.layout ||
    "grid") as MCQLayoutType;
  const gridCols = fieldConfigItem.inputProps?.gridCols || 2;
  const optionSize = (fieldConfigItem.inputProps?.optionSize ||
    "md") as MCQSizeType;

  return (
    <div className="flex w-full flex-col space-y-4">
      <FormItem className="w-full">
        <div className="mb-4">
          <FormLabel className="font-medium text-gray-800 dark:text-white text-xl">
            {label}
            {isRequired && <span className="text-destructive"> *</span>}
          </FormLabel>
          {fieldConfigItem.description && (
            <p className="mt-1 text-muted-foreground text-sm dark:text-gray-400">
              {fieldConfigItem.description}
            </p>
          )}
        </div>

        <FormControl>
          <div
            className={getLayoutClass(layout, gridCols)}
            role="radiogroup"
            aria-required={isRequired ? "true" : "false"}
          >
            {options.map((option) => (
              <FormItem
                key={option.value}
                className={getOptionWidthClass(layout)}
              >
                <FormControl>
                  <label>
                    <input
                      type="radio"
                      className="peer sr-only"
                      value={option.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      checked={field.value === option.value}
                      required={isRequired}
                    />
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-900",
                        "dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-300",
                        "cursor-pointer transition-all duration-200",
                        "hover:border-blue-100 hover:bg-blue-50 dark:hover:border-blue-900 dark:hover:bg-blue-900/30",
                        "peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white",
                        "focus-within:ring-2 focus-within:ring-blue-500",
                        "font-medium text-gray-600 dark:text-gray-300 dark:border-gray-700",
                        "dark:bg-gray-800/50",
                        sizeStyles[optionSize],
                        layout === "row" ? "w-full" : "min-w-[120px]",
                      )}
                    >
                      {option.label}
                    </div>
                  </label>
                </FormControl>
              </FormItem>
            ))}
          </div>
        </FormControl>
        <FormMessage className="dark:text-red-400" />
      </FormItem>
    </div>
  );
}
