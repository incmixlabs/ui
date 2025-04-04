import { cn } from "@/lib/utils"
import { Form } from "@/components/shadcn"
import type {
  AutoFormInputComponentProps,
  MCQLayoutType,
  MCQOption,
  MCQSizeType,
} from "../types"

const sizeStyles: Record<MCQSizeType, string> = {
  sm: "min-h-[40px] text-sm px-3",
  md: "min-h-[48px] text-base px-4",
  lg: "min-h-[56px] text-lg px-5",
}

const getLayoutClass = (layout: MCQLayoutType, gridCols = 2): string => {
  const baseClasses = "gap-2"
  switch (layout) {
    case "grid":
      return cn(
        baseClasses,
        gridCols === 2
          ? "grid grid-cols-1 sm:grid-cols-2"
          : gridCols === 3
            ? "grid grid-cols-1 sm:grid-cols-3"
            : gridCols === 4
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              : "grid grid-cols-1 sm:grid-cols-2"
      )
    case "row":
      return cn(baseClasses, "flex flex-row flex-wrap")
    case "column":
      return cn(baseClasses, "flex flex-col")
    default:
      return cn(baseClasses, "grid grid-cols-1 sm:grid-cols-2")
  }
}

const getOptionWidthClass = (layout: MCQLayoutType): string => {
  switch (layout) {
    case "grid":
      return "w-full"
    case "row":
      return "flex-grow-0"
    case "column":
      return "w-full"
    default:
      return "w-full"
  }
}

export default function AutoFormMCQ({
  label,
  isRequired,
  field,
  fieldConfigItem,
  // fieldProps,
}: AutoFormInputComponentProps) {
  const options = (fieldConfigItem.inputProps?.options || []) as MCQOption[]
  const layout = (fieldConfigItem.inputProps?.layout || "grid") as MCQLayoutType
  const gridCols = fieldConfigItem.inputProps?.gridCols || 2
  const optionSize = (fieldConfigItem.inputProps?.optionSize ||
    "md") as MCQSizeType

  return (
    <div className="flex w-full flex-col space-y-4">
      <Form.Item className="w-full">
        <div className="mb-4">
          <Form.Label className="font-medium text-gray-800 text-xl">
            {label}
            {isRequired && <span className="text-destructive"> *</span>}
          </Form.Label>
          {fieldConfigItem.description && (
            <p className="mt-1 text-muted-foreground text-sm">
              {fieldConfigItem.description}
            </p>
          )}
        </div>

        <Form.Control>
          <div
            className={getLayoutClass(layout, gridCols)}
            role="radiogroup"
            aria-required={isRequired ? "true" : "false"}
          >
            {options.map((option) => (
              <Form.Item
                key={option.value}
                className={getOptionWidthClass(layout)}
              >
                <Form.Control>
                  <label>
                    <input
                      type="radio"
                      className="peer sr-only"
                      value={option.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      checked={field.value === option.value}
                      required={isRequired} // Add required attribute based on isRequired
                    />
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-lg border-2 border-gray-200",
                        "cursor-pointer transition-all duration-200",
                        "hover:border-blue-100 hover:bg-blue-50",
                        "peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white",
                        "focus-within:ring-2 focus-within:ring-blue-500", // Add focus state
                        "font-medium text-gray-600",
                        sizeStyles[optionSize],
                        layout === "row" && "min-w-[120px]"
                      )}
                    >
                      {option.label}
                    </div>
                  </label>
                </Form.Control>
              </Form.Item>
            ))}
          </div>
        </Form.Control>
        <Form.Message />
      </Form.Item>
    </div>
  )
}
