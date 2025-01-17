import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes"
import { Field } from "houseform"
import type React from "react"
import type { z } from "zod"
export { TextField }
interface FormFieldProps {
  name: string
  label: string
  type?: "text" | "password" | "email"
  value?: string
  onChange?: (value: string) => void
  onChangeValidation?: (value: string) => Promise<boolean>
  initialValue?: string
  validation?: z.ZodSchema<string>
  className?: string
  disabled?: boolean
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
  value,
  onChange,
  onChangeValidation,
  initialValue = "",
  validation,
  className = "",
  disabled,
}) => {
  const isControlled = value !== undefined && onChange !== undefined

  return (
    <Field
      name={name}
      initialValue={isControlled ? value : initialValue}
      onBlurValidate={validation}
      onChangeValidate={onChangeValidation}
    >
      {({ value: fieldValue, setValue, onBlur, errors }) => {
        const handleChange = (newValue: string) => {
          setValue(newValue)

          if (isControlled) {
            onChange(newValue)
          }
        }

        return (
          <Flex direction="column" className={`${className}`}>
            <TextField.Root
              type={type}
              value={isControlled ? value : fieldValue}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={onBlur}
              placeholder={label}
              disabled={disabled}
            />
            <Box>
              {errors.map((error) => (
                <Text key={error} color="red" size="1">
                  {error}
                </Text>
              ))}
            </Box>
          </Flex>
        )
      }}
    </Field>
  )
}
