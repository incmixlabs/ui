import { Button, Flex, Text, TextArea, TextField } from "@radix-ui/themes"
import type { FieldApi } from "@tanstack/react-form"
import type React from "react"
export { TextField }
interface FormFieldProps {
  name: string
  label: string
  type?: TextField.RootProps["type"] | "textarea"
  className?: string
  disabled?: boolean
  field: FieldApi<any, any, any, any>
}
export const FormButton: React.FC<{
  onClick: () => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
}> = ({ onClick, disabled, className, children }) => (
  <Button onClick={onClick} className={`${className}`} disabled={disabled}>
    {children}
  </Button>
)

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  className = "",
  disabled,
  field,
}) => {
  return (
    <Flex direction="column" className={`${className}`} gap="1">
      <Text as="label" size="2" htmlFor={name}>
        {label}
      </Text>
      {type === "textarea" ? (
        <TextArea
          id={name}
          placeholder={label}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <TextField.Root
          type={type}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={label}
          disabled={disabled}
        />
      )}
      {field.state.meta.errors && (
        <Text color="red" size="1">
          {field.state.meta.errors}
        </Text>
      )}
    </Flex>
  )
}
